import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Stack } from "@/components/sections/Stack";
import { Projects } from "@/components/sections/Projects";
import { Timeline } from "@/components/sections/Timeline";
import { Services } from "@/components/sections/Services";
import { GitHubActivity } from "@/components/sections/GitHubActivity";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";

export default function Inicio() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main id="contenido">
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Timeline />
        <Services />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
