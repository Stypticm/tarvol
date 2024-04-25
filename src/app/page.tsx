'use client'

import { NextUIProvider } from "@nextui-org/react";
import Auth from '@/components/Auth';

export default function Home() {
  return (
    <NextUIProvider>
      <Auth />
    </NextUIProvider>
  );
}
