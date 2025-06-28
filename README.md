# Andranik Sahakyan - Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Beautiful UI**: Styled with shadcn/ui components
- **Responsive Design**: Optimized for desktop and mobile devices
- **Smooth Animations**: Powered by Framer Motion
- **TypeScript**: Fully typed for better development experience
- **Performance Optimized**: Uses Next.js Image optimization and best practices

## 🛠️ Technologies Used

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [Typed.js](https://github.com/mattboldt/typed.js/) - Typing animation

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── AboutSection.tsx  # About section
│   ├── Footer.tsx        # Footer component
│   ├── HeroSection.tsx   # Hero section with typed animation
│   ├── Navigation.tsx    # Navigation (desktop & mobile)
│   ├── ProjectsSection.tsx # Projects showcase
│   └── ResumeSection.tsx # Resume/experience section
└── lib/
    └── utils.ts          # Utility functions
```

## 🎨 Sections

- **Hero**: Introduction with typed animation effect
- **About**: Personal description and profile photo
- **Resume**: Education, professional experience, research, and awards
- **Projects**: Showcase of key projects with links
- **Footer**: Contact information and social links

## 📱 Responsive Features

- Desktop: Side navigation with icon tooltips
- Mobile: Bottom navigation bar
- Responsive grid layouts for all sections
- Optimized images and performance

## 🚀 Deployment

The site can be deployed to any platform that supports Next.js:

- [Vercel](https://vercel.com/) (Recommended)
- [Netlify](https://netlify.com/)
- [Railway](https://railway.app/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
