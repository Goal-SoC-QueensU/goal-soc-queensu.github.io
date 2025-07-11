"use client";

import { useState } from "react";
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
  date: string;        // ISO string
  excerpt: string;     // short preview
  description: string; // full text
}

/* ------------------------------------------------------------------ */

export function RecentNewsSection({ news }: { news: NewsItem[] }) {
  const [openItem, setOpenItem] = useState<NewsItem | null>(null);

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recent News</h2>
            <p className="text-xl text-muted-foreground">
              Stay updated with our latest achievements and announcements
            </p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {news.map((item, idx) => (
            <FadeInSection key={idx} delay={idx * 0.1}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transform transition-transform">
                <CardHeader>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="mb-4">
                    {item.excerpt}
                  </CardDescription>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setOpenItem(item)}>
                        Read More
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{openItem?.title}</DialogTitle>
                        <DialogDescription className="text-base whitespace-pre-line">
                          {openItem?.description}
                        </DialogDescription>
                      </DialogHeader>
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
