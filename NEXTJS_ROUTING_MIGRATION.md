# Next.js Routing Migration Examples

## Converting React Router to Next.js Navigation

### 1. Import Changes
```tsx
// OLD (React Router)
import { Link, useNavigate, useLocation } from 'react-router-dom'

// NEW (Next.js)
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
```

### 2. Link Component Updates
```tsx
// OLD
<Link to="/build-mosque">Build Mosque</Link>

// NEW
<Link href="/build-mosque">Build Mosque</Link>
```

### 3. Navigation Hooks
```tsx
// OLD
const navigate = useNavigate()
const location = useLocation()
navigate('/profile')

// NEW
const router = useRouter()
const pathname = usePathname()
router.push('/profile')
```

### 4. Dynamic Routes Migration

#### CharityProfile.tsx → charity/[id]/page.tsx
```tsx
// OLD (src/pages/CharityProfile.tsx)
import { useParams } from 'react-router-dom'

const CharityProfile = () => {
  const { id } = useParams()
  // ... component code
}

// NEW (src/app/charity/[id]/page.tsx)
interface Props {
  params: { id: string }
}

export default function CharityProfile({ params }: Props) {
  const { id } = params
  // ... same component code
}
```

#### BusinessProfile.tsx → business/[id]/page.tsx
```tsx
// Similar pattern as above
interface Props {
  params: { id: string }
}

export default function BusinessProfile({ params }: Props) {
  const { id } = params
  // ... component code
}
```

### 5. Page Component Template
Each page should follow this structure:

```tsx
// src/app/[route]/page.tsx
import React from 'react'
// ... other imports

export default function PageName() {
  return (
    <div>
      {/* Your existing component JSX */}
    </div>
  )
}

// Optional: Add metadata
export const metadata = {
  title: 'Page Title',
  description: 'Page description'
}
```

### 6. Header Component Updates
Update your Header component navigation:

```tsx
// In src/components/Header.tsx
// Replace all <Link to="..."> with <Link href="...">
<Link href="/build-mosque" className="...">
  Build Mosque
</Link>
```

### 7. Active Route Detection
```tsx
// OLD
import { useLocation } from 'react-router-dom'
const location = useLocation()
const isActive = location.pathname === '/build-mosque'

// NEW
import { usePathname } from 'next/navigation'
const pathname = usePathname()
const isActive = pathname === '/build-mosque'
```

## Route Migration Checklist
- [ ] All `<Link to="">` converted to `<Link href="">`
- [ ] `useNavigate()` replaced with `useRouter()`
- [ ] `useLocation()` replaced with `usePathname()`
- [ ] Dynamic routes converted to `[param]` folders
- [ ] Page components use proper Next.js structure
- [ ] Metadata added where appropriate
