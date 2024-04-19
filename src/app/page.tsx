'use client'

import { NextUIProvider } from "@nextui-org/react";
import Auth from '@/components/Auth';

export default function Home() {
  return (
    <NextUIProvider>
      <main className="h-screen w-screen bg-sky-950 overflow-auto">
        <Auth />
      </main>
    </NextUIProvider>
  );
}
