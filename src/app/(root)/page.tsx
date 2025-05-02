import Community from "@/components/home/community";
import FAQS from "@/components/home/faqs";
import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import HeroMarquee from "@/components/home/heroMarquee";
import OpenSource from "@/components/home/operSoure";

export default function Home() {
  return (
    <div>
      <Hero />
      <HeroMarquee />
      <Features />
      <Community />
      <FAQS />
      <HeroMarquee />
      <OpenSource />
    </div>
  );
}
