import publications from "@/data/publications.json";
import PublicationsList from "@/components/publications/publications-list";
import { FadeInSection } from "@/components/fade-in-section";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const scholarProfile =
  "https://scholar.google.com/citations?user=EzCD7v0AAAAJ&hl=en";

export default function PublicationsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <FadeInSection>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Publications</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Publications are synchronized with Prof. Salimur Choudhury&apos;s
            Google Scholar profile. Selected publications include additional
            abstracts, topics, and figures.
          </p>

          <div className="mt-6">
            <Button variant="outline" asChild>
              <a
                href={scholarProfile}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Google Scholar
              </a>
            </Button>
          </div>
        </div>
      </FadeInSection>

      <PublicationsList publications={publications} />
    </div>
  );
}
