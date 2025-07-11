import { FadeInSection } from "@/components/fade-in-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Phone } from "lucide-react"

// This would normally come from data/labInfo.yaml
const labInfo = {
  mission:
    "The Global Optimization, Analytics, and Learning (GOAL) Lab at Queen's University is dedicated to advancing the frontiers of optimization, machine learning, and data analytics. Our mission is to develop innovative algorithms and methodologies that address real-world challenges in healthcare, autonomous systems, smart cities, and quantum computing. We strive to bridge the gap between theoretical research and practical applications, fostering collaboration between academia and industry to create solutions that benefit society.",

  collaborations: [
    "Tesla - Autonomous vehicle optimization algorithms",
    "IBM Research - Quantum computing applications in healthcare",
    "Google DeepMind - Federated learning for privacy-preserving AI",
    "Microsoft Research - Cloud-based optimization platforms",
    "Shopify - Supply chain and logistics optimization",
    "Kingston Health Sciences Centre - Healthcare resource allocation",
  ],

  history: [
    {
      year: "2018",
      event: "GOAL Lab founded by Dr. Jane Smith at Queen's University",
    },
    {
      year: "2019",
      event: "First major NSF grant awarded for quantum optimization research",
    },
    {
      year: "2020",
      event: "Partnership with Tesla established for autonomous vehicle research",
    },
    {
      year: "2021",
      event: "Lab expanded to include 15+ researchers and students",
    },
    {
      year: "2022",
      event: "IBM Quantum Network partnership initiated",
    },
    {
      year: "2023",
      event: "Healthcare optimization platform deployed at local hospitals",
    },
    {
      year: "2024",
      event: "50+ publications milestone reached",
    },
  ],

  contact: {
    address: "Walter Light Hall, Room 205\nQueen's University\nKingston, ON K7L 3N6\nCanada",
    email: "goal.lab@queensu.ca",
    phone: "+1 (613) 533-2000",
  },
}

export function AboutContent() {
  return (
    <div className="space-y-12">
      {/* Mission Section */}
      <FadeInSection>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
                <CardDescription>Advancing optimization, analytics, and learning research</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{labInfo.mission}</p>
          </CardContent>
        </Card>
      </FadeInSection>

      {/* Collaborations Section */}
      <FadeInSection delay={0.2}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <CardTitle className="text-2xl">Industry Collaborations</CardTitle>
                <CardDescription>Partnerships driving innovation and real-world impact</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {labInfo.collaborations.map((collaboration, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{collaboration}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </FadeInSection>

      {/* History Section */}
      <FadeInSection delay={0.4}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <CardTitle className="text-2xl">Our History</CardTitle>
                <CardDescription>Key milestones in GOAL Lab's journey</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

              <div className="space-y-8">
                {labInfo.history.map((item, index) => (
                  <div key={index} className="relative flex items-start space-x-4">
                    {/* Timeline dot */}
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background relative z-10" />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {item.year}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeInSection>

      {/* Contact Section */}
      <FadeInSection delay={0.6}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Contact Us</CardTitle>
                <CardDescription>Get in touch with our team</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Address</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{labInfo.contact.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <a href={`mailto:${labInfo.contact.email}`} className="text-sm text-primary hover:underline">
                    {labInfo.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <a href={`tel:${labInfo.contact.phone}`} className="text-sm text-primary hover:underline">
                    {labInfo.contact.phone}
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeInSection>

      {/* Research Areas Icons Section */}
      <FadeInSection delay={0.8}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Research Focus Areas</CardTitle>
            <CardDescription className="text-center">Our core research domains driving innovation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Optimization */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Optimization</h3>
                  <p className="text-sm text-muted-foreground">Advanced algorithms for complex optimization problems</p>
                </div>
              </div>

              {/* Analytics */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Analytics</h3>
                  <p className="text-sm text-muted-foreground">Data-driven insights and predictive modeling</p>
                </div>
              </div>

              {/* Learning */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Learning</h3>
                  <p className="text-sm text-muted-foreground">Machine learning and AI-powered solutions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeInSection>
    </div>
  )
}
