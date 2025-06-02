
# Next.js Configuration Files

## tailwind.config.ts
Copy your existing `tailwind.config.ts` exactly as-is. All the candy-crush colors, animations, and custom styling will work perfectly in Next.js.

## next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['via.placeholder.com'], // Add any external image domains you use
  },
  transpilePackages: ['lucide-react', '@react-three/fiber', '@react-three/drei'],
}

module.exports = nextConfig
```

## src/app/layout.tsx
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Donate Feels Great - Islamic Charity Platform',
  description: 'Gamified charity platform connecting donors with trusted Islamic charities worldwide.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  )
}
```

## src/app/providers.tsx
```tsx
'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

## src/app/globals.css
Copy your existing `src/index.css` content to this file.

## tsconfig.json Updates
Add to your Next.js tsconfig.json:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
