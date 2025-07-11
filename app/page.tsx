import { HeroSection } from "@/components/home/hero-section"
import { RecentNewsSection } from "@/components/home/recent-news-section"
import { FeaturedResearchSection } from "@/components/home/featured-research-section"
import { UpcomingEventsSection } from "@/components/home/upcoming-events-section"

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <RecentNewsSection />
      <FeaturedResearchSection />
      <UpcomingEventsSection />
    </div>
  )
}
