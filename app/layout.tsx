import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { RjAiChat } from "@/components/ui/RjAiChat";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Robert Jim M. Placencia — Software Engineer",
  description:
    "Software Developer with 3+ years building enterprise applications in C# .NET, full-stack web, and AI-assisted development.",
  metadataBase: new URL("https://robertjimplacencia.dev"),
  openGraph: {
    title: "Robert Jim M. Placencia — Software Engineer",
    description:
      "Portfolio of Robert Jim M. Placencia: C# .NET, React, Next.js, AI-assisted development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={roboto.variable}>
      <body className="font-sans bg-bg text-text antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <a
            href="#hero"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <RjAiChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
