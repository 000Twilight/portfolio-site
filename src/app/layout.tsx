import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/layout/nav";
import SmoothScrolling from "@/components/layout/smooth-scrolling";
import Footer from "@/components/layout/footer";
// import LoadingScreen from "@/components/layout/loading-screen"; // disabled — SplitRevealHero is now the opening sequence
import CursorGlow from "@/components/layout/cursor-glow";
import NoiseOverlay from "@/components/layout/noise-overlay";

export const metadata: Metadata = {
  title: "Mario Richie Lim | Software Engineer",
  description:
    "Full-stack developer and AI engineer specialising in React, TypeScript, and modern web technologies. Based in Jakarta.",
  openGraph: {
    title: "Mario Richie Lim | Software Engineer",
    description:
      "Full-stack developer and AI engineer specialising in React, TypeScript, and modern web technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /*
     * Cool gray light theme portfolio.
     * The `style` forces the page background even before CSS loads,
     * preventing any dark flash on navigation.
     */
    <html lang="en" style={{ background: "#F9FAFB" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: "#F9FAFB" }}>
        {/* ── Global overlay stack (highest z-index first) ── */}
        {/* <LoadingScreen /> */}  {/* z-9999 — disabled: SplitRevealHero is now the opening sequence */}
        <CursorGlow />     {/* z-9998 — follows mouse */}
        <NoiseOverlay />   {/* z-9997 — film grain texture */}

        {/* ── Page chrome ── */}
        <SmoothScrolling>
          <Nav />
          {children}
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}
