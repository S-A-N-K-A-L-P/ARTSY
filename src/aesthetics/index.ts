import { theme as noirTheme, ProfileLayout as NoirProfileLayout, ItemCard as NoirItemCard, ProfileHeader as NoirProfileHeader } from "./noir";
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
