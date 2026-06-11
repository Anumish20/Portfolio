/**
 * app/page.tsx
 * -------------------------------------------------------------------------
 * Home page — the single route of the portfolio.
 *  - Composes the sections in deliberate narrative order:
 *    Hero → About → Skills → Projects → Interests → Contact.
 *  - Navbar/Footer frame the content; the <main> holds the story.
 *  Server Component: each section manages its own client interactivity.
 * -------------------------------------------------------------------------
 */

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import BuildStory from "@/components/sections/BuildStory";
import Interests from "@/components/sections/Interests";
import ContactSection from "@/components/sections/ContactSection";
import BehindTheScenes from "@/components/ui/BehindTheScenes";
import ProfileReveal from "@/components/ui/ProfileReveal";
import RecruiterMode from "@/components/ui/RecruiterMode";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <BuildStory />
        <Interests />
        <ContactSection />
      </main>
      <Footer />
      <BehindTheScenes />

      {/* App-wide overlays, opened from the navbar via the UI event bus. */}
      <ProfileReveal />
      <RecruiterMode />
    </>
  );
}
