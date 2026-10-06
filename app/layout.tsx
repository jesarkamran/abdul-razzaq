import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { MotionProvider } from "@/components/ui";
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
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.theme==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper
                     focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] dark:bg-mist dark:text-void"
        >
          Skip to main content
        </a>

        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="mesh -top-60 left-[8%] h-[38rem] w-[38rem] bg-accent-500/20 dark:bg-accent-500/25" />
          <div className="mesh top-[38%] right-[-10%] h-[34rem] w-[34rem] bg-glow-400/18 dark:bg-glow-400/10" />
          <div className="mesh bottom-[-12%] left-[25%] h-[32rem] w-[32rem] bg-blush-400/12 dark:bg-blush-400/14" />
        </div>

        <MotionProvider>
          <Nav />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
