"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FadeInSection } from "@/components/fade-in-section";
import { Github, Linkedin, ExternalLink, GraduationCap } from "lucide-react";

/* ------------------------------------------------------------------ */
/*                               TYPES                                */
/* ------------------------------------------------------------------ */
export interface Person {
  name: string;
  position: string;          // role inside GOAL Lab (“PhD Student”, ...)
  role: string;              // grouping key
  photo?: string;

  /* NEW ↓ */
  currentAffiliation: string;
  currentPosition?: string;      // alumni only
  pastAffiliation?: string;      // alumni only

  researchInterests: string[];
  website?: string;
  linkedin?: string;
  github?: string;
  scholar?: string;
  bio: string;
  publications: string[];
}

/* ------------------------------------------------------------------ */

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/* ------------------------------------------------------------------ */

export default function PeopleGrid({ people }: { people: Person[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  /* roles for dropdown */
  const roles = useMemo(() => {
    const set = new Set(people.map((p) => p.role));
    return ["All", ...Array.from(set)];
  }, [people]);

  /* search / filter */
  const filtered = people.filter((p) => {
    const q = searchTerm.toLowerCase();
    const match =
      p.name.toLowerCase().includes(q) ||
      p.position.toLowerCase().includes(q) ||
      p.researchInterests.some((i) => i.toLowerCase().includes(q));

    const matchRole = selectedRole === "All" || p.role === selectedRole;
    return match && matchRole;
  });

  /* group */
  const grouped = {
    "Director & Founder": filtered.filter((p) => p.role === "Director"),
    "Current Members": {
      Researchers: filtered.filter((p) => p.role === "Researcher"),
      "PhD Students": filtered.filter((p) => p.role === "PhD Student"),
      "MSc Students": filtered.filter((p) => p.role === "MSc Student"),
      Undergraduates: filtered.filter((p) => p.role === "Undergraduate"),
    },
    Alumni: filtered.filter((p) => p.role === "Alumni"),
  };

  return (
    <div>
      {/* search & filter UI */}
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

      {/* Director */}
      {grouped["Director & Founder"].length > 0 && (
        <Section title="Director & Founder">
          {grouped["Director & Founder"].map((p, i) => (
            <PersonCard key={i} person={p} onSelect={setSelectedPerson} />
          ))}
        </Section>
      )}

      {/* Current members */}
      <FadeInSection>
        <div>
          <h2 className="text-2xl font-bold mb-6">Current Members</h2>
          <div className="space-y-8">
            {Object.entries(grouped["Current Members"]).map(
              ([category, list]) =>
                list.length > 0 && (
                  <Section key={category} title={category}>
                    {list.map((p, i) => (
                      <PersonCard key={i} person={p} onSelect={setSelectedPerson} />
                    ))}
                  </Section>
                ),
            )}
          </div>
        </div>
      </FadeInSection>

      {/* Alumni */}
      {grouped["Alumni"].length > 0 && (
        <Section title="Alumni">
          {grouped["Alumni"].map((p, i) => (
            <PersonCard key={i} person={p} onSelect={setSelectedPerson} />
          ))}
        </Section>
      )}

      {/* modal */}
      <Dialog open={!!selectedPerson} onOpenChange={() => setSelectedPerson(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedPerson && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src={`${prefix}/images/${selectedPerson.photo ?? "placeholder.svg"}`}
                    alt={selectedPerson.name}
                    width={120}              // square size (change as you like)
                    height={120}
                    className="
                    aspect-square           /* keep the 1 : 1 ratio              */
                    object-cover            /* crop to fill                      */
                    rounded-md              /* ← rectangular corners (no circle) */
                    flex-shrink-0           /* prevents the image from shrinking */
                  "
                  />

                  <div>
                    <DialogTitle className="text-xl">{selectedPerson.name}</DialogTitle>
                    <DialogDescription className="text-base">{selectedPerson.position}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {/* Bio */}
              <SectionTitle>Biography</SectionTitle>
              <p className="text-sm text-muted-foreground whitespace-pre-line text-justify">{selectedPerson.bio}</p>

              {/* Affiliations */}
              <SectionTitle>Affiliations</SectionTitle>
              <ul className="space-y-1 text-sm">
                {/* current */}
                <li>
                  <span className="font-semibold">Current • </span>
                  {selectedPerson.currentPosition
                    ? `${selectedPerson.currentPosition}, ${selectedPerson.currentAffiliation}`
                    : selectedPerson.currentAffiliation}
                </li>

                {/* past (alumni only) */}
                {selectedPerson.pastAffiliation && (
                  <li>
                    <span className="font-semibold">Past • </span>
                    {selectedPerson.pastAffiliation}
                  </li>
                )}
              </ul>

              {/* Research interests */}
              {selectedPerson.researchInterests.length > 0 && (
                <>
                  <SectionTitle>Research Interests</SectionTitle>
                  <div className="flex flex-wrap gap-2">
                    {selectedPerson.researchInterests.map((i) => (
                      <Badge key={i} variant="secondary">
                        {i}
                      </Badge>
                    ))}
                  </div>
                </>
              )}

              {/* links */}
              <div className="flex gap-2">
                {selectedPerson.website && (
                  <LinkButton href={selectedPerson.website} icon={<ExternalLink />} label="Website" />
                )}
                {selectedPerson.scholar && (
                  <LinkButton href={selectedPerson.scholar} icon={<GraduationCap />} label="Scholar" />
                )}
                {selectedPerson.github && (
                  <LinkButton href={selectedPerson.github} icon={<Github />} label="GitHub" />
                )}
                {selectedPerson.linkedin && (
                  <LinkButton href={selectedPerson.linkedin} icon={<Linkedin />} label="LinkedIn" />
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                        Helper components                           */
/* ------------------------------------------------------------------ */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <FadeInSection>
      <div>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>
      </div>
    </FadeInSection>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="font-semibold mb-2">{children}</h4>;
}

function LinkButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Button variant="outline" size="sm" asChild>
      <Link href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
        {icon}
        {label}
      </Link>
    </Button>
  );
}

function PersonCard({
  person,
  onSelect,
}: {
  person: Person;
  onSelect: (p: Person) => void;
}) {
  const isAlumni = person.role === "Alumni";

  return (
    <Card
      onClick={() => onSelect(person)}
      className={`hover:shadow-lg transition-shadow duration-300 cursor-pointer
        ${isAlumni ? "border-rose-400/40" : ""}`}
    >
      <CardHeader className="text-center">
        {/* photo */}
        <div className="mx-auto mb-4">
          <Image
            src={`${prefix}/images/${person.photo ?? "placeholder.svg"}`}
            alt={person.name}
            width={150}
            height={150}
            className="rounded-full aspect-square object-cover mx-auto"
          />
        </div>

        {/* name & GOAL role */}
        <CardTitle className="text-lg">{person.name}</CardTitle>
        <CardDescription>{person.position}</CardDescription>

        {/* divider */}
        <div className="h-px w-8 mx-auto my-2 bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* current affiliation */}
        <p className="text-sm italic text-muted-foreground">
          {person.currentPosition
            ? `${person.currentPosition}, ${person.currentAffiliation}`
            : person.currentAffiliation}
        </p>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-1 justify-center">
          {person.researchInterests.slice(0, 3).map((i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {i}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
