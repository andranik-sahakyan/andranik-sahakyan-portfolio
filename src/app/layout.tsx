import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.andraniksahakyan.com'),
  title: "Andranik Sahakyan",
  description: "Experienced Software Engineer specializing in AI/ML, cloud computing, and full-stack development. Currently Software Engineer II at FloQast, previously at Abbott.",
  keywords: "AI, AI Agents, LLM, Software Engineer, Machine Learning, Data Engineer, Andranik Sahakyan, Los Angeles, Python, JavaScript, React, Next.js, AWS SageMaker, Cloud Computing",
  robots: "index, follow",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.andraniksahakyan.com',
    title: 'Andranik Sahakyan',
    description: 'Experienced Software Engineer specializing in AI/ML, cloud computing, and full-stack development.',
    siteName: 'Andranik Sahakyan Portfolio',
    images: [
      {
        url: '/assets/img/profile.jpeg',
        width: 1200,
        height: 630,
        alt: 'Andranik Sahakyan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andranik Sahakyan',
    description: 'Experienced Software Engineer specializing in AI/ML, cloud computing, and full-stack development.',
    images: ['/assets/img/profile.jpeg'],
  },
  verification: {
    google: "jtSMuHFQugBkkLPu9juPzy5nbZhKZ84CK2nrJOY7trU"
  },
  alternates: {
    canonical: 'https://www.andraniksahakyan.com',
  },
  icons: {
    icon: [
      { url: "/assets/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicons/favicon.ico" }
    ],
    apple: "/assets/favicons/apple-touch-icon.png"
  },
  manifest: "/assets/favicons/site.webmanifest"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Andranik Sahakyan",
              "jobTitle": "Software Engineer II, AI",
              "url": "https://www.andraniksahakyan.com",
              "image": "https://www.andraniksahakyan.com/assets/img/profile.jpeg",
              "sameAs": [
                "https://www.linkedin.com/in/andraniksahakyan/",
                "https://github.com/andranik-sahakyan"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "FloQast"
              },
              "alumniOf": [
                {
                  "@type": "EducationalOrganization",
                  "name": "Johns Hopkins University"
                },
                {
                  "@type": "EducationalOrganization", 
                  "name": "University of California, Irvine"
                }
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
