import { BuildInPublic } from "@/components/BuildInPublic";
import { Demo } from "@/components/Demo";
import { FAQ } from "@/components/FAQ";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { McpTeaser } from "@/components/McpTeaser";
import { Navbar } from "@/components/Navbar";
import { Pricing } from "@/components/Pricing";

export default function HomePage() {
  return (
    <div id="top">
      <Navbar />
      <main>
        <Hero />
        <Demo />
        <HowItWorks />
        <McpTeaser />
        <Features />
        <Pricing />
        <FAQ />
        <BuildInPublic />
      </main>
      <Footer />
    </div>
  );
}
