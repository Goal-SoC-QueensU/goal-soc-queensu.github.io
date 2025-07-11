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
import {
  Github,
  Linkedin,
  ExternalLink,
  GraduationCap,
} from "lucide-react";

export interface Person {
  name: string;
  position: string;
  role: string;
  photo?: string; // file name in /public/images/
  researchInterests: string[];
  website?: string;
  linkedin?: string;
  github?: string;
  scholar?: string;
  bio: string;
  publications: string[];
}

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function PeopleGrid({ people }: { people: Person[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  /* ----------  derive role list once ---------- */
  const roles = useMemo(() => {
    const set = new Set(people.map((p) => p.role));
    return ["All", ...Array.from(set)];
  }, [people]);

  /* ----------  search + role filtering ---------- */
  const filtered = people.filter((p) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      p.position.toLowerCase().includes(q) ||
      p.researchInterests.some((i) => i.toLowerCase().includes(q));

    const matchesRole = selectedRole === "All" || p.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  /* ----------  group for display ---------- */
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
      {/* ----------  search + role UI ---------- */}
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

      {/* ----------  Director ---------- */}
      {grouped["Director & Founder"].length > 0 && (
        <Section title="Director & Founder">
          {grouped["Director & Founder"].map((p, i) => (
            <PersonCard key={i} person={p} onSelect={setSelectedPerson} />
          ))}
        </Section>
      )}

      {/* ----------  Current Members ---------- */}
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
                )
            )}
          </div>
        </div>
      </FadeInSection>

      {/* ----------  Alumni ---------- */}
      {grouped["Alumni"].length > 0 && (
        <Section title="Alumni">
          {grouped["Alumni"].map((p, i) => (
            <PersonCard key={i} person={p} onSelect={setSelectedPerson} />
          ))}
        </Section>
      )}

      {/* ----------  Modal ---------- */}
      <Dialog open={!!selectedPerson} onOpenChange={() => setSelectedPerson(null)}>
        <DialogContent className="max-w-2xl">
          {selectedPerson && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src={`${prefix}/images/${selectedPerson.photo ?? "placeholder.svg"}`}  // ← use prefix + selectedPerson
                    alt={selectedPerson.name}
                    width={80}
                    height={80}
                    className="rounded-full aspect-square object-cover mx-auto"
                  />
                  <div>
                    <DialogTitle className="text-xl">{selectedPerson.name}</DialogTitle>
                    <DialogDescription className="text-base">
                      {selectedPerson.position}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                <SectionTitle>Biography</SectionTitle>
                <p className="text-sm text-muted-foreground">{selectedPerson.bio}</p>

                <SectionTitle>Research Interests</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {selectedPerson.researchInterests.map((i) => (
                    <Badge key={i} variant="secondary">
                      {i}
                    </Badge>
                  ))}
                </div>

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
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ----------  helper components ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <FadeInSection>
      <div>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children}
        </div>
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
  return (
    <Card
      onClick={() => onSelect(person)}
      className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Image
            src={`${prefix}/images/${person.photo ?? "placeholder.svg"}`}  // ← add prefix
            alt={person.name}
            width={150}
            height={150}
            className="rounded-full aspect-square object-cover mx-auto"
          />
        </div>
        <CardTitle className="text-lg">{person.name}</CardTitle>
        <CardDescription>{person.position}</CardDescription>
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
