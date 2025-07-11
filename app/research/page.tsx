import { ResearchGrid } from "@/components/research/research-grid"
import { FadeInSection } from "@/components/fade-in-section"

export default function ResearchPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <FadeInSection>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Research Projects</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our cutting-edge research in optimization, analytics, and machine learning across various domains
            including healthcare, autonomous systems, and quantum computing.
          </p>
        </div>
      </FadeInSection>
      <ResearchGrid />
    </div>
  )
}
