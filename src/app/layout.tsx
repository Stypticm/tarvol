import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TarVol App",
  description: "TarVol App with Next",
  generator: "Nextjs",
  manifest: "/manifest.json",
  keywords: ["TarVol", "App", "Next", "JS", "Nextjs", "next-pwa", "forex"],
  authors: [
    { name: "TarVol" },
    {
      name: "TarVol",
      url: "https://www.linkedin.com/in/mikhail-volodin/"
    }
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon.jpg" },
    { rel: "icon", url: "icons/icon.jpg" },
  ]
};

// export const viewport = {
//   viewport:
//     "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
// };

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
