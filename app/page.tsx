/**
 * app/page.tsx
 * -------------------------------------------------------------------------
 * Home page — the single route of the portfolio.
 *  - One continuous narrative: curiosity → tools → projects → process → talk.
 *    SectionBridges hand the story from one section to the next so the page
 *    reads as a thread, not a stack of blocks.
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
import ContactSection from "@/components/sections/ContactSection";
import SectionBridge from "@/components/ui/SectionBridge";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionBridge>it starts with curiosity</SectionBridge>
        <About />
        <SectionBridge>curiosity, sharpened into tools</SectionBridge>
        <Skills />
        <SectionBridge>tools, turned into things I shipped</SectionBridge>
        <Projects />
        <SectionBridge>and this is how I build them</SectionBridge>
        <BuildStory />
        <SectionBridge>so — let&apos;s build something</SectionBridge>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
