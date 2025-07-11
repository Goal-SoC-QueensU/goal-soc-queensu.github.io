import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeInSection } from "@/components/fade-in-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// This would normally come from data/projects.json where featured: true
const featuredProjects = [
  {
    title: "Quantum-Enhanced Healthcare Optimization",
    image: "/placeholder.svg?height=200&width=300",
    shortDesc:
      "Developing quantum algorithms for optimizing treatment plans and resource allocation in healthcare systems.",
    featured: true,
  },
  {
    title: "Autonomous Vehicle Fleet Management",
    image: "/placeholder.svg?height=200&width=300",
    shortDesc:
      "AI-driven optimization for autonomous vehicle routing, scheduling, and energy management in smart cities.",
    featured: true,
  },
  {
    title: "Federated Learning for Privacy-Preserving Analytics",
    image: "/placeholder.svg?height=200&width=300",
    shortDesc: "Novel federated learning approaches for collaborative machine learning while preserving data privacy.",
    featured: true,
  },
]

export function FeaturedResearchSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Research</h2>
            <p className="text-xl text-muted-foreground">Explore our cutting-edge research projects</p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
          {featuredProjects.map((project, index) => (
            <FadeInSection key={index} delay={index * 0.1}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{project.shortDesc}</CardDescription>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection>
          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/research">View All Research</Link>
            </Button>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
