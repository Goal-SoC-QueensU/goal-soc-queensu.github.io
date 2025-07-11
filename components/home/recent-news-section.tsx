import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeInSection } from "@/components/fade-in-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar } from "lucide-react"

// This would normally come from data/news.json
const newsData = [
  {
    title: "New NSF Grant Awarded for Quantum Optimization Research",
    date: "2024-01-15",
    excerpt:
      "GOAL Lab receives $2.5M NSF grant to advance quantum optimization algorithms for healthcare applications.",
    link: "#",
  },
  {
    title: "Paper Accepted at NeurIPS 2024",
    date: "2024-01-10",
    excerpt: "Our work on 'Federated Learning for Autonomous Vehicle Networks' has been accepted at NeurIPS 2024.",
    link: "#",
  },
  {
    title: "Industry Partnership with Tesla Announced",
    date: "2024-01-05",
    excerpt:
      "Exciting collaboration to develop next-generation optimization algorithms for autonomous driving systems.",
    link: "#",
  },
]

export function RecentNewsSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recent News</h2>
            <p className="text-xl text-muted-foreground">Stay updated with our latest achievements and announcements</p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {newsData.map((news, index) => (
            <FadeInSection key={index} delay={index * 0.1}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transform transition-transform">
                <CardHeader>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(news.date).toLocaleDateString()}
                  </div>
                  <CardTitle className="text-lg">{news.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{news.excerpt}</CardDescription>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={news.link}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}
