import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/layout/nav";
import SmoothScrolling from "@/components/layout/smooth-scrolling";
import Footer from "@/components/layout/footer";
// import LoadingScreen from "@/components/layout/loading-screen"; // disabled — SplitRevealHero is now the opening sequence
import CursorGlow from "@/components/layout/cursor-glow";
import NoiseOverlay from "@/components/layout/noise-overlay";
import { Bricolage_Grotesque, DM_Sans, Dancing_Script } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const fancyFont = Dancing_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-fancy",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

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
    <html lang="en" style={{ backgroundColor: "#F9FAFB" }}>
      <head>
      </head>
      <body className={`${bricolage.variable} ${dmSans.variable} ${fancyFont.variable} overflow-x-hidden`} style={{ backgroundColor: "#F9FAFB" }}>
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
