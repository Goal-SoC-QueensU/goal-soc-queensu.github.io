import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">GOAL Lab</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Global Optimization, Analytics, and Learning Lab at Queen's University
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="mailto:goal.cs.queensu@gmail.com" className="text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/research" className="text-muted-foreground hover:text-primary">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/publications" className="text-muted-foreground hover:text-primary">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/people" className="text-muted-foreground hover:text-primary">
                  People
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Queen's University</p>
              <p>Kingston, ON, Canada</p>
              <p>goal.cs.queensu@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GOAL Lab, Queen's University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
