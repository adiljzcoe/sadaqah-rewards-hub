
# Complete Next.js Migration Checklist

## Pre-Migration Setup
- [ ] Create new Next.js project with TypeScript and Tailwind
- [ ] Install all required dependencies
- [ ] Set up project structure

## Configuration
- [ ] Copy `tailwind.config.ts` exactly as-is
- [ ] Create `next.config.js` with proper settings
- [ ] Set up `src/app/layout.tsx` with providers
- [ ] Create `src/app/providers.tsx` for client components
- [ ] Copy CSS to `src/app/globals.css`

## Pages Migration
- [ ] `src/pages/Index.tsx` → `src/app/page.tsx`
- [ ] `src/pages/Profile.tsx` → `src/app/profile/page.tsx`
- [ ] `src/pages/BuildMosque.tsx` → `src/app/build-mosque/page.tsx`
- [ ] `src/pages/WaterWells.tsx` → `src/app/water-wells/page.tsx`
- [ ] `src/pages/Orphanages.tsx` → `src/app/orphanages/page.tsx`
- [ ] `src/pages/MyJannah.tsx` → `src/app/my-jannah/page.tsx`
- [ ] `src/pages/Campaigns.tsx` → `src/app/campaigns/page.tsx`
- [ ] `src/pages/Leaderboards.tsx` → `src/app/leaderboards/page.tsx`
- [ ] `src/pages/About.tsx` → `src/app/about/page.tsx`
- [ ] `src/pages/SadaqahCoins.tsx` → `src/app/coins/page.tsx`
- [ ] `src/pages/Membership.tsx` → `src/app/membership/page.tsx`
- [ ] `src/pages/LiveFeed.tsx` → `src/app/live/page.tsx`
- [ ] `src/pages/CharityPartnersPublic.tsx` → `src/app/charities/page.tsx`
- [ ] `src/pages/Blog.tsx` → `src/app/blog/page.tsx`
- [ ] `src/pages/WhyDonate.tsx` → `src/app/why-donate/page.tsx`
- [ ] `src/pages/Checkout.tsx` → `src/app/checkout/page.tsx`
- [ ] `src/pages/CharityProfile.tsx` → `src/app/charity/[id]/page.tsx`
- [ ] `src/pages/BusinessProfile.tsx` → `src/app/business/[id]/page.tsx`
- [ ] `src/pages/NotFound.tsx` → `src/app/not-found.tsx`

## Component Migration
- [ ] Copy entire `src/components/` directory
- [ ] Copy entire `src/components/ui/` directory
- [ ] Update Header.tsx navigation imports
- [ ] Update any components using React Router hooks

## Assets
- [ ] Copy `public/lovable-uploads/` directory
- [ ] Verify all image paths work correctly

## Routing Updates
- [ ] Replace all `<Link to="">` with `<Link href="">`
- [ ] Replace `useNavigate()` with `useRouter()`
- [ ] Replace `useLocation()` with `usePathname()`
- [ ] Update active route detection logic

## Testing
- [ ] Test homepage loads correctly
- [ ] Test all navigation links work
- [ ] Test all pages render without errors
- [ ] Test mobile responsiveness
- [ ] Test all animations work
- [ ] Test 3D components render
- [ ] Test form submissions
- [ ] Test donation widgets
- [ ] Test leaderboards
- [ ] Test charity browsing

## Build & Deploy
- [ ] Run `npm run build` successfully
- [ ] Fix any build errors
- [ ] Test production build locally
- [ ] Deploy to Vercel or preferred platform
- [ ] Test deployed version

## Performance Optimization (Optional)
- [ ] Add loading.tsx files for better UX
- [ ] Add error.tsx files for error handling
- [ ] Optimize images with next/image
- [ ] Add metadata for SEO
- [ ] Implement Server Components where beneficial

## Final Verification
- [ ] All original functionality works
- [ ] No console errors
- [ ] All styling preserved
- [ ] Mobile experience intact
- [ ] Performance is good
- [ ] SEO improvements visible

## Post-Migration Benefits Gained
- ✅ Better SEO with SSR
- ✅ Improved performance
- ✅ Better developer experience
- ✅ Easier deployment options
- ✅ Enhanced routing capabilities
- ✅ All original features preserved
