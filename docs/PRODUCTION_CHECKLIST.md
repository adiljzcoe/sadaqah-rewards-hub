
# Production Deployment Checklist

## Pre-Deployment

### Database
- [ ] All migrations applied to production database
- [ ] Row Level Security (RLS) policies tested and enabled
- [ ] Database backups configured
- [ ] Connection pooling configured
- [ ] Performance monitoring enabled

### Environment Configuration
- [ ] Production environment variables set
- [ ] API keys rotated from test to live
- [ ] SSL certificates installed
- [ ] Domain DNS configured
- [ ] Subdomain wildcard DNS configured

### Security
- [ ] Remove development seeds and test data
- [ ] Enable RLS on all tables (currently disabled for testing)
- [ ] Audit admin user permissions
- [ ] Review API rate limiting
- [ ] Enable CORS restrictions
- [ ] Content Security Policy configured

### Payment Processing
- [ ] Stripe live keys configured
- [ ] Webhook endpoints configured
- [ ] PCI compliance review
- [ ] Test donation flows
- [ ] Test charity disbursements

### External Services
- [ ] Email service configured (Resend/SendGrid)
- [ ] SMS service configured (Twilio)
- [ ] Push notification service configured
- [ ] Analytics tracking configured
- [ ] Error monitoring configured (Sentry)

### Performance
- [ ] CDN configured for static assets
- [ ] Image optimization enabled
- [ ] Database query optimization
- [ ] Caching strategy implemented
- [ ] Load testing completed

### Monitoring
- [ ] Application monitoring (Vercel Analytics)
- [ ] Database monitoring
- [ ] Error tracking
- [ ] Performance monitoring
- [ ] Security monitoring

## Deployment Steps

### 1. Database Preparation
```sql
-- Enable RLS on all tables for production
SELECT public.enable_rls_for_production();

-- Remove test data
DELETE FROM donations WHERE user_id = '00000000-0000-0000-0000-000000000001';
DELETE FROM profiles WHERE id = '00000000-0000-0000-0000-000000000001';

-- Verify data integrity
SELECT COUNT(*) FROM charities WHERE verified = true;
SELECT COUNT(*) FROM charity_partners WHERE is_active = true;
```

### 2. Environment Variables
```bash
# Production .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

RESEND_API_KEY=re_...
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...

NEXT_PUBLIC_APP_URL=https://yourjannah.com
```

### 3. Domain Configuration
```bash
# DNS Records needed:
# A record: yourjannah.com -> Vercel IP
# CNAME: *.yourjannah.com -> yourjannah.com
# CNAME: www.yourjannah.com -> yourjannah.com
```

### 4. Deployment
```bash
# Using Vercel
vercel --prod

# Using custom hosting
npm run build
npm run start
```

## Post-Deployment

### Verification
- [ ] Main site loads correctly
- [ ] Admin dashboard accessible
- [ ] Charity subdomains working
- [ ] Authentication flows working
- [ ] Payment processing working
- [ ] Email notifications sending
- [ ] Mobile responsiveness verified

### Monitoring Setup
- [ ] Set up alerts for critical errors
- [ ] Monitor payment processing
- [ ] Track user registrations
- [ ] Monitor donation volumes
- [ ] Track charity partner activity

### Performance Testing
- [ ] Page load speeds < 3 seconds
- [ ] Database query performance
- [ ] API response times
- [ ] Mobile performance testing

### Security Audit
- [ ] Penetration testing
- [ ] OWASP security checklist
- [ ] User permission audit
- [ ] Data protection compliance

## Ongoing Maintenance

### Daily
- [ ] Monitor error rates
- [ ] Check payment processing
- [ ] Review user registration activity

### Weekly
- [ ] Database performance review
- [ ] Security log review
- [ ] Backup verification
- [ ] Analytics review

### Monthly
- [ ] Security updates
- [ ] Dependency updates
- [ ] Performance optimization
- [ ] User feedback review

## Emergency Procedures

### Rollback Plan
```bash
# Quick rollback using Vercel
vercel rollback [deployment-url]

# Database rollback
# Restore from latest backup if needed
```

### Critical Issue Response
1. Immediate: Disable affected features
2. Communicate: Update status page
3. Fix: Apply emergency patch
4. Verify: Test fix in staging
5. Deploy: Push to production
6. Monitor: Verify issue resolved

## Support Documentation

### For Support Team
- Admin dashboard access procedures
- Common user issues and solutions
- Escalation procedures
- Contact information for technical team

### For Users
- Help documentation
- FAQ section
- Contact support information
- Troubleshooting guides

This checklist ensures a smooth production deployment with all necessary safeguards in place.
