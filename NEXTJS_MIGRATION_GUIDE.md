
# Next.js Migration Guide for Charity Donation Platform

This guide will help you migrate the current React/Vite project to Next.js 14 with App Router.

## Step 1: Initial Setup

### Create New Next.js Project
```bash
npx create-next-app@latest charity-platform-nextjs --typescript --tailwind --eslint --app --src-dir
cd charity-platform-nextjs
```

### Install Dependencies
```bash
npm install @tanstack/react-query @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip

npm install @react-three/drei @react-three/fiber three @types/three

npm install @hookform/resolvers @huggingface/transformers class-variance-authority clsx cmdk date-fns embla-carousel-react input-otp lucide-react next-themes react-day-picker react-hook-form react-resizable-panels recharts sonner tailwind-merge tailwindcss-animate vaul zod
```

## Step 2: Project Structure Migration

### Directory Mapping
```
Current (React/Vite)          →  Next.js App Router
src/pages/Index.tsx          →  src/app/page.tsx
src/pages/Profile.tsx        →  src/app/profile/page.tsx
src/pages/BuildMosque.tsx    →  src/app/build-mosque/page.tsx
src/pages/WaterWells.tsx     →  src/app/water-wells/page.tsx
src/pages/Orphanages.tsx     →  src/app/orphanages/page.tsx
src/pages/MyJannah.tsx       →  src/app/my-jannah/page.tsx
src/pages/Campaigns.tsx      →  src/app/campaigns/page.tsx
src/pages/Leaderboards.tsx   →  src/app/leaderboards/page.tsx
src/pages/About.tsx          →  src/app/about/page.tsx
src/pages/SadaqahCoins.tsx   →  src/app/coins/page.tsx
src/pages/Membership.tsx     →  src/app/membership/page.tsx
src/pages/LiveFeed.tsx       →  src/app/live/page.tsx
src/pages/CharityPartnersPublic.tsx → src/app/charities/page.tsx
src/pages/Blog.tsx           →  src/app/blog/page.tsx
src/pages/WhyDonate.tsx      →  src/app/why-donate/page.tsx
src/pages/Checkout.tsx       →  src/app/checkout/page.tsx
src/pages/CharityProfile.tsx →  src/app/charity/[id]/page.tsx
src/pages/BusinessProfile.tsx → src/app/business/[id]/page.tsx
src/pages/NotFound.tsx       →  src/app/not-found.tsx
```

## Step 3: Configuration Files

See NEXTJS_CONFIG_FILES.md for detailed configuration setup.

## Step 4: Component Migration

All components in `src/components/` can be copied directly to Next.js `src/components/` - they are 100% compatible.

## Step 5: Routing Updates

See NEXTJS_ROUTING_MIGRATION.md for detailed routing conversion examples.

## Step 6: Assets Migration

1. Copy `public/lovable-uploads/` to Next.js `public/` directory
2. Update image references to use Next.js Image optimization where beneficial

## Step 7: Final Steps

1. Test all routes and functionality
2. Run `npm run build` to ensure everything compiles
3. Deploy to Vercel or your preferred platform

## Migration Checklist

- [ ] Project setup complete
- [ ] Dependencies installed
- [ ] Configuration files copied
- [ ] All pages migrated
- [ ] All components copied
- [ ] Routing updated
- [ ] Assets migrated
- [ ] Build successful
- [ ] All functionality tested
