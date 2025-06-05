# Detailed NextJS Migration Guide

## Overview
This guide provides step-by-step instructions for migrating the current React Router application to NextJS 14 with App Router.

## Step 1: Install NextJS Dependencies

```bash
# Remove Vite and React Router
npm uninstall vite @vitejs/plugin-react react-router-dom

# Install NextJS
npm install next@latest react@latest react-dom@latest
npm install -D @types/node eslint-config-next

# Keep existing dependencies
# All Tailwind, Supabase, and UI dependencies remain the same
```

## Step 2: Configuration Files

### Create next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      // Subdomain routing for charity partners
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?<subdomain>.+)\\.yourjannah\\.com',
          },
        ],
        destination: '/subdomain/:subdomain/:path*',
      },
    ];
  },
  images: {
    domains: ['images.unsplash.com', 'your-supabase-url.supabase.co'],
  },
};

module.exports = nextConfig;
```

### Update tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_content"]
}
```

### Update package.json scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## Step 3: Directory Structure Migration

### Current Structure
```
src/
├── pages/           (Route components)
├── components/      (UI components)
├── hooks/          (Custom hooks)
├── integrations/   (Supabase)
├── styles/         (CSS)
└── utils/          (Utilities)
```

### New NextJS Structure
```
src/
├── app/            (App Router)
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── (auth)/     (Route groups)
│   │   ├── login/
│   │   └── register/
│   ├── admin/
│   │   └── dashboard/
│   ├── subdomain/
│   │   └── [slug]/
│   └── api/        (API routes)
├── components/     (Keep existing)
├── hooks/         (Keep existing)
├── lib/           (Move integrations here)
└── utils/         (Keep existing)
```

## Step 4: Route Migration Mapping

### Page Component Migrations

| Current Route | NextJS App Router Path |
|---------------|----------------------|
| `src/pages/Index.tsx` | `src/app/page.tsx` |
| `src/pages/Auth.tsx` | `src/app/(auth)/login/page.tsx` |
| `src/pages/AdminDashboard.tsx` | `src/app/admin/dashboard/page.tsx` |
| `src/pages/CharitySubdomainPage.tsx` | `src/app/subdomain/[slug]/page.tsx` |
| `src/pages/Profile.tsx` | `src/app/profile/page.tsx` |
| `src/pages/QuranReader.tsx` | `src/app/quran/page.tsx` |
| `src/pages/Campaigns.tsx` | `src/app/campaigns/page.tsx` |

### Layout Components

#### Root Layout (`src/app/layout.tsx`)
```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Your Jannah - Islamic Charity Platform',
  description: 'Connecting hearts, transforming lives through Islamic charity',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

#### Auth Layout (`src/app/(auth)/layout.tsx`)
```tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}
```

## Step 5: Navigation Migration

### Remove React Router
Replace all instances of:
```tsx
// OLD - React Router
import { useNavigate, Link } from 'react-router-dom';
const navigate = useNavigate();
navigate('/dashboard');

// NEW - NextJS
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const router = useRouter();
router.push('/dashboard');
```

### Update Header Component
```tsx
// src/components/Header.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <nav>
      <Link 
        href="/" 
        className={pathname === '/' ? 'active' : ''}
      >
        Home
      </Link>
      {/* ... other nav items */}
    </nav>
  );
}
```

## Step 6: API Routes Migration

### Supabase Edge Functions to NextJS API
```typescript
// src/app/api/donations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const body = await request.json();
    
    // Process donation logic
    const { data, error } = await supabase
      .from('donations')
      .insert(body);
    
    if (error) throw error;
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process donation' },
      { status: 500 }
    );
  }
}
```

## Step 7: Middleware for Subdomains

### Create middleware.ts
```typescript
// middleware.ts (root level)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];
  
  // Handle charity subdomains
  if (hostname.includes('.yourjannah.com') && subdomain !== 'www') {
    return NextResponse.rewrite(
      new URL(`/subdomain/${subdomain}${request.nextUrl.pathname}`, request.url)
    );
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

## Step 8: Environment Variables

### Create .env.local
```bash
# NextJS automatically loads .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Add other environment variables as needed
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## Step 9: Static Assets and Images

### Move public assets
```bash
# Copy all files from current public/ to new public/
cp -r public/* new-nextjs-project/public/
```

### Update Image components
```tsx
// OLD
<img src="/logo.png" alt="Logo" />

// NEW - NextJS optimized images
import Image from 'next/image';
<Image src="/logo.png" alt="Logo" width={200} height={100} />
```

## Step 10: Metadata and SEO

### Page-level metadata
```tsx
// src/app/campaigns/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Campaigns - Your Jannah',
  description: 'Browse and support ongoing charity campaigns',
};

export default function CampaignsPage() {
  return <div>Campaigns content</div>;
}
```

## Step 11: Error Handling

### Global Error Boundary
```tsx
// src/app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### Not Found Page
```tsx
// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2>Page Not Found</h2>
      <Link href="/">Return Home</Link>
    </div>
  );
}
```

## Step 12: Client Components

### Mark interactive components
```tsx
// Add to components that use hooks or event handlers
'use client';

import { useState } from 'react';
// ... component code
```

## Step 13: Testing the Migration

### Development Testing
```bash
npm run dev
# Test all routes
# Verify subdomain routing
# Check API endpoints
# Validate authentication flows
```

### Build Testing
```bash
npm run build
npm run start
# Test production build
```

## Step 14: Deployment Considerations

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
# Follow prompts for deployment
```

### Environment Variables in Production
- Set all NEXT_PUBLIC_ variables
- Configure domain routing
- Set up subdomain DNS records

## Common Issues and Solutions

### 1. Hydration Errors
```tsx
// Use dynamic imports for client-only components
import dynamic from 'next/dynamic';

const ClientOnlyComponent = dynamic(
  () => import('@/components/ClientOnly'),
  { ssr: false }
);
```

### 2. Supabase Client Configuration
```typescript
// src/lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const supabase = createClientComponentClient();
```

### 3. Authentication State
```tsx
// Use Supabase Auth Helpers for NextJS
import { useUser } from '@supabase/auth-helpers-react';

export default function Component() {
  const user = useUser();
  // ... component logic
}
```

This migration maintains all existing functionality while leveraging NextJS benefits like SSR, optimized images, and better SEO.
