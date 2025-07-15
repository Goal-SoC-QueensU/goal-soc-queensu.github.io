"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeInSection } from "@/components/fade-in-section";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { NewsItem } from "@/components/home/recent-news-section";

/* helper so we always have a safe image source */
const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const img = (file?: string) =>
  `${prefix}/images/${
    file && file.trim() ? file : "placeholder-news.png"
  }`;

export default function NewsGrid({ news }: { news: NewsItem[] }) {
  const [openItem, setOpenItem] = useState<NewsItem | null>(null);

  /** newest first */
  const sorted = [...news].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sorted.map((item, idx) => (
        <FadeInSection key={idx} delay={idx * 0.05}>
          <Card className="h-full hover:shadow-lg transition hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(item.date + "T00:00:00").toLocaleDateString("en-CA")}
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <CardDescription className="mb-4 text-justify">
                {item.excerpt}
              </CardDescription>

              {/* modal --------------------------------------------------- */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setOpenItem(item)}
                  >
                    Read More
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  {openItem && (
                    <>
                      <DialogHeader>
                        <DialogTitle className="text-justify">{openItem.title}</DialogTitle>
                      </DialogHeader>

                      {/* thumbnail — keeps its own flow, no overlap */}
                      {openItem.thumbnail && (
                        <Image
                          src={img(openItem.thumbnail)}
                          alt={`${openItem.title} illustration`}
                          width={1280}      /* any 16 × 9 size works */
                          height={720}
                          className="w-full h-auto rounded-md my-4 object-contain"
                          sizes="(max-width: 768px) 100vw,
                                 (max-width: 1200px) 700px,
                                 900px"
                          priority={false}
                        />
                      )}

                      {/* full description */}
                      <DialogDescription className="text-base whitespace-pre-line text-justify">
                        {openItem.description}
                      </DialogDescription>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </FadeInSection>
      ))}
    </div>
  );
}
