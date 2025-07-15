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

export interface NewsItem {
  title: string;
  date: string;          // ISO‑8601
  excerpt: string;
  description: string;
  thumbnail?: string;    // file in /public/images  (optional)
}

/* safe image helper -------------------------------------------------- */
const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const img = (file?: string) =>
  `${prefix}/images/${file && file.trim() ? file : "placeholder-news.png"}`;

/* -------------------------------------------------------------------- */
export function RecentNewsSection({ news }: { news: NewsItem[] }) {
  const [openItem, setOpenItem] = useState<NewsItem | null>(null);

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* heading */}
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recent News</h2>
            <p className="text-xl text-muted-foreground">
              Stay updated with our latest achievements and announcements
            </p>
          </div>
        </FadeInSection>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {news.map((item, idx) => (
            <FadeInSection key={idx} delay={idx * 0.1}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transform">
                <CardHeader>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(item.date + "T00:00:00").toLocaleDateString("en-CA")}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  {/* excerpt now justified */}
                  <CardDescription className="mb-4 text-justify">
                    {item.excerpt}
                  </CardDescription>

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
                            <DialogTitle>{openItem.title}</DialogTitle>
                          </DialogHeader>

                          {/* thumbnail (regular flow, no overlay) */}
                          {openItem.thumbnail && (
                            <Image
                              src={img(openItem.thumbnail)}
                              alt={`${openItem.title} illustration`}
                              width={1280}
                              height={720}          /* any 16:9 size works */
                              className="w-full h-auto rounded-md my-4 object-contain"
                              sizes="(max-width: 768px) 100vw,
                                     (max-width: 1200px) 700px,
                                     900px"
                            />
                          )}

                          {/* full text, justified */}
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
      </div>
    </section>
  );
}
