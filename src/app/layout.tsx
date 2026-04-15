import type { Metadata, Viewport } from "next";
import { Lexend, Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Startup Idea Validator | High-Impact",
  description: "Aggressive concept validation.",
  openGraph: {
    title: "Startup Idea Validator | High-Impact",
    description: "Aggressive concept validation.",
    images: [
      {
        url: "/startup-idea-validator.png",
        width: 1736,
        height: 788,
        alt: "Startup Idea Validator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup Idea Validator | High-Impact",
    description: "Aggressive concept validation.",
    images: ["/startup-idea-validator.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexend.variable} ${inter.variable} antialiased bg-[#0e0e0e] text-[#ffffff] min-h-screen font-body relative pb-16`}
      >
        <ConvexClientProvider>
          {children}
          <footer className="fixed bottom-4 right-6 z-50 pointer-events-none md:pointer-events-auto hidden md:block">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-primary transition-colors duration-500">
              Made with love in <span className="text-white/40">Cayman</span> by <a href="https://danielcimring.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary underline decoration-primary/30 underline-offset-4 pointer-events-auto">Daniel Cimring</a>
            </p>
          </footer>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
