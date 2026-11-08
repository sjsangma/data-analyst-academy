import { useCallback, useEffect, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, toggle } = useTheme();
  const [sceneReady, setSceneReady] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const onSceneReady = useCallback(() => setSceneReady(true), []);

  useEffect(() => {
    const t = setTimeout(() => setSceneReady(true), 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 2100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Preloader ready={sceneReady} />
      <Cursor />
      <Nav theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero onSceneReady={onSceneReady} started={introDone} />
        <About />
        <Projects />
        <Skills />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
