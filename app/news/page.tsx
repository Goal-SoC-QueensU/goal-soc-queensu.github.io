import news from "@/data/news.json";
import NewsGrid from "@/components/news/news-grid";
import { FadeInSection } from "@/components/fade-in-section";

export const metadata = {
    title: "News – GOAL Lab",
};

export default function NewsPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <FadeInSection>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">News &amp; Announcements</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Browse all of our lab’s updates, awards, and milestones.
                    </p>
                </div>
            </FadeInSection>

            <NewsGrid news={news} />
        </div>
    );
}
