"use client";

import { useMemo, useState } from "react";
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

export interface Publication {
  title: string;
  authors: string[];
  date: string;          // ISO string
  venue: string;
  link: string;
  abstract: string;
  thumbnail?: string;    // (not displayed here, but kept for completeness)
  tags: string[];
  year: number;
}

export default function PublicationsList({ publications }: { publications: Publication[] }) {

  /* ------------------------------- state ------------------------------ */
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  /* ---------------------------- derived data -------------------------- */
  const allTags = useMemo(
    () => Array.from(new Set(publications.flatMap((p) => p.tags))),
    [publications],
  );

  const years = useMemo(
    () =>
      Array.from(new Set(publications.map((p) => p.year))).sort(
        (a, b) => b - a,
      ),
    [publications],
  );

  const filteredPublications = publications.filter((pub) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      pub.title.toLowerCase().includes(q) ||
      pub.authors.some((a) => a.toLowerCase().includes(q)) ||
      pub.venue.toLowerCase().includes(q);

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => pub.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const publicationsByYear = years
    .map((year) => ({
      year,
      publications: filteredPublications.filter((p) => p.year === year),
    }))
    .filter((g) => g.publications.length > 0);

  /* ----------------------------- helpers ----------------------------- */
  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );

  const copyBibTeX = (pub: Publication) => {
    const id = pub.title.toLowerCase().replace(/\\s+/g, "_");
    const bib = `@article{${id}_${pub.year},
  title={${pub.title}},
  author={${pub.authors.join(" and ")}},
  journal={${pub.venue}},
  year={${pub.year}},
  url={${pub.link}}
}`;
    navigator.clipboard.writeText(bib);
  };

  /* ------------------------------ render ------------------------------ */
  return (
    <div>
      {/* search + tag filter (unchanged) */}
      <FadeInSection>
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search publications..."
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

      {/* list grouped by year (unchanged) */}
      <div className="space-y-8">
        {publicationsByYear.map((yearGroup, yearIndex) => (
          <FadeInSection key={yearGroup.year} delay={yearIndex * 0.1}>
            <Collapsible defaultOpen>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-2xl font-bold p-0 h-auto hover:bg-transparent"
                >
                  {yearGroup.year} ({yearGroup.publications.length})
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-4 mt-4">
                {yearGroup.publications.map((publication, pubIndex) => (
                  <Card
                    key={pubIndex}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start gap-4">
                        {/* meta block (unchanged) */}
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">
                            {publication.title}
                          </CardTitle>
                          <CardDescription className="text-base">
                            by{" "}
                            <span className="font-medium">
                              {publication.authors.join(", ")}
                            </span>
                            <br />
                            <span className="text-sm">
                              {new Date(
                                publication.date,
                              ).toLocaleDateString()}{" "}
                              in <em>{publication.venue}</em>
                            </span>
                          </CardDescription>
                        </div>

                        {/* buttons + modal (unchanged) */}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={publication.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              PDF
                            </a>
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{publication.title}</DialogTitle>
                                <DialogDescription className="text-base">
                                  {publication.abstract}
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-4">
                                <Meta
                                  label="Authors"
                                  value={publication.authors.join(", ")}
                                />
                                <Meta
                                  label="Published in"
                                  value={`${publication.venue} (${publication.year})`}
                                />
                                <Meta
                                  label="Topics"
                                  value={
                                    <div className="flex flex-wrap gap-2">
                                      {publication.tags.map((tag) => (
                                        <Badge
                                          key={tag}
                                          variant="secondary"
                                        >
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  }
                                />

                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => copyBibTeX(publication)}
                                  >
                                    <Copy className="w-4 h-4 mr-1" />
                                    Copy BibTeX
                                  </Button>
                                  <Button variant="outline" size="sm" asChild>
                                    <a
                                      href={publication.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
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

                      {/* tag pills under the card (unchanged) */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {publication.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
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

/* helper used in modal – unchanged design */
function Meta({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-semibold mb-2">{label}:</h4>
      <div>{value}</div>
    </div>
  );
}
