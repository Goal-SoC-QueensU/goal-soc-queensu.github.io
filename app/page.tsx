import news from "@/data/news.json";          // recent-news data
import events from "@/data/events.json";      // ← NEW: upcoming-events data

import { HeroSection } from "@/components/home/hero-section";
import { RecentNewsSection } from "@/components/home/recent-news-section";
// import { FeaturedResearchSection } from "@/components/home/featured-research-section";
import { UpcomingEventsSection } from "@/components/home/upcoming-events-section";

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />

      {/* recent news */}
      <RecentNewsSection news={news.filter((n) => n.featured !== false)} />

      {/* <FeaturedResearchSection /> */}

      {/* upcoming events */}
      <UpcomingEventsSection events={events} />
    </div>
  );
}
