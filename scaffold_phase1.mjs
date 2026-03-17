import fs from 'fs';
import path from 'path';

const SRC_DIR = 'c:/art_web/antigravity/src';

const directories = [
  'app/explore',
  'app/item/[itemId]',
  'app/user/[username]/items',
  'app/user/[username]/collections',
  'app/user/[username]/about',
  'app/dashboard/items/create',
  'app/dashboard/items/edit/[itemId]',
  'app/dashboard/analytics',
  'app/dashboard/settings/profile',
  'app/dashboard/settings/aesthetic',
  'components/ui',
  'components/layout',
  'components/items',
  'components/users',
  'components/storefront',
  'aesthetics/noir',
  'aesthetics/minimal',
  'aesthetics/vaporwave',
  'aesthetics/brutalist',
  'aesthetics/grunge',
  'aesthetics/cyberpunk'
];

const files = [
  { path: 'app/explore/page.tsx', content: 'export default function ExplorePage() { return <h1>Explore</h1>; }' },
  { path: 'app/item/[itemId]/page.tsx', content: 'export default function ItemPage() { return <h1>Item</h1>; }' },
  { path: 'app/user/[username]/page.tsx', content: 'export default function UserProfilePage() { return <h1>User Profile</h1>; }' },
  { path: 'app/user/[username]/loading.tsx', content: 'export default function Loading() { return <div>Loading...</div>; }' },
  { path: 'app/user/[username]/not-found.tsx', content: 'export default function NotFound() { return <div>Not Found</div>; }' },
  { path: 'app/user/[username]/items/page.tsx', content: 'export default function UserItemsPage() { return <h1>User Items</h1>; }' },
  { path: 'app/user/[username]/collections/page.tsx', content: 'export default function UserCollectionsPage() { return <h1>User Collections</h1>; }' },
  { path: 'app/user/[username]/about/page.tsx', content: 'export default function UserAboutPage() { return <h1>About User</h1>; }' },
  { path: 'app/dashboard/page.tsx', content: 'export default function DashboardPage() { return <h1>Dashboard</h1>; }' },
  { path: 'app/dashboard/items/create/page.tsx', content: 'export default function CreateItemPage() { return <h1>Create Item</h1>; }' },
  { path: 'app/dashboard/items/edit/[itemId]/page.tsx', content: 'export default function EditItemPage() { return <h1>Edit Item</h1>; }' },
  { path: 'app/dashboard/analytics/page.tsx', content: 'export default function AnalyticsPage() { return <h1>Analytics</h1>; }' },
  { path: 'app/dashboard/settings/profile/page.tsx', content: 'export default function ProfileSettingsPage() { return <h1>Profile Settings</h1>; }' },
  { path: 'app/dashboard/settings/aesthetic/page.tsx', content: 'export default function AestheticSettingsPage() { return <h1>Aesthetic Settings</h1>; }' },
  
  // UI Components
  { path: 'components/ui/Button.tsx', content: 'export const Button = () => <button>Button</button>;' },
  { path: 'components/ui/Card.tsx', content: 'export const Card = () => <div>Card</div>;' },
  { path: 'components/ui/Avatar.tsx', content: 'export const Avatar = () => <div>Avatar</div>;' },
  { path: 'components/ui/Modal.tsx', content: 'export const Modal = () => <div>Modal</div>;' },
  { path: 'components/ui/Input.tsx', content: 'export const Input = () => <input />;' },
  { path: 'components/ui/Badge.tsx', content: 'export const Badge = () => <span>Badge</span>;' },
  
  // Layout Components
  { path: 'components/layout/Navbar.tsx', content: 'export const Navbar = () => <nav>Navbar</nav>;' },
  { path: 'components/layout/Sidebar.tsx', content: 'export const Sidebar = () => <aside>Sidebar</aside>;' },
  { path: 'components/layout/Footer.tsx', content: 'export const Footer = () => <footer>Footer</footer>;' },
  
  // Item Components
  { path: 'components/items/ItemCard.tsx', content: 'export const ItemCard = () => <div>Item Card</div>;' },
  { path: 'components/items/ItemGrid.tsx', content: 'export const ItemGrid = () => <div>Item Grid</div>;' },
  { path: 'components/items/ItemPreview.tsx', content: 'export const ItemPreview = () => <div>Item Preview</div>;' },
  { path: 'components/items/ItemPrice.tsx', content: 'export const ItemPrice = () => <div>Item Price</div>;' },
  
  // User Components
  { path: 'components/users/UserCard.tsx', content: 'export const UserCard = () => <div>User Card</div>;' },
  { path: 'components/users/UserAvatar.tsx', content: 'export const UserAvatar = () => <div>User Avatar</div>;' },
  { path: 'components/users/UserHeader.tsx', content: 'export const UserHeader = () => <header>User Header</header>;' },
  { path: 'components/users/FollowButton.tsx', content: 'export const FollowButton = () => <button>Follow</button>;' },
  
  // Storefront Components
  { path: 'components/storefront/StorefrontHeader.tsx', content: 'export const StorefrontHeader = () => <header>Storefront Header</header>;' },
  { path: 'components/storefront/StorefrontGrid.tsx', content: 'export const StorefrontGrid = () => <div>Storefront Grid</div>;' },
  { path: 'components/storefront/StorefrontStats.tsx', content: 'export const StorefrontStats = () => <div>Storefront Stats</div>;' },
  
  // Aesthetics (Noir)
  { path: 'aesthetics/noir/ProfileLayout.tsx', content: 'export const ProfileLayout = () => <div>Noir Profile Schema</div>;' },
  { path: 'aesthetics/noir/ItemCard.tsx', content: 'export const ItemCard = () => <div>Noir Item Card</div>;' },
  { path: 'aesthetics/noir/ProfileHeader.tsx', content: 'export const ProfileHeader = () => <header>Noir Header</header>;' },
  { path: 'aesthetics/noir/theme.ts', content: 'import { createTheme } from "@mui/material/styles";\\nexport const theme = createTheme({ palette: { mode: "dark" } });' },
  
  // Aesthetics (Minimal)
  { path: 'aesthetics/minimal/ProfileLayout.tsx', content: 'export const ProfileLayout = () => <div>Minimal Profile Layout</div>;' },
  { path: 'aesthetics/minimal/ItemCard.tsx', content: 'export const ItemCard = () => <div>Minimal Item Card</div>;' },
  { path: 'aesthetics/minimal/ProfileHeader.tsx', content: 'export const ProfileHeader = () => <header>Minimal Header</header>;' },
  { path: 'aesthetics/minimal/theme.ts', content: 'import { createTheme } from "@mui/material/styles";\\nexport const theme = createTheme({ palette: { mode: "light" } });' },

  // Aesthetics (Vaporwave)
  { path: 'aesthetics/vaporwave/ProfileLayout.tsx', content: 'export const ProfileLayout = () => <div>Vaporwave Profile Layout</div>;' },
  { path: 'aesthetics/vaporwave/ItemCard.tsx', content: 'export const ItemCard = () => <div>Vaporwave Item Card</div>;' },
  { path: 'aesthetics/vaporwave/ProfileHeader.tsx', content: 'export const ProfileHeader = () => <header>Vaporwave Header</header>;' },
  { path: 'aesthetics/vaporwave/theme.ts', content: 'import { createTheme } from "@mui/material/styles";\\nexport const theme = createTheme({ palette: { primary: { main: "#ff71ce" } } });' },
  
  // Aesthetics (Brutalist)
  { path: 'aesthetics/brutalist/ProfileLayout.tsx', content: 'export const ProfileLayout = () => <div>Brutalist Profile Layout</div>;' },
  { path: 'aesthetics/brutalist/ItemCard.tsx', content: 'export const ItemCard = () => <div>Brutalist Item Card</div>;' },
  { path: 'aesthetics/brutalist/ProfileHeader.tsx', content: 'export const ProfileHeader = () => <header>Brutalist Header</header>;' },
  { path: 'aesthetics/brutalist/theme.ts', content: 'import { createTheme } from "@mui/material/styles";\\nexport const theme = createTheme({ shape: { borderRadius: 0 } });' },

  // Aesthetics (Grunge)
  { path: 'aesthetics/grunge/ProfileLayout.tsx', content: 'export const ProfileLayout = () => <div>Grunge Profile Layout</div>;' },
  { path: 'aesthetics/grunge/theme.ts', content: 'import { createTheme } from "@mui/material/styles";\\nexport const theme = createTheme({ palette: { mode: "dark" } });' },

  // Aesthetics (Cyberpunk)
  { path: 'aesthetics/cyberpunk/ProfileLayout.tsx', content: 'export const ProfileLayout = () => <div>Cyberpunk Profile Layout</div>;' },
  { path: 'aesthetics/cyberpunk/theme.ts', content: 'import { createTheme } from "@mui/material/styles";\\nexport const theme = createTheme({ palette: { mode: "dark", primary: { main: "#fcee0a" } } });' },

  // Aesthetics Loader
  { path: 'aesthetics/index.ts', content: `import { theme as noirTheme, ProfileLayout as NoirProfileLayout, ItemCard as NoirItemCard, ProfileHeader as NoirProfileHeader } from "./noir";
import { theme as minimalTheme, ProfileLayout as MinimalProfileLayout, ItemCard as MinimalItemCard, ProfileHeader as MinimalProfileHeader } from "./minimal";
import { theme as vaporwaveTheme, ProfileLayout as VaporwaveProfileLayout, ItemCard as VaporwaveItemCard, ProfileHeader as VaporwaveProfileHeader } from "./vaporwave";
import { theme as brutalistTheme, ProfileLayout as BrutalistProfileLayout, ItemCard as BrutalistItemCard, ProfileHeader as BrutalistProfileHeader } from "./brutalist";
import { theme as grungeTheme, ProfileLayout as GrungeProfileLayout } from "./grunge";
import { theme as cyberpunkTheme, ProfileLayout as CyberpunkProfileLayout } from "./cyberpunk";

export const aestheticMap = {
  noir: { theme: noirTheme, ProfileLayout: NoirProfileLayout, ItemCard: NoirItemCard, ProfileHeader: NoirProfileHeader },
  minimal: { theme: minimalTheme, ProfileLayout: MinimalProfileLayout, ItemCard: MinimalItemCard, ProfileHeader: MinimalProfileHeader },
  vaporwave: { theme: vaporwaveTheme, ProfileLayout: VaporwaveProfileLayout, ItemCard: VaporwaveItemCard, ProfileHeader: VaporwaveProfileHeader },
  brutalist: { theme: brutalistTheme, ProfileLayout: BrutalistProfileLayout, ItemCard: BrutalistItemCard, ProfileHeader: BrutalistProfileHeader },
  grunge: { theme: grungeTheme, ProfileLayout: GrungeProfileLayout },
  cyberpunk: { theme: cyberpunkTheme, ProfileLayout: CyberpunkProfileLayout }
};
` }
];

directories.forEach(dir => {
  const fullPath = path.join(SRC_DIR, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${fullPath}`);
  }
});

files.forEach(file => {
  const fullPath = path.join(SRC_DIR, file.path);
  if (!fs.existsSync(fullPath)) {
    // Only unescape newlines if it wasn't done natively by json decode for node string literals.
    fs.writeFileSync(fullPath, file.content.replace(/\\\\n/g, '\\n'));
    console.log(`Created file: ${fullPath}`);
  }
});
