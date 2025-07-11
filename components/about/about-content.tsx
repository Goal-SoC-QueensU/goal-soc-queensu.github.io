import { FadeInSection } from "@/components/fade-in-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
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
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor"\
