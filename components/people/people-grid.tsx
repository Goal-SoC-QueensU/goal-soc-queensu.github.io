"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FadeInSection } from "@/components/fade-in-section"
import { Github, Linkedin, ExternalLink, GraduationCap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// This would normally come from data/people.json
const peopleData = [
  {
    name: "Dr. Jane Smith",
    position: "Director & Founder",
    role: "Director",
    photo: "/placeholder.svg?height=150&width=150",
    researchInterests: ["Quantum Computing", "Healthcare Optimization", "Machine Learning"],
    website: "#",
    linkedin: "#",
    github: "#",
    scholar: "#",
    bio: "Dr. Jane Smith is the founder and director of GOAL Lab. She received her PhD in Computer Science from MIT and has over 15 years of experience in optimization and machine learning research. Her work focuses on quantum-enhanced algorithms for healthcare applications.",
    publications: ["quantum-healthcare-2024", "optimization-algorithms-2023"],
  },
  {
    name: "Dr. Bob Wilson",
    position: "Senior Research Scientist",
    role: "Researcher",
    photo: "/placeholder.svg?height=150&width=150",
    researchInterests: ["Autonomous Vehicles", "Federated Learning", "Privacy"],
    website: "#",
    linkedin: "#",
    github: "#",
    scholar: "#",
    bio: "Dr. Bob Wilson specializes in autonomous systems and privacy-preserving machine learning. He leads several industry collaborations and has published extensively in top-tier conferences.",
    publications: ["federated-privacy-2024", "av-fleet-2024"],
  },
  {
    name: "Alice Johnson",
    position: "PhD Student",
    role: "PhD Student",
    photo: "/placeholder.svg?height=150&width=150",
    researchInterests: ["Quantum Algorithms", "Optimization", "Healthcare"],
    website: "#",
    linkedin: "#",
    github: "#",
    scholar: "#",
    bio: "Alice is a third-year PhD student working on quantum optimization algorithms for healthcare applications. She holds an MSc in Mathematics from University of Toronto.",
    publications: ["quantum-healthcare-2024"],
  },
  {
    name: "John Doe",
    position: "MSc Student",
    role: "MSc Student",
    photo: "/placeholder.svg?height=150&width=150",
    researchInterests: ["Machine Learning", "Supply Chain", "Operations Research"],
    website: "#",
    linkedin: "#",
    github: "#",
    scholar: "#",
    bio: "John is pursuing his MSc in Computer Science with a focus on machine learning applications in supply chain optimization. He previously worked in industry for 3 years.",
    publications: ["supply-chain-2024"],
  },
  {
    name: "Carol Davis",
    position: "Undergraduate Researcher",
    role: "Undergraduate",
    photo: "/placeholder.svg?height=150&width=150",
    researchInterests: ["AI", "Computer Vision", "Robotics"],
    website: "#",
    linkedin: "#",
    github: "#",
    scholar: "#",
    bio: "Carol is a fourth-year Computer Science undergraduate student working on computer vision applications for autonomous vehicles. She plans to pursue graduate studies in AI.",
    publications: ["federated-privacy-2024"],
  },
  {
    name: "Dr. Michael Brown",
    position: "Former Postdoc (2020-2023)",
    role: "Alumni",
    photo: "/placeholder.svg?height=150&width=150",
    researchInterests: ["Optimization", "Smart Grids", "Energy Systems"],
    website: "#",
    linkedin: "#",
    github: "#",
    scholar: "#",
    bio: "Dr. Michael Brown completed his postdoc at GOAL Lab and is now an Assistant Professor at University of Waterloo. His research focuses on optimization in energy systems.",
    publications: ["smart-grid-2023"],
  },
]

const roles = ["All", "Director", "Researcher", "PhD Student", "MSc Student", "Undergraduate", "Alumni"]

export function PeopleGrid() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("All")
  const [selectedPerson, setSelectedPerson] = useState<(typeof peopleData)[0] | null>(null)

  const filteredPeople = peopleData.filter((person) => {
    const matchesSearch =
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.researchInterests.some((interest) => interest.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesRole = selectedRole === "All" || person.role === selectedRole

    return matchesSearch && matchesRole
  })

  const groupedPeople = {
    "Director & Founder": filteredPeople.filter((p) => p.role === "Director"),
    "Current Members": {
      Researchers: filteredPeople.filter((p) => p.role === "Researcher"),
      "PhD Students": filteredPeople.filter((p) => p.role === "PhD Student"),
      "MSc Students": filteredPeople.filter((p) => p.role === "MSc Student"),
      Undergraduates: filteredPeople.filter((p) => p.role === "Undergraduate"),
    },
    Alumni: filteredPeople.filter((p) => p.role === "Alumni"),
  }

  return (
    <div>
      <FadeInSection>
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search people..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </FadeInSection>

      <div className="space-y-12">
        {/* Director & Founder */}
        {groupedPeople["Director & Founder"].length > 0 && (
          <FadeInSection>
            <div>
              <h2 className="text-2xl font-bold mb-6">Director & Founder</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedPeople["Director & Founder"].map((person, index) => (
                  <PersonCard key={index} person={person} setSelectedPerson={setSelectedPerson} />
                ))}
              </div>
            </div>
          </FadeInSection>
        )}

        {/* Current Members */}
        <FadeInSection>
          <div>
            <h2 className="text-2xl font-bold mb-6">Current Members</h2>
            <div className="space-y-8">
              {Object.entries(groupedPeople["Current Members"]).map(
                ([category, people]) =>
                  people.length > 0 && (
                    <div key={category}>
                      <h3 className="text-xl font-semibold mb-4">{category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {people.map((person, index) => (
                          <PersonCard key={index} person={person} setSelectedPerson={setSelectedPerson} />
                        ))}
                      </div>
                    </div>
                  ),
              )}
            </div>
          </div>
        </FadeInSection>

        {/* Alumni */}
        {groupedPeople["Alumni"].length > 0 && (
          <FadeInSection>
            <div>
              <h2 className="text-2xl font-bold mb-6">Alumni</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedPeople["Alumni"].map((person, index) => (
                  <PersonCard key={index} person={person} setSelectedPerson={setSelectedPerson} />
                ))}
              </div>
            </div>
          </FadeInSection>
        )}
      </div>

      {/* Person Details Modal */}
      <Dialog open={!!selectedPerson} onOpenChange={() => setSelectedPerson(null)}>
        <DialogContent className="max-w-2xl">
          {selectedPerson && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src={selectedPerson.photo || "/placeholder.svg"}
                    alt={selectedPerson.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <DialogTitle className="text-xl">{selectedPerson.name}</DialogTitle>
                    <DialogDescription className="text-base">{selectedPerson.position}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Biography</h4>
                  <p className="text-sm text-muted-foreground">{selectedPerson.bio}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Research Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPerson.researchInterests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  {selectedPerson.website && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={selectedPerson.website}>
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Website
                      </Link>
                    </Button>
                  )}
                  {selectedPerson.scholar && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={selectedPerson.scholar}>
                        <GraduationCap className="w-4 h-4 mr-1" />
                        Scholar
                      </Link>
                    </Button>
                  )}
                  {selectedPerson.github && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={selectedPerson.github}>
                        <Github className="w-4 h-4 mr-1" />
                        GitHub
                      </Link>
                    </Button>
                  )}
                  {selectedPerson.linkedin && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={selectedPerson.linkedin}>
                        <Linkedin className="w-4 h-4 mr-1" />
                        LinkedIn
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function PersonCard({
  person,
  setSelectedPerson,
}: {
  person: (typeof peopleData)[0]
  setSelectedPerson: (person: (typeof peopleData)[0]) => void
}) {
  return (
    <Card
      className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => setSelectedPerson(person)}
    >
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Image
            src={person.photo || "/placeholder.svg"}
            alt={person.name}
            width={150}
            height={150}
            className="rounded-full mx-auto"
          />
        </div>
        <CardTitle className="text-lg">{person.name}</CardTitle>
        <CardDescription>{person.position}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 justify-center">
          {person.researchInterests.slice(0, 3).map((interest) => (
            <Badge key={interest} variant="secondary" className="text-xs">
              {interest}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
