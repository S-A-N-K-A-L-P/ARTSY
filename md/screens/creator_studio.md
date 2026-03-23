# Creator Studio (`/dashboard`)

The management nerve-center where creators orchestrate their digital presence and physical manifestations.

## Layout Overview
- **Header Section**: Displays the active aesthetic perspective and management status.
- **Stats Dashboard**: Dynamic counters for "Deployed Archetypes" and "Active Identity".
- **Global Action**: "Forge New Space" button for initiating the creation ritual.

## Core Features

### 1. Page Management (Physical Manifestations)
- **Collection Cards**: High-fidelity space cards with:
  - Gradient overlays and premium hover physics (`spring` transitions).
  - Type and Aesthetic badges.
  - Direct "Access Artifact" navigation.
- **Empty State**: Guided "ritual of creation" prompt for new users.

### 2. Creation Flow (`/dashboard/create`)
- Entry point for deploying new aesthetic spaces and archetypes.

## Technical Details
- **Data Source**: Fetches from `/api/creator/page`.
- **Theme Sync**: All cards and stats automatically consume CSS variables (e.g., `--bg-secondary`, `--accent-soft`).
- **Responsive Design**: Optimized for wide-screen management and compact mobile status checks.
