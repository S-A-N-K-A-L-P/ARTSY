export const dynamic = "force-dynamic";

import HeroSection from "@/components/portfolio/HeroSection";
import MottoSection from "@/components/portfolio/MottoSection";
import CreatorStories from "@/components/portfolio/CreatorStories";
import FeaturedCreators from "@/components/portfolio/FeaturedCreators";
import TrendingAesthetics from "@/components/portfolio/TrendingAesthetics";
import ExploreItems from "@/components/portfolio/ExploreItems";
import AestheticShowcase from "@/components/portfolio/AestheticShowcase";
import CommunityPosts from "@/components/portfolio/CommunityPosts";
import MarketplacePreview from "@/components/portfolio/MarketplacePreview";
import StatsSection from "@/components/portfolio/StatsSection";
import CTASection from "@/components/portfolio/CTASection";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Box } from "@mui/material";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import MobileHomePage from "./home/page";
import LoginPage from "./login/page";

import { redirect } from "next/navigation";

export default async function Main() {
  const session = await getServerSession(authOptions);
  
  // Universal Redirect for logged-in users
  if (session) {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    
    if (isMobile) {
      return <MobileHomePage />;
    }
    redirect('/dashboard');
  }

  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);

  if (isMobile) {
    return <LoginPage />;
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <HeroSection />
        <MottoSection />
        <CreatorStories />
        <FeaturedCreators />
        <TrendingAesthetics />
        <ExploreItems />
        <AestheticShowcase />
        <CommunityPosts />
        <MarketplacePreview />
        <StatsSection />
        <CTASection />
      </Box>

      <Footer />
    </Box>
  );
}
