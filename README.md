# GOAL Lab Website

A modern, responsive website for the Global Optimization, Analytics, and Learning (GOAL) Lab at Queen's University.

## Features

- 🌙 Dark mode design
- 📱 Fully responsive
- ⚡ Next.js 14 with App Router
- 🎨 Tailwind CSS styling
- 🎭 Framer Motion animations
- 📊 Data-driven content
- 🚀 Static export for GitHub Pages

## Quick Start

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/YOUR_USERNAME/goal-lab.git
   cd goal-lab
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment

This website is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup GitHub Pages

1. Push your code to a GitHub repository named `goal-lab`
2. Go to repository Settings → Pages
3. Set Source to "GitHub Actions"
4. The workflow will automatically deploy your site

Your site will be available at: `https://YOUR_USERNAME.github.io/goal-lab/`

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── research/          # Research page
│   ├── publications/      # Publications page
│   ├── people/           # People page
│   └── about/            # About page
├── components/           # Reusable components
│   ├── ui/              # UI components
│   ├── home/            # Home page components
│   ├── research/        # Research components
│   ├── publications/    # Publication components
│   ├── people/          # People components
│   └── about/           # About components
├── lib/                 # Utility functions
├── public/              # Static assets
└── data/               # Content data files
\`\`\`

## Adding Content

### Adding News
Edit the `newsData` array in `components/home/recent-news-section.tsx`:

\`\`\`typescript
const newsData = [
  {
    title: "Your news title",
    date: "2024-01-15",
    excerpt: "Brief description of the news",
    link: "#"
  }
]
\`\`\`

### Adding Research Projects
Edit the `projectsData` array in `components/research/research-grid.tsx`:

\`\`\`typescript
const projectsData = [
  {
    title: "Project Title",
    image: "/path/to/image.jpg",
    shortDesc: "Brief description",
    fullDesc: "Detailed description",
    tags: ["Tag1", "Tag2"],
    featured: true
  }
]
\`\`\`

### Adding Publications
Edit the `publicationsData` array in `components/publications/publications-list.tsx`:

\`\`\`typescript
const publicationsData = [
  {
    title: "Paper Title",
    authors: ["Author 1", "Author 2"],
    date: "2024-01-15",
    venue: "Conference/Journal Name",
    link: "https://link-to-paper.com",
    abstract: "Paper abstract",
    tags: ["Tag1", "Tag2"],
    year: 2024
  }
]
\`\`\`

### Adding Team Members
Edit the `peopleData` array in `components/people/people-grid.tsx`:

\`\`\`typescript
const peopleData = [
  {
    name: "Dr. Name",
    position: "Position Title",
    role: "Director", // Director, Researcher, PhD Student, MSc Student, Undergraduate, Alumni
    photo: "/path/to/photo.jpg",
    researchInterests: ["Interest 1", "Interest 2"],
    website: "https://website.com",
    bio: "Biography text"
  }
]
\`\`\`

## Customization

### Colors
Modify the color scheme in `tailwind.config.ts` and `app/globals.css`.

### Animations
Customize animations in the component files using Framer Motion.

### Layout
Modify the layout components in the `components/` directory.

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or support, please contact: goal.lab@queensu.ca
\`\`\`

```text file="LICENSE"
MIT License

Copyright (c) 2024 GOAL Lab, Queen's University

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
