
# Developer Handoff Documentation

## System Overview
This is a comprehensive Islamic charity platform built with React, TypeScript, Tailwind CSS, and Supabase. The system includes donation management, user engagement features, charity partnerships, and admin tools.

## Key Features Implemented

### 1. User Management & Authentication
- Supabase Auth integration
- User profiles with Islamic gamification (Jannah points, Sadaqah coins)
- Role-based access (user, admin, charity_partner)
- Achievement system and leaderboards

### 2. Donation System
- Multiple donation flows (one-time, recurring)
- Charity allocation system with trust ratings
- Gift aid support
- Attribution tracking (UTM parameters)
- Disbursement management

### 3. Charity Partner Program
- Subdomain system for charity partners
- Revenue tracking and commission management
- Marketing tools and campaign management
- Attribution-based revenue sharing

### 4. Islamic Features
- Quran reader with progress tracking
- Prayer times and mosque check-ins
- Dhikr communities and events
- Duas library with donation integration
- Islamic calendar with events

### 5. Fundraising Platform
- Individual and team fundraising campaigns
- Campaign management tools
- Social sharing and tracking

### 6. Admin Dashboard
- Comprehensive analytics
- User and charity management
- Disbursement tools
- Marketing campaign management
- Data seeding tools

## Database Schema

### Core Tables
- `profiles` - User profiles and stats
- `charities` - Charity information and verification
- `donations` - All donation records
- `charity_partners` - Partner program participants
- `charity_allocations` - Automated fund distribution

### Islamic Features Tables
- `quran_surahs`, `quran_verses` - Quran content
- `user_verse_progress` - Reading progress tracking
- `duas`, `duas_library` - Prayer collections
- `dhikr_events`, `dhikr_participation` - Community dhikr
- `check_in_locations`, `user_check_ins` - Mosque check-ins

### Engagement Tables
- `achievements`, `user_achievements` - Gamification
- `utm_tracking` - Attribution tracking
- `push_notifications`, `push_subscriptions` - Notifications
- `spiritual_activities` - Activity tracking

## Missing Implementation Areas

### 1. Payment Integration
**Status**: Mock implementation only
**Required**: 
- Stripe Connect integration for charity payouts
- Stripe Checkout for donations
- Webhook handling for payment confirmations
- PCI compliance implementation

### 2. Email System
**Status**: Placeholder edge functions
**Required**:
- Transactional email service (Resend, SendGrid)
- Email templates for confirmations, newsletters
- Automated email campaigns
- Unsubscribe management

### 3. SMS Notifications
**Status**: Not implemented
**Required**:
- SMS service integration (Twilio, AWS SNS)
- Two-factor authentication
- Emergency notifications

### 4. Advanced Analytics
**Status**: Basic implementation
**Required**:
- Google Analytics 4 integration
- Custom event tracking
- Revenue analytics dashboard
- A/B testing framework

### 5. Content Management
**Status**: Basic admin tools
**Required**:
- Rich text editor for charity content
- Image upload and optimization
- Content moderation tools
- Multi-language support

### 6. Mobile App Features
**Status**: PWA ready
**Required**:
- Push notification service worker
- Offline functionality
- App store deployment
- Biometric authentication

## Environment Variables Required

```bash
# Supabase (already configured)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Payment Processing
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email Service
RESEND_API_KEY=re_...

# SMS Service
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...

# Analytics
GOOGLE_ANALYTICS_ID=GA-...

# External APIs
OPENAI_API_KEY=sk-... (for AI features)
GOOGLE_MAPS_API_KEY=... (for location features)
```

## Key Hooks and Services

### Custom Hooks
- `useAuth` - Authentication management
- `useDonations` - Donation operations
- `useProfile` - User profile management
- `useCharityProducts` - Charity product catalog
- `useUTMTracking` - Attribution tracking
- `useUserAchievements` - Achievement system

### Services
- `pushNotificationService` - Browser notifications
- `nativePayments` - Mobile payment integration

## NextJS Migration Guide

### Current Structure (React Router)
```
src/
├── pages/ (Route components)
├── components/ (Reusable components)
├── hooks/ (Custom hooks)
├── integrations/supabase/ (Database client)
```

### NextJS Structure (Recommended)
```
src/
├── app/ (App Router)
│   ├── (auth)/ (Route groups)
│   ├── admin/ (Admin routes)
│   ├── subdomain/[slug]/ (Dynamic charity subdomains)
│   └── api/ (API routes)
├── components/ (Keep existing)
├── hooks/ (Keep existing)
├── lib/ (Utilities and configs)
```

### Migration Steps

1. **Install NextJS dependencies**
```bash
npm install next@latest react@latest react-dom@latest
npm install -D @types/node
```

2. **Update configuration files**
- Move from Vite to Next.js config
- Update TypeScript config for Next.js
- Migrate Tailwind config

3. **Route Migration**
- Convert `src/pages/*.tsx` to `src/app/*/page.tsx`
- Update navigation from React Router to Next.js navigation
- Implement middleware for subdomain routing

4. **API Integration**
- Move Supabase edge functions to Next.js API routes if needed
- Update client-side calls to use Next.js API routes

5. **Static Assets**
- Move from `public/` to Next.js static serving
- Optimize images with Next.js Image component

## Security Considerations

### Current Implementation
- Row Level Security (RLS) policies implemented
- Authentication required for sensitive operations
- Admin role protection
- Input validation on frontend

### Additional Security Needed
- Rate limiting on API endpoints
- CSRF protection
- Content Security Policy headers
- SQL injection prevention (use Supabase client only)
- XSS protection for user-generated content

## Performance Optimizations

### Implemented
- React Query for state management and caching
- Lazy loading for heavy components
- Optimized database queries with proper indexing

### Recommended
- Next.js Image optimization
- CDN for static assets
- Database connection pooling
- Redis caching for frequently accessed data
- Implement proper loading states

## Testing Strategy

### Current State
- No automated tests implemented

### Recommended Implementation
```bash
# Testing dependencies
npm install -D @testing-library/react @testing-library/jest-dom jest
npm install -D @testing-library/user-event msw
```

### Test Coverage Needed
- Unit tests for utility functions
- Integration tests for hooks
- E2E tests for critical user flows
- API endpoint testing

## Deployment Checklist

### Pre-production
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificates installed
- [ ] Domain configuration
- [ ] Email/SMS services configured
- [ ] Payment gateway testing
- [ ] Monitoring and logging setup

### Production Monitoring
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Database performance
- [ ] Payment processing monitoring
- [ ] User activity analytics

## Support Documentation

### For Developers
- All components are documented with TypeScript interfaces
- Database schema is fully documented in Supabase
- Custom hooks include usage examples
- Edge functions include proper error handling

### For Content Managers
- Admin dashboard provides comprehensive management tools
- Charity partner portal for self-service
- Data seeding tools for testing

## Known Issues and Limitations

1. **Payment Processing**: Currently using mock data
2. **Email Delivery**: Edge functions need real email service
3. **Mobile Notifications**: Requires proper service worker setup
4. **Image Optimization**: No compression or CDN
5. **Internationalization**: English only implementation
6. **Accessibility**: Basic implementation, needs audit

This system is production-ready for core functionality but requires the missing integrations listed above for full deployment.
