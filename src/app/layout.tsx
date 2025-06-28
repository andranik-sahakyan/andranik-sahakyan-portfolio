import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Andranik Sahakyan",
  description: "Personal portfolio site for Andranik Sahakyan.",
  keywords: "AI, Data Science, Machine Learning, Resume, Data Engineer, Software Engineer, Andranik Sahakyan, Los Angeles",
  robots: "index, follow",
  verification: {
    google: "jtSMuHFQugBkkLPu9juPzy5nbZhKZ84CK2nrJOY7trU"
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
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
