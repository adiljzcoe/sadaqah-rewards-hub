
# Component Migration Guide

## Components That Transfer Directly (No Changes Needed)

All these components can be copied exactly as-is to your Next.js project:

### UI Components (100% Compatible)
- All Shadcn UI components in `src/components/ui/`
- All custom styling and animations
- All Tailwind classes and configurations

### Business Logic Components (100% Compatible)
- `Header.tsx` (just update Link imports)
- `LiveVideo.tsx`
- `Leaderboard.tsx`
- `DonationWidget.tsx`
- `FloatingDonationButton.tsx`
- `CharityPartners.tsx`
- `LiveFeed.tsx`
- `UserStats.tsx`
- `PersonalLeagueWidget.tsx`
- `AchievementSystem.tsx`
- `FriendsWidget.tsx`
- `SeasonalEvents.tsx`
- `BusinessSection.tsx`
- `CampaignsCarousel.tsx`
- `FundraisersCarousel.tsx`
- `InMemoryOfWidget.tsx`
- `StreakWidget.tsx`
- `MatchingPoolWidget.tsx`
- `CharityTicker.tsx`
- `BusinessAdvert.tsx`
- `LeagueTablesCarousel.tsx`
- `DonationProducts.tsx`
- `ProjectDonationWidget.tsx`
- `LiveDonationFeed.tsx`

### 3D Components (100% Compatible)
- `CharityCharacter3D.tsx`
- `Custom3DCharacter.tsx`
- `GoldCoin3D.tsx`
- `HeavenlyBirdMascot.tsx`
- `Jannah3DBuilder.tsx`
- `JannahBuilder.tsx`
- `PixarHeartMascot.tsx`

### Animation Components (100% Compatible)
- `CoinAnimation.tsx`
- `SimpleGoldCoin.tsx`
- `EpicDonationButton.tsx`

## Components Requiring Minor Updates

### Header.tsx Navigation Links
```tsx
// Update imports
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Update Link components
<Link href="/build-mosque" className="...">
  Build Mosque
</Link>

// Update active route detection
const pathname = usePathname()
const isActive = (path: string) => pathname === path
```

### Any Component Using useLocation or useNavigate
Replace with Next.js equivalents as shown in routing migration guide.

## File Structure in Next.js
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── providers.tsx
│   └── [all your pages]/
├── components/
│   ├── ui/ (copy all Shadcn components)
│   └── [all your custom components]
├── hooks/
├── lib/
└── utils/
```

## Migration Steps
1. Copy entire `src/components/` directory
2. Update import statements for routing
3. Test each component individually
4. Fix any TypeScript errors
5. Verify all animations and styling work

## No Changes Needed For:
- All styling (Tailwind classes)
- All animations and transitions
- State management logic
- React Query setup
- Form handling
- 3D rendering
- Business logic
- Event handlers
- API calls
