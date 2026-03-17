# Phase 2: Domain Logic, Services & API

This phase focuses on connecting the UI to the backend, defining state, types, utility hooks, and exposing API routes for full functionality.

## 1. Features Layer (Domain Logic for Redux/State)
```text
src/features
│
├── auth
│   ├── authSlice.ts
│   ├── authService.ts
│   └── authSelectors.ts
│
├── users
│   ├── userService.ts
│   ├── userSlice.ts
│   └── userSelectors.ts
│
├── items
│   ├── itemService.ts
│   ├── itemSlice.ts
│   └── itemSelectors.ts
│
├── cart
│   ├── cartSlice.ts
│   └── cartService.ts
│
└── aesthetics
    └── aestheticService.ts
```

## 2. Services Layer (Business Logic & External API Calls)
```text
src/services
│
├── userService.ts
├── itemService.ts
├── orderService.ts
├── aestheticService.ts
└── uploadService.ts

// Examples: getUserByUsername(), getItemsByUser(), getFeedItems()
```

## 3. Types and Schemas (Database & Validation)
```text
src/types
│
├── user.ts
├── item.ts
├── order.ts
├── aesthetic.ts
└── cart.ts

src/schemas
│
└── (Zod validation schemas can live here)
```

### Entity Examples
**User**
- username
- bio
- avatar
- aesthetic
- followers

**Item**
- title
- price
- images
- sellerId
- aestheticTags

## 4. Custom Hooks (React Logic)
```text
src/hooks
│
├── useAuth.ts
├── useUser.ts
├── useItems.ts
└── useAesthetic.ts
```

## 5. API Routes (Backend Endpoints)
```text
src/app/api
│
├── auth
│   ├── send-otp/route.ts
│   ├── verify-otp/route.ts
│   └── [...nextauth]/route.ts
│
├── users
│   └── route.ts
│
├── items
│   ├── route.ts
│   └── [itemId]/route.ts
│
└── aesthetics
    └── route.ts
```

## Example Dynamic Route Flow
Customer visits: `/user/nischix`

**Flow:**
1. `getUserByUsername("nischix")`
2. Identifies `aesthetic = "noir"`
3. Loads `/aesthetics/noir/ProfileLayout`
4. Renders items using the `noir` `ItemCard`
