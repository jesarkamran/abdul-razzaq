import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}, QAU`,
  description:
    "Assistant Professor at the Quaid-i-Azam School of Management Sciences. Research on digital financial inclusion, fintech adoption and green innovation; open lectures on finance and accounting.",
  openGraph: { title: profile.name, type: "profile" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        {/* Sets the theme before first paint so dark mode doesn't flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.theme;if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
