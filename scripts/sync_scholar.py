#!/usr/bin/env python3
"""Synchronize GOAL Lab publications with Prof. Salimur Choudhury's Google Scholar profile.

Google Scholar does not provide an official API. This script uses SerpApi's
Google Scholar Author endpoint, then merges Scholar metadata into the existing
data/publications.json file.

Existing hand-curated entries are preserved. Their abstracts, thumbnails, tags
and custom paper links are never overwritten. Publications found on Scholar but
not already present are added as lightweight entries.
"""

from __future__ import annotations

import json
import os
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

SCHOLAR_AUTHOR_ID = os.getenv("SCHOLAR_AUTHOR_ID", "EzCD7v0AAAAJ").strip()
SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY", "").strip()

ROOT = Path(__file__).resolve().parents[1]
PUBLICATIONS_FILE = ROOT / "data" / "publications.json"
PROFILE_URL = f"https://scholar.google.com/citations?user={SCHOLAR_AUTHOR_ID}&hl=en"
SERPAPI_ENDPOINT = "https://serpapi.com/search.json"


def normalize_title(title: str) -> str:
    """Normalize a title for conservative exact matching."""
    return re.sub(r"[^a-z0-9]+", "", (title or "").lower())


def split_authors(authors: str) -> list[str]:
    """Convert Scholar's comma-separated author string to the site's array form."""
    return [a.strip() for a in (authors or "").split(",") if a.strip()]


def clean_venue(publication: str, year: int) -> str:
    """Remove a trailing ', YEAR' because year is displayed separately."""
    publication = (publication or "").strip()
    if not publication:
        return ""
    if year:
        publication = re.sub(
            rf",?\s*{re.escape(str(year))}\s*$", "", publication
        ).strip()
    return publication


def fetch_page(start: int) -> dict[str, Any]:
    params = {
        "engine": "google_scholar_author",
        "author_id": SCHOLAR_AUTHOR_ID,
        "hl": "en",
        "sort": "pubdate",
        "num": 100,
        "start": start,
        "api_key": SERPAPI_API_KEY,
    }
    url = f"{SERPAPI_ENDPOINT}?{urllib.parse.urlencode(params)}"
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "GOAL-Lab-Publication-Sync/1.0"},
    )

    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            return json.load(response)
    except Exception as exc:
        raise RuntimeError(f"Could not fetch Scholar data: {exc}") from exc


def fetch_all_articles() -> list[dict[str, Any]]:
    articles: list[dict[str, Any]] = []
    start = 0

    # Five pages is a safety cap (up to 500 publications).
    for _ in range(5):
        data = fetch_page(start)

        if data.get("error"):
            raise RuntimeError(f"SerpApi error: {data['error']}")

        page = data.get("articles") or []
        articles.extend(page)

        if len(page) < 100:
            break

        start += 100

    return articles


def scholar_base(article: dict[str, Any]) -> dict[str, Any]:
    year_text = str(article.get("year") or "").strip()
    year = int(year_text) if year_text.isdigit() else 0

    cited_by = article.get("cited_by") or {}
    cited_value = cited_by.get("value")
    try:
        cited_by_value = int(cited_value) if cited_value is not None else 0
    except (TypeError, ValueError):
        cited_by_value = 0

    return {
        "title": (article.get("title") or "").strip(),
        "authors": split_authors(article.get("authors") or ""),
        "venue": clean_venue(article.get("publication") or "", year),
        "year": year,
        "scholarLink": (article.get("link") or "").strip(),
        "citationId": (article.get("citation_id") or "").strip(),
        "citedBy": cited_by_value,
    }


def merge_publications(
    existing: list[dict[str, Any]],
    scholar_articles: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    by_citation_id = {
        p.get("citationId"): p
        for p in existing
        if p.get("citationId")
    }
    by_title = {
        normalize_title(p.get("title", "")): p
        for p in existing
        if p.get("title")
    }

    used_ids: set[int] = set()
    seen_scholar_keys: set[str] = set()
    merged: list[dict[str, Any]] = []

    for article in scholar_articles:
        base = scholar_base(article)
        if not base["title"]:
            continue

        scholar_key = base["citationId"] or normalize_title(base["title"])
        if scholar_key in seen_scholar_keys:
            continue
        seen_scholar_keys.add(scholar_key)

        match = None
        if base["citationId"]:
            match = by_citation_id.get(base["citationId"])
        if match is None:
            match = by_title.get(normalize_title(base["title"]))

        if match is not None:
            used_ids.add(id(match))
            item = dict(match)

            # Scholar-controlled metadata that is safe to refresh every run.
            item["scholarLink"] = base["scholarLink"]
            item["citationId"] = base["citationId"]
            item["citedBy"] = base["citedBy"]

            # Auto-added entries follow Scholar metadata. Hand-curated entries
            # keep their richer/manual bibliographic text.
            if item.get("autoSynced"):
                item["title"] = base["title"]
                item["authors"] = base["authors"]
                item["venue"] = base["venue"]
                item["year"] = base["year"]
            else:
                if not item.get("authors"):
                    item["authors"] = base["authors"]
                if not item.get("venue"):
                    item["venue"] = base["venue"]
                if not item.get("year"):
                    item["year"] = base["year"]

            # Keep the UI schema consistent.
            item.setdefault("link", "")
            item.setdefault("abstract", "")
            item.setdefault("thumbnail", "")
            item.setdefault("tags", [])
            merged.append(item)
            continue

        # New Scholar-only publication: lightweight entry.
        merged.append(
            {
                "title": base["title"],
                "authors": base["authors"],
                "venue": base["venue"],
                "link": "",
                "scholarLink": base["scholarLink"],
                "citationId": base["citationId"],
                "citedBy": base["citedBy"],
                "abstract": "",
                "thumbnail": "",
                "tags": [],
                "year": base["year"],
                "autoSynced": True,
            }
        )

    # Never delete an existing site entry merely because Scholar omitted it.
    for item in existing:
        if id(item) not in used_ids:
            merged.append(item)

    # Newest year first. Python's sort is stable, so order within a year remains
    # the Scholar/manual order produced above.
    merged.sort(
        key=lambda p: int(p.get("year") or 0),
        reverse=True,
    )
    return merged


def main() -> None:
    if not SERPAPI_API_KEY:
        sys.exit(
            "SERPAPI_API_KEY is missing. Add it as a GitHub Actions repository "
            "secret before running the Scholar sync."
        )

    existing = json.loads(PUBLICATIONS_FILE.read_text(encoding="utf-8"))
    if not isinstance(existing, list):
        raise RuntimeError("data/publications.json must contain a JSON array.")

    scholar_articles = fetch_all_articles()
    if not scholar_articles:
        raise RuntimeError(
            "No publications were returned from Scholar; leaving the existing "
            "publications file unchanged."
        )

    merged = merge_publications(existing, scholar_articles)
    output = json.dumps(merged, ensure_ascii=False, indent=2) + "\n"

    current = PUBLICATIONS_FILE.read_text(encoding="utf-8")
    if current == output:
        print("No publication changes detected.")
        return

    PUBLICATIONS_FILE.write_text(output, encoding="utf-8")
    print(
        f"Scholar sync complete: {len(scholar_articles)} Scholar publications, "
        f"{len(merged)} total website entries."
    )
    print(f"Profile: {PROFILE_URL}")


if __name__ == "__main__":
    main()
