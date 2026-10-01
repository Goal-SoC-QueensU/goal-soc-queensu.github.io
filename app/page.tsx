import news from "@/data/news.json";          // recent-news data


import { HeroSection } from "@/components/home/hero-section";
import { RecentNewsSection } from "@/components/home/recent-news-section";
// import { FeaturedResearchSection } from "@/components/home/featured-research-section";


export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />

      {/* recent news */}
      <RecentNewsSection news={news.filter((n) => n.featured !== false)} />

      {/* <FeaturedResearchSection /> */}
    </div>
  );
}
