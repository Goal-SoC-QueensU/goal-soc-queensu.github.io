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
            className="rounded-full flex-shrink-0 aspect-square object-cover mx-auto"
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
      
        <div
          className="flex flex-wrap gap-1 justify-center mt-3"
          onClick={(e) => e.stopPropagation()}
        >
          {person.website && person.website !== "#" && (
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" asChild>
              <Link
                href={person.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <ExternalLink className="h-4 w-4" />
                Website
              </Link>
            </Button>
          )}
      
          {person.scholar && person.scholar !== "#" && (
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" asChild>
              <Link
                href={person.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <GraduationCap className="h-4 w-4" />
                Scholar
              </Link>
            </Button>
          )}
      
          {person.github && person.github !== "#" && (
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" asChild>
              <Link
                href={person.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </Button>
          )}
          
          {person.linkedin && person.linkedin !== "#" && (
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" asChild>
              <Link
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
