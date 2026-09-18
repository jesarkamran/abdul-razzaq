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
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..600&family=Inter:wght@300..700&display=swap"
          rel="stylesheet"
        />
        {/* Light is the default; dark only if the visitor chose it. Runs before
            first paint so their choice doesn't flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.theme==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body>
        {/* Ambient mesh — one fixed layer for the whole site instead of a
            gradient blob per section. */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="mesh -top-60 left-[8%] h-[38rem] w-[38rem] bg-teal-500/20 dark:bg-teal-500/25" />
          <div className="mesh top-[38%] right-[-10%] h-[34rem] w-[34rem] bg-gold-400/15 dark:bg-gold-400/12" />
          <div className="mesh bottom-[-12%] left-[25%] h-[32rem] w-[32rem] bg-teal-600/12 dark:bg-teal-600/18" />
        </div>

        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
