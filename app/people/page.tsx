import people from "@/data/people.json";          // ← static JSON import
import PeopleGrid from "@/components/people/people-grid";
import { FadeInSection } from "@/components/fade-in-section";

export default function PeoplePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <FadeInSection>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the brilliant minds behind the groundbreaking research and innovations.
          </p>
        </div>
      </FadeInSection>

      {/* Pass the imported data into the grid */}
      <PeopleGrid people={people} />
    </div>
  );
}
