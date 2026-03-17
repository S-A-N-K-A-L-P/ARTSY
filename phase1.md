# Phase 1: Core App & UI Architecture

This phase focuses on the platform layer, global UI components, and the static shell of the aesthetic template system.

## 1. App Router Structure (Core Pages & Routing)
```text
src/app
│
├── layout.tsx
├── page.tsx
├── globals.css
│
├── (auth)
│   ├── login/page.tsx
│   ├── register/page.tsx
│   └── verify/page.tsx
│
├── explore/page.tsx
│
├── item
│   └── [itemId]/page.tsx
│
├── user
│   └── [username]
│       ├── page.tsx
│       ├── loading.tsx
│       ├── not-found.tsx
│       ├── items/page.tsx
│       ├── collections/page.tsx
│       └── about/page.tsx
│
└── dashboard
    ├── page.tsx
    ├── items
    │   ├── create/page.tsx
    │   └── edit/[itemId]/page.tsx
    ├── analytics/page.tsx
    └── settings
        ├── profile/page.tsx
        └── aesthetic/page.tsx
```

## 2. Component System (Reusable UI)
```text
src/components
│
├── ui
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Avatar.tsx
│   ├── Modal.tsx
│   ├── Input.tsx
│   └── Badge.tsx
│
├── layout
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   └── Footer.tsx
│
├── feed
│   ├── FeedGrid.tsx
│   └── FeedCard.tsx
│
├── items
│   ├── ItemCard.tsx
│   ├── ItemGrid.tsx
│   ├── ItemPreview.tsx
│   └── ItemPrice.tsx
│
├── users
│   ├── UserCard.tsx
│   ├── UserAvatar.tsx
│   ├── UserHeader.tsx
│   └── FollowButton.tsx
│
├── storefront
│   ├── StorefrontHeader.tsx
│   ├── StorefrontGrid.tsx
│   └── StorefrontStats.tsx
│
└── aesthetics
    ├── ThemeProvider.tsx
    └── AestheticRenderer.tsx
```

## 3. Aesthetic Template System (Boilerplate & Dynamic Loader)
```text
src/aesthetics
│
├── noir
│   ├── ProfileLayout.tsx
│   ├── ItemCard.tsx
│   ├── ProfileHeader.tsx
│   └── theme.ts
│
├── minimal
│   ├── ProfileLayout.tsx
│   ├── ItemCard.tsx
│   ├── ProfileHeader.tsx
│   └── theme.ts
│
├── vaporwave
│   ├── ProfileLayout.tsx
│   ├── ItemCard.tsx
│   ├── ProfileHeader.tsx
│   └── theme.ts
│
├── brutalist
│   ├── ProfileLayout.tsx
│   ├── ItemCard.tsx
│   ├── ProfileHeader.tsx
│   └── theme.ts
│
├── grunge
│   ├── ProfileLayout.tsx
│   ├── ItemCard.tsx
│   └── theme.ts
│
├── cyberpunk
│   ├── ProfileLayout.tsx
│   └── theme.ts
│
└── index.ts
```

### Dynamic Theme Loader Example (`src/aesthetics/index.ts`)
```typescript
import noir from "./noir"
import minimal from "./minimal"
import vaporwave from "./vaporwave"

export const aestheticMap = {
  noir,
  minimal,
  vaporwave
}
// Usage in profile page:
// const aesthetic = aestheticMap[user.aesthetic]
// return <aesthetic.ProfileLayout user={user} items={items}/>
```
