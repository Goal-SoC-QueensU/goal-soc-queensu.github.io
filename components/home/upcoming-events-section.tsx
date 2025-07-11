import { FadeInSection } from "@/components/fade-in-section"
import { Calendar, MapPin } from "lucide-react"
import Link from "next/link"

// This would normally come from data/events.json
const eventsData = [
  {
    title: "GOAL Lab Seminar: Quantum Machine Learning",
    date: "2024-02-15",
    location: "Walter Light Hall, Room 205",
    link: "#",
  },
  {
    title: "Industry Workshop: AI in Healthcare",
    date: "2024-02-28",
    location: "Innovation Park, Queen's University",
    link: "#",
  },
  {
    title: "Graduate Student Research Symposium",
    date: "2024-03-10",
    location: "Virtual Event",
    link: "#",
  },
]

export function UpcomingEventsSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-xl text-muted-foreground">Join us for seminars, workshops, and conferences</p>
          </div>
        </FadeInSection>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {eventsData.map((event, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <div className="flex items-start space-x-4 p-6 bg-background rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      {event.link ? (
                        <Link href={event.link} className="hover:text-primary transition-colors">
                          {event.title}
                        </Link>
                      ) : (
                        event.title
                      )}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
