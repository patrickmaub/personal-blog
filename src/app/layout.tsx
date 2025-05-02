import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Patrick Mauboussin | Personal Blog on AI, Healthcare & Business",
  description: "Official personal blog of Patrick Mauboussin. Sharing insights on artificial intelligence, healthcare technology, machine learning, and business strategy.",
  keywords: ["Patrick Mauboussin", "Patrick J. Mauboussin", "AI", "Artificial Intelligence", "Healthcare Technology", "Machine Learning", "Software Engineering", "Business Strategy"],
  authors: [{ name: "Patrick Mauboussin", url: "https://patrick.mauboussin.me" }],
  creator: "Patrick Mauboussin",
  publisher: "Patrick Mauboussin",
  openGraph: {
    title: "Patrick Mauboussin | Personal Blog on AI, Healthcare & Business",
    description: "Official personal blog of Patrick Mauboussin. Sharing insights on artificial intelligence, healthcare technology, machine learning, and business strategy.",
    url: "https://patrick.mauboussin.me",
    siteName: "Patrick Mauboussin Blog",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Patrick Mauboussin Blog"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrick Mauboussin | Personal Blog on AI, Healthcare & Business",
    description: "Official personal blog of Patrick Mauboussin. Sharing insights on artificial intelligence, healthcare technology, machine learning, and business strategy.",
    creator: "@pjmauboussin",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://patrick.mauboussin.me",
  },
  metadataBase: new URL("https://patrick.mauboussin.me"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="canonical" href="https://patrick.mauboussin.me" />
      </head>
      <body>
        <div className="container">
          <header className="header">
            <h1 className="site-title">
              <a href="/">
                Patrick Mauboussin
              </a>
            </h1>
            <p className="site-description">AI, Healthcare, Business</p>
          </header>
          <main className="main">{children}</main>
          <footer className="footer">
            <div className="footer-content">
              <p>© {new Date().getFullYear()} Patrick Mauboussin</p>
              <div className="social-icons">
                <a href="https://www.linkedin.com/in/patrick-mauboussin-254118190/" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="https://x.com/pjmauboussin" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="https://github.com/patrickmaub" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="mailto:patrick@mauboussin.me" className="social-icon" aria-label="Email">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </footer>
        </div>
        <Analytics />
        
        {/* Structured data for better SEO */}
        <Script id="schema-person" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://patrick.mauboussin.me/#person",
              "name": "Patrick Mauboussin",
              "givenName": "Patrick",
              "familyName": "Mauboussin",
              "url": "https://patrick.mauboussin.me",
              "jobTitle": "AI and Healthcare Professional",
              "description": "Patrick Mauboussin writes about artificial intelligence, healthcare technology, and business strategy.",
              "sameAs": [
                "https://www.linkedin.com/in/patrick-mauboussin-254118190/",
                "https://x.com/pjmauboussin",
                "https://github.com/patrickmaub"
              ],
              "knowsAbout": ["Artificial Intelligence", "Machine Learning", "Healthcare Technology", "Business Strategy", "Software Engineering"]
            }
          `}
        </Script>
        <Script id="schema-website" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://patrick.mauboussin.me/#website",
              "url": "https://patrick.mauboussin.me",
              "name": "Patrick Mauboussin | Personal Blog",
              "description": "Official personal blog of Patrick Mauboussin, sharing insights on artificial intelligence, healthcare technology, and business strategy.",
              "inLanguage": "en-US",
              "author": {
                "@type": "Person",
                "@id": "https://patrick.mauboussin.me/#person",
                "name": "Patrick Mauboussin"
              },
              "publisher": {
                "@type": "Person",
                "@id": "https://patrick.mauboussin.me/#person"
              }
            }
          `}
        </Script>
        <Script id="schema-blog" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "@id": "https://patrick.mauboussin.me/#blog",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://patrick.mauboussin.me"
              },
              "headline": "Patrick Mauboussin's Personal Blog",
              "description": "Insights on artificial intelligence, healthcare technology, and business strategy from Patrick Mauboussin.",
              "publisher": {
                "@type": "Person",
                "@id": "https://patrick.mauboussin.me/#person"
              },
              "author": {
                "@type": "Person",
                "@id": "https://patrick.mauboussin.me/#person"
              }
            }
          `}
        </Script>
      </body>
    </html>
  );
}
