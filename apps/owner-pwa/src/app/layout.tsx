import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Owner PWA - Warszawski Czas",
  description: "Aplikacja do recenzji scenariuszy i organizacji nagrań Warszawski Czas",
  manifest: "/manifest.json",
  robots: {
    index: false,
    follow: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Owner PWA",
  },
};

export const viewport: Viewport = {
  themeColor: "#00694c",
  width: "device-width",
  initialScale: 1,
};

import { ThemeProvider } from "@/components/ThemeProvider";
import PwaRegister from "@/components/pwa-register";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icon_logo.png" />
        <link rel="preload" href="/logo.png" as="image" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <PwaRegister />
        </ThemeProvider>
      </body>
    </html>
  );
}
