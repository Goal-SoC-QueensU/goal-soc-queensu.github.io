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
  image?: string;          // file name in /public/images
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  featured?: boolean;
  relatedPubs?: string[];
}

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const img = (file?: string) =>
  `${prefix}/images/${file && file.trim() ? file : "placeholder-research.png"}`;

export default function ResearchGrid({ projects }: { projects: Project[] }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tags))),
    [projects],
  );

  const filteredProjects =
    selectedTags.length === 0
      ? projects
      : projects.filter((p) => selectedTags.some((t) => p.tags.includes(t)));

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );

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

      {/* project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <FadeInSection key={idx} delay={idx * 0.1}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <Image
                  src={img(project.image)}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="mb-4">
                  {project.shortDesc}
                </CardDescription>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="relative w-full aspect-video rounded-md overflow-hidden mb-4">
                      <Image
                        src={img(project.image)}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <DialogHeader>
                      <DialogTitle>{project.title}</DialogTitle>
                      <DialogDescription className="text-base">
                        {project.fullDesc}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Research Areas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
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
