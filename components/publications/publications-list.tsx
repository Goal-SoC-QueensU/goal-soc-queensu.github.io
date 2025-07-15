"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  thumbnail?: string;
  tags: string[];
  year: number;
  bibtex?: string;
}

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const img = (file?: string) =>
  `${prefix}/images/${file && file.trim() ? file : "placeholder-news.png"}`;

/* ------------------------------------------------------------------ */
export default function PublicationsList({
  publications,
}: {
  publications: Publication[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  /* derived */
  const allTags = useMemo(
    () => Array.from(new Set(publications.flatMap((p) => p.tags))),
    [publications],
  );
  const years = useMemo(
    () => Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a),
    [publications],
  );

  const filtered = publications.filter((p) => {
    const q = searchTerm.toLowerCase();
    return (
      (p.title + p.venue).toLowerCase().includes(q) ||
      p.authors.some((a) => a.toLowerCase().includes(q))
    ) &&
      (selectedTags.length === 0 || selectedTags.some((t) => p.tags.includes(t)));
  });

  const byYear = years
    .map((y) => ({ year: y, list: filtered.filter((p) => p.year === y) }))
    .filter((g) => g.list.length);

  /* helpers */
  const toggleTag = (t: string) =>
    setSelectedTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const copyBibTeX = (p: Publication) => {
    const id = p.title.toLowerCase().replace(/\s+/g, "_");
    const bib = `@article{${id}_${p.year},
  title   = {${p.title}},
  author  = {${p.authors.join(" and ")}},
  journal = {${p.venue}},
  year    = {${p.year}},
  url     = {${p.link}}
}`;
    navigator.clipboard.writeText(bib).then(() =>
      toast.success("BibTeX copied to clipboard"),
    );
  };

  /* render */
  return (
    <div>
      {/* search + tags */}
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

      {/* list by year */}
      <div className="space-y-8">
        {byYear.map((group, yIdx) => (
          <FadeInSection key={group.year} delay={yIdx * 0.1}>
            <Collapsible defaultOpen>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-start text-2xl font-bold p-0 h-auto">
                  {group.year} ({group.list.length})
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-4 mt-4">
                {group.list.map((p, idx) => (
                  <Card key={idx} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{p.title}</CardTitle>
                          <CardDescription className="text-base">
                            by <span className="font-medium">{p.authors.join(", ")}</span>
                            <br />
                            <span className="text-sm"><b><em>{p.venue}</em></b></span>
                          </CardDescription>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={p.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              PDF
                            </a>
                          </Button>

                          {/* modal */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">Details</Button>
                            </DialogTrigger>

                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>{p.title}</DialogTitle>
                              </DialogHeader>

                              {/* thumbnail – now inline, no overlap */}
                              {p.thumbnail && (
                                <Image
                                  src={img(p.thumbnail)}
                                  alt={`${p.title} thumbnail`}
                                  width={1280}
                                  height={720}
                                  className="w-full h-auto my-4 rounded-md object-contain"
                                  sizes="(max-width:768px) 100vw,
                                         (max-width:1200px) 700px,
                                         900px"
                                />
                              )}

                              <DialogDescription className="text-base whitespace-pre-line mb-4">
                                {p.abstract}
                              </DialogDescription>

                              <Meta label="Authors" value={p.authors.join(", ")} />
                              <Meta label="Published in" value={`${p.venue} (${p.year})`} />
                              <Meta
                                label="Topics"
                                value={
                                  <div className="flex flex-wrap gap-2">
                                    {p.tags.map((t) => (
                                      <Badge key={t} variant="secondary">
                                        {t}
                                      </Badge>
                                    ))}
                                  </div>
                                }
                              />

                              <div className="flex gap-2 mt-4">
                                <Button variant="outline" size="sm" onClick={() => copyBibTeX(p)}>
                                  <Copy className="w-4 h-4 mr-1" />
                                  Copy BibTeX
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                  <a href={p.link} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4 mr-1" />
                                    View Paper
                                  </a>
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>

                      {/* tags */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {p.tags.map((t) => (
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

/* util for modal */
function Meta({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-semibold mb-2">{label}:</h4>
      <div>{value}</div>
    </div>
  );
}
