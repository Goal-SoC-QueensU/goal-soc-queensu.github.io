"use client";

import { useState } from "react";
import Image from "next/image";                                  /* NEW */
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
    `${prefix}/images/${file && file.trim() ? file : "placeholder-news.png"}`;

export default function NewsGrid({ news }: { news: NewsItem[] }) {
    const [openItem, setOpenItem] = useState<NewsItem | null>(null);

    /** newest first */
    const sorted = [...news].sort(
        (a, b) => Number(new Date(b.date)) - Number(new Date(a.date)),
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((item, idx) => (
                <FadeInSection key={idx} delay={idx * 0.05}>
                    <Card className="h-full hover:shadow-lg transition hover:-translate-y-1">
                        <CardHeader>
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                                <Calendar className="w-4 h-4 mr-2" />
                                {new Date(item.date).toLocaleDateString()}
                            </div>
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <CardDescription className="mb-4">{item.excerpt}</CardDescription>

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
                                                <DialogTitle>{openItem.title}</DialogTitle>
                                            </DialogHeader>

                                            {/* thumbnail box — appears only if thumbnail exists */}
                                            {openItem.thumbnail && (
                                                <div className="relative w-full mt-4 aspect-[16/9] overflow-hidden rounded-md bg-black/5">
                                                    <Image
                                                        src={img(openItem.thumbnail)}
                                                        alt={`${openItem.title} illustration`}
                                                        fill
                                                        className="object-contain"   /* keeps full image visible */
                                                        sizes="(max-width: 768px) 100vw,
                                   (max-width: 1200px) 700px,
                                   900px"
                                                    />
                                                </div>
                                            )}

                                            {/* full description */}
                                            <DialogDescription className="text-base whitespace-pre-line mt-4">
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
