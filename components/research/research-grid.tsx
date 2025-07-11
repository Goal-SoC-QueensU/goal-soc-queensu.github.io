"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FadeInSection } from "@/components/fade-in-section"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// This would normally come from data/projects.json
const projectsData = [
  {
    title: "Quantum-Enhanced Healthcare Optimization",
    image: "/placeholder.svg?height=200&width=300",
    shortDesc:
      "Developing quantum algorithms for optimizing treatment plans and resource allocation in healthcare systems.",
    fullDesc:
      "This project focuses on leveraging quantum computing capabilities to solve complex optimization problems in healthcare. We develop novel quantum algorithms that can efficiently handle large-scale resource allocation problems, treatment scheduling, and personalized medicine optimization. Our approach combines quantum annealing with classical machine learning techniques to achieve superior performance compared to traditional methods.",
    tags: ["Quantum Computing", "Healthcare", "Optimization"],
    featured: true,
    relatedPubs: ["quantum-healthcare-2024", "optimization-algorithms-2023"],
  },
  {
    title: "Autonomous Vehicle Fleet Management",
    image: "/placeholder.svg?height=200&width=300",
    shortDesc:
      "AI-driven optimization for autonomous vehicle routing, scheduling, and energy management in smart cities.",
    fullDesc:
      "Our research in autonomous vehicle fleet management addresses the complex challenges of coordinating large fleets of self-driving vehicles in urban environments. We develop sophisticated algorithms for real-time route optimization, dynamic scheduling, and energy-efficient operations. The project integrates machine learning, operations research, and IoT technologies to create intelligent transportation systems.",
    tags: ["Autonomous Vehicles", "Smart Cities", "Machine Learning"],
    featured: true,
    relatedPubs: ["av-fleet-2024", "smart-cities-2023"],
  },
  {
    title: "Federated Learning for Privacy-Preserving Analytics",
    image: "/placeholder.svg?height=200&width=300",
    shortDesc: "Novel federated learning approaches for collaborative machine learning while preserving data privacy.",
    fullDesc:
      "This research explores advanced federated learning techniques that enable multiple organizations to collaboratively train machine learning models without sharing sensitive data. We focus on developing privacy-preserving algorithms, secure aggregation methods, and differential privacy techniques to ensure data protection while maintaining model performance.",
    tags: ["Federated Learning", "Privacy", "Machine Learning"],
    featured: true,
    relatedPubs: ["federated-privacy-2024", "secure-ml-2023"],
  },
  {
    title: "Supply Chain Optimization with Uncertainty",
    image: "/placeholder.svg?height=200&width=300",
    shortDesc: "Robust optimization methods for supply chain management under uncertainty and disruption.",
    fullDesc:
      "We develop robust optimization frameworks for supply chain management that can handle various sources of uncertainty including demand fluctuations, supply disruptions, and transportation delays. Our methods combine stochastic programming with machine learning to create adaptive supply chain strategies.",
    tags: ["Supply Chain", "Optimization", "Uncertainty"],
    featured: false,
    relatedPubs: ["supply-chain-2024"],
  },
]

const allTags = Array.from(new Set(projectsData.flatMap((project) => project.tags)))

export function ResearchGrid() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedProject, setSelectedProject] = useState<(typeof projectsData)[0] | null>(null)

  const filteredProjects =
    selectedTags.length === 0
      ? projectsData
      : projectsData.filter((project) => selectedTags.some((tag) => project.tags.includes(tag)))

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div>
      <FadeInSection>
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Filter by Research Area:</h3>
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
      </FadeInSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <FadeInSection key={index} delay={index * 0.1}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{project.shortDesc}</CardDescription>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedProject(project)}>
                      Learn More
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{project.title}</DialogTitle>
                      <DialogDescription className="text-base">{project.fullDesc}</DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Research Areas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </FadeInSection>
        ))}
      </div>
    </div>
  )
}
