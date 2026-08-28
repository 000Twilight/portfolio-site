import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import SmoothScrolling from "@/components/layout/smooth-scrolling";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import CursorGlow from "@/components/layout/CursorGlow";
import NoiseOverlay from "@/components/layout/NoiseOverlay";

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
      <body style={{ background: "#F9FAFB" }}>
        {/* ── Global overlay stack (highest z-index first) ── */}
        <LoadingScreen />   {/* z-9999 — covers everything on load */}
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
