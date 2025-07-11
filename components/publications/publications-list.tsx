"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeInSection } from "@/components/fade-in-section"
import { Search, ExternalLink, Copy } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// This would normally come from data/publications.json
const publicationsData = [
  {
    title: "Quantum-Enhanced Optimization for Healthcare Resource Allocation",
    authors: ["Dr. Jane Smith", "John Doe", "Alice Johnson"],
    date: "2024-01-15",
    venue: "Nature Quantum Information",
    link: "#",
    abstract:
      "We present a novel quantum-enhanced optimization framework for healthcare resource allocation that demonstrates significant improvements over classical methods. Our approach leverages quantum annealing to solve complex scheduling and resource distribution problems in hospital settings.",
    thumbnail: "/placeholder.svg?height=100&width=150",
    tags: ["Quantum Computing", "Healthcare", "Optimization"],
    year: 2024,
  },
  {
    title: "Federated Learning with Differential Privacy for Autonomous Vehicles",
    authors: ["Dr. Bob Wilson", "Carol Davis", "Dr. Jane Smith"],
    date: "2024-01-10",
    venue: "NeurIPS 2024",
    link: "#",
    abstract:
      "This paper introduces a federated learning framework that enables autonomous vehicles to collaboratively learn while preserving privacy through differential privacy mechanisms. We demonstrate improved performance in object detection and path planning tasks.",
    thumbnail: "/placeholder.svg?height=100&width=150",
    tags: ["Federated Learning", "Privacy", "Autonomous Vehicles"],
    year: 2024,
  },
  {
    title: "Multi-Objective Optimization in Smart Grid Management",
    authors: ["Dr. Eve Brown", "Frank Miller", "Dr. Jane Smith"],
    date: "2023-12-05",
    venue: "IEEE Transactions on Smart Grid",
    link: "#",
    abstract:
      "We propose a multi-objective optimization approach for smart grid management that balances energy efficiency, cost minimization, and reliability. Our method uses evolutionary algorithms combined with machine learning for real-time decision making.",
    thumbnail: "/placeholder.svg?height=100&width=150",
    tags: ["Smart Grid", "Multi-Objective", "Optimization"],
    year: 2023,
  },
  {
    title: "Deep Reinforcement Learning for Supply Chain Optimization",
    authors: ["Dr. Grace Lee", "Henry Taylor", "Dr. Bob Wilson"],
    date: "2023-11-20",
    venue: "Operations Research",
    link: "#",
    abstract:
      "This work presents a deep reinforcement learning approach for supply chain optimization under uncertainty. We demonstrate superior performance compared to traditional methods in handling demand variability and supply disruptions.",
    thumbnail: "/placeholder.svg?height=100&width=150",
    tags: ["Reinforcement Learning", "Supply Chain", "Optimization"],
    year: 2023,
  },
]

const allTags = Array.from(new Set(publicationsData.flatMap((pub) => pub.tags)))
const years = Array.from(new Set(publicationsData.map((pub) => pub.year))).sort((a, b) => b - a)

export function PublicationsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedPublication, setSelectedPublication] = useState<(typeof publicationsData)[0] | null>(null)

  const filteredPublications = publicationsData.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pub.venue.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => pub.tags.includes(tag))

    return matchesSearch && matchesTags
  })

  const publicationsByYear = years
    .map((year) => ({
      year,
      publications: filteredPublications.filter((pub) => pub.year === year),
    }))
    .filter((group) => group.publications.length > 0)

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const copyBibTeX = (publication: (typeof publicationsData)[0]) => {
    const bibtex = `@article{${publication.title.toLowerCase().replace(/\s+/g, "_")}_${publication.year},
  title={${publication.title}},
  author={${publication.authors.join(" and ")}},
  journal={${publication.venue}},
  year={${publication.year}},
  url={${publication.link}}
}`
    navigator.clipboard.writeText(bibtex)
  }

  return (
    <div>
      <FadeInSection>
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search publications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Filter by Topic:</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      <div className="space-y-8">
        {publicationsByYear.map((yearGroup, yearIndex) => (
          <FadeInSection key={yearGroup.year} delay={yearIndex * 0.1}>
            <Collapsible defaultOpen>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-2xl font-bold p-0 h-auto hover:bg-transparent"
                >
                  {yearGroup.year} ({yearGroup.publications.length})
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 mt-4">
                {yearGroup.publications.map((publication, pubIndex) => (
                  <Card key={pubIndex} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{publication.title}</CardTitle>
                          <CardDescription className="text-base">
                            by <span className="font-medium">{publication.authors.join(", ")}</span>
                            <br />
                            <span className="text-sm">
                              {new Date(publication.date).toLocaleDateString()} in <em>{publication.venue}</em>
                            </span>
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={publication.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              PDF
                            </a>
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedPublication(publication)}>
                                Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{publication.title}</DialogTitle>
                                <DialogDescription className="text-base">{publication.abstract}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Authors:</h4>
                                  <p>{publication.authors.join(", ")}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Published in:</h4>
                                  <p>
                                    {publication.venue} ({publication.year})
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Topics:</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {publication.tags.map((tag) => (
                                      <Badge key={tag} variant="secondary">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" onClick={() => copyBibTeX(publication)}>
                                    <Copy className="w-4 h-4 mr-1" />
                                    Copy BibTeX
                                  </Button>
                                  <Button variant="outline" size="sm" asChild>
                                    <a href={publication.link} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="w-4 h-4 mr-1" />
                                      View Paper
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {publication.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </FadeInSection>
        ))}
      </div>
    </div>
  )
}
