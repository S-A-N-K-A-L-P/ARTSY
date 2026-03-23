# Social Home Hub (`/home`)

The primary social discovery layer of the Artsy platform, optimized for aesthetic convergence and high-engagement discovery.

## Layout Overview
- **Sidebar Navigation**: Global access to Feed, Pages, Items, and Settings.
- **Topbar**: Contextual title "Digital Discovery" with aesthetic perspective indicators.
- **Dual-View Toggle**: Switch between immersive Reels and high-density Grid.

## Components

### 1. Daily Feed (Reels View)
- **Fluidity**: Vertical snap-scrolling with physics-based "momentum" feel.
- **Micro-Interactions**:
  - `whileTap` on all engagement buttons.
  - Haptic confirmation (Floating Toast) on "Add to Bag".
  - Spring-animated Like effects.
- **Performance**: 
  - **Virtualization**: Only renders the active slide and adjacent items (Active +/- 1).
  - **Optimization**: Uses `next/image` for lazy loading and blur placeholders.

### 2. Gallery Grid (Grid View)
- **MUI FeedCard**: High-depth Material UI cards featuring:
  - Dynamic aesthetic badges (e.g., Cyberpunk, Noir).
  - Creator identity integration (Avatar + Username).
  - Direct "Add to Cart" Redux integration.
- **Responsive Layout**: Adapts from 1 to 3 columns based on viewport.

## State Management
- **View Toggle**: Local React state (`reels` | `grid`).
- **Cart**: `CartProvider` (Context) handles global bag state and the toast notification system.
- **Aesthetic**: `AestheticProvider` syncs the UI perspective across all rendered components.
