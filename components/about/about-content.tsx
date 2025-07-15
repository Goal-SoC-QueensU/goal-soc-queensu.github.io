"use client";

import { FadeInSection } from "@/components/fade-in-section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data (would normally live in data/labInfo.yaml)                   */
/* ------------------------------------------------------------------ */

const labInfo = {
  mission:
    "The Global Optimization, Analytics, and Learning (GOAL) Lab at Queen’s University advances optimization, machine learning, and data analytics to solve pressing challenges in healthcare, autonomous systems, smart cities, and quantum computing. We bridge theory and practice by collaborating with academia, industry, and the public sector to deliver solutions with real-world impact.",

  collaborations: [
    "CE Strategies – Indigenous-focused data analytics and community planning consultancy",
    "WizeWerks AI – Boutique firm delivering generative-AI and LLM solutions for enterprise workflows",
    "WaiveTheWait – Health-tech startup automating patient triage and clinic operations",
    "Kingston General Hospital – Clinical partner for data-driven healthcare optimization projects",
  ],

  history: [
    {
      year: "2023",
      event: "GOAL Lab established at the School of Computing, Queen’s University",
    },
  ],

  contact: {
    address:
      "Robert Sutherland Hall (5th Floor)\n138 Union St\nKingston, ON K7L 2P1\nCanada",
    email: "goal.cs.queensu@gmail.com",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function AboutContent() {
  return (
    <div className="space-y-12">
      {/* ----------  Mission  ---------- */}
      <FadeInSection>
        <Card>
          <CardHeader>
            <SectionIcon />
            <div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
              <CardDescription className="text-justify">
                Advancing optimization, analytics, and learning research
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed text-justify">
              {labInfo.mission}
            </p>
          </CardContent>
        </Card>
      </FadeInSection>

      {/* ----------  Collaborations  ---------- */}
      <FadeInSection delay={0.2}>
        <Card>
          <CardHeader>
            <CollabIcon />
            <div>
              <CardTitle className="text-2xl">Industry Collaborations</CardTitle>
              <CardDescription>
                Partnerships driving innovation and real-world impact
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {labInfo.collaborations.map((c, i) => (
                <div
                  key={i}
                  className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg"
                >
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <p className="text-sm text-muted-foreground">{c}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </FadeInSection>

      {/* ----------  History  ---------- */}
      <FadeInSection delay={0.4}>
        <Card>
          <CardHeader>
            <HistoryIcon />
            <div>
              <CardTitle className="text-2xl">Our History</CardTitle>
              <CardDescription>
                Key milestones in GOAL Lab’s journey
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
              <div className="space-y-8">
                {labInfo.history.map(({ year, event }, i) => (
                  <div key={i} className="relative flex items-start space-x-4">
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background relative z-10" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {year}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeInSection>

      {/* ----------  Contact  ---------- */}
      <FadeInSection delay={0.6}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-primary" />
              <div>
                <CardTitle className="text-2xl">Contact Us</CardTitle>
                <CardDescription>Get in touch with our team</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Address</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {labInfo.contact.address}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <a
                    href={`mailto:${labInfo.contact.email}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {labInfo.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeInSection>

      {/* ----------  Research Areas (unchanged)  ---------- */}
      {/* … existing Research Focus Areas section stays the same … */}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small inline SVG wrappers to keep JSX readable                     */
/* ------------------------------------------------------------------ */

function SectionIcon() {
  return (
    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
      <svg
        className="w-6 h-6 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    </div>
  );
}

function CollabIcon() {
  return (
    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
      <svg
        className="w-6 h-6 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </div>
  );
}

function HistoryIcon() {
  return (
    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
      <svg
        className="w-6 h-6 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
}
