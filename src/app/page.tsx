'use client'

import { NextUIProvider } from "@nextui-org/react";
import Auth from '@/components/Auth';
import { PWAProvider } from '@/сontext/PWAContext';

export default function Home() {
  return (
    <PWAProvider>
      <NextUIProvider>
        <Auth />
      </NextUIProvider>
    </PWAProvider>
  );
}
