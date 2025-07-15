"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeInSection } from "@/components/fade-in-section";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface Project {
  title: string;
  image?: string;
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  featured?: boolean;
  relatedPubs?: string[];
}

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const img = (f?: string) =>
  `${prefix}/images/${f && f.trim() ? f : "placeholder-research.png"}`;

export default function ResearchGrid({ projects }: { projects: Project[] }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tags))),
    [projects],
  );

  const filtered =
    selectedTags.length === 0
      ? projects
      : projects.filter((p) => selectedTags.some((t) => p.tags.includes(t)));

  const toggleTag = (t: string) =>
    setSelectedTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  return (
    <div>
      {/* tag filter */}
      <FadeInSection>
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Filter by Research Area:</h3>
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
      </FadeInSection>

      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((p, idx) => (
          <FadeInSection key={idx} delay={idx * 0.1}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <Image
                  src={img(p.image)}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </div>

              <CardHeader>
                <CardTitle className="text-lg">{p.title}</CardTitle>
                <div className="flex flex-wrap gap-1">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="mb-4 text-justify">{p.shortDesc}</CardDescription>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    {/* --- thumbnail (normal flow, no overlap) --- */}
                    <Image
                      src={img(p.image)}
                      alt={p.title}
                      width={1280}
                      height={720}
                      className="w-full h-auto rounded-md object-contain mb-4"
                      sizes="(max-width:768px) 100vw,
                             (max-width:1200px) 700px,
                             900px"
                    />

                    <DialogHeader>
                      <DialogTitle>{p.title}</DialogTitle>
                      <DialogDescription className="text-base text-justify">
                        {p.fullDesc}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Research Areas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <Badge key={t} variant="secondary">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </FadeInSection>
        ))}
      </div>
    </div>
  );
}
