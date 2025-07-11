"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";                               // ← NEW
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeInSection } from "@/components/fade-in-section";
import { Search, ExternalLink, Copy } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/* ------------------------------------------------------------------ */

export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  link: string;
  abstract: string;
  thumbnail?: string;         // image file in /public/images
  tags: string[];
  year: number;
  bibtex?: string;
}

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";        // for GitHub Pages



export default function PublicationsList({
  publications,
}: {
  publications: Publication[];
}) {
  /* ------------------------------- state ------------------------------ */
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  /* ---------------------------- derived data -------------------------- */
  const allTags = useMemo(
    () => Array.from(new Set(publications.flatMap((p) => p.tags))),
    [publications],
  );

  const years = useMemo(
    () => Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a),
    [publications],
  );

  const filtered = publications.filter((pub) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      pub.title.toLowerCase().includes(q) ||
      pub.authors.some((a) => a.toLowerCase().includes(q)) ||
      pub.venue.toLowerCase().includes(q);

    const matchesTags =
      selectedTags.length === 0 || selectedTags.some((t) => pub.tags.includes(t));

    return matchesSearch && matchesTags;
  });

  const byYear = years
    .map((y) => ({ year: y, list: filtered.filter((p) => p.year === y) }))
    .filter((g) => g.list.length);

  /* ----------------------------- helpers ----------------------------- */
  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );

  const copyBibTeX = (pub: Publication) => {
    const id = pub.title.toLowerCase().replace(/\s+/g, "_");
    const bib =
      `@article{${id}_${pub.year},
  title   = {${pub.title}},
  author  = {${pub.authors.join(" and ")}},
  journal = {${pub.venue}},
  year    = {${pub.year}},
  url     = {${pub.link}}
}`;
    navigator.clipboard.writeText(bib).then(() =>
      toast.success("BibTeX copied to clipboard"),
    );
  };

  /* ------------------------------ render ------------------------------ */
  return (
    <div>
      {/* ---------- search + tag filter ---------- */}
      <FadeInSection>
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search publications…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Filter by Topic:</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ---------- grouped list ---------- */}
      <div className="space-y-8">
        {byYear.map((group, yearIdx) => (
          <FadeInSection key={group.year} delay={yearIdx * 0.1}>
            <Collapsible defaultOpen>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-2xl font-bold p-0 h-auto hover:bg-transparent"
                >
                  {group.year} ({group.list.length})
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-4 mt-4">
                {group.list.map((pub, idx) => (
                  <Card key={idx} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between gap-4">
                        {/* --- meta --- */}
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{pub.title}</CardTitle>
                          <CardDescription className="text-base">
                            by <span className="font-medium">{pub.authors.join(", ")}</span>
                            <br />
                            <span className="text-sm">
                              <b>
                                <em>{pub.venue}</em>
                              </b>
                            </span>
                          </CardDescription>
                        </div>

                        {/* --- buttons / modal trigger --- */}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={pub.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              PDF
                            </a>
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">Details</Button>
                            </DialogTrigger>

                            {/* ---------------- modal ---------------- */}
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>{pub.title}</DialogTitle>

                                {/* thumbnail (optional) */}
                                {pub.thumbnail && (
                                  <div className="relative w-full mt-4 aspect-[16/9] overflow-hidden rounded-md bg-black/5">
                                    <Image
                                      src={`${prefix}/images/${pub.thumbnail}`}
                                      alt={`${pub.title} thumbnail`}
                                      fill
                                      className="object-contain"
                                      sizes="(max-width:768px) 100vw, 700px"
                                    />
                                  </div>
                                )}

                                <DialogDescription className="text-base mt-4">
                                  {pub.abstract}
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-4">
                                <Meta label="Authors" value={pub.authors.join(", ")} />
                                <Meta label="Published in" value={`${pub.venue} (${pub.year})`} />
                                <Meta
                                  label="Topics"
                                  value={
                                    <div className="flex flex-wrap gap-2">
                                      {pub.tags.map((t) => (
                                        <Badge key={t} variant="secondary">{t}</Badge>
                                      ))}
                                    </div>
                                  }
                                />

                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" onClick={() => copyBibTeX(pub)}>
                                    <Copy className="w-4 h-4 mr-1" />
                                    Copy BibTeX
                                  </Button>
                                  <Button variant="outline" size="sm" asChild>
                                    <a href={pub.link} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="w-4 h-4 mr-1" />
                                      View Paper
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>

                      {/* tags under card */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {pub.tags.map((t) => (
                          <Badge key={t} variant="secondary" className="text-xs">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </FadeInSection>
        ))}
      </div>
    </div>
  );
}

/* ----------------------- small helper ---------------------- */
function Meta({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-semibold mb-2">{label}:</h4>
      <div>{value}</div>
    </div>
  );
}
