import { AboutContent } from "@/components/about/about-content"
import { FadeInSection } from "@/components/fade-in-section"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <FadeInSection>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About GOAL Lab</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn about our mission, history, and collaborations in advancing optimization, analytics, and learning
            research.
          </p>
        </div>
      </FadeInSection>
      <AboutContent />
    </div>
  )
}
