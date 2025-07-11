import { PublicationsList } from "@/components/publications/publications-list"
import { FadeInSection } from "@/components/fade-in-section"

export default function PublicationsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <FadeInSection>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Publications</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our latest research publications and contributions to the scientific community.
          </p>
        </div>
      </FadeInSection>
      <PublicationsList />
    </div>
  )
}
