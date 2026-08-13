import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Impressum from "./components/Impressum";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main>
        <Hero />
        <Mission />
        <Projects />
        <Contact />
        <Impressum />
      </main>
      <Footer />
    </>
  );
}
