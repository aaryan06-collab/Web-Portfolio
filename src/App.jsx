import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Leadership from './components/Leadership';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import TechnicalTraining from './components/TechnicalTraining';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NeuralBackground from './components/NeuralBackground';
import ScrollProgress from './components/ScrollProgress';
import LoaderSplash from './components/LoaderSplash';
import CursorSpotlight from './components/CursorSpotlight';
import ClickRipple from './components/ClickRipple';
import MarqueeTicker from './components/MarqueeTicker';
import ChatWidget from './components/ChatWidget';
import QuickNav from './components/QuickNav';

function App() {
  return (
    <div className="bg-dark min-h-screen text-gray-300 relative">
      <ScrollProgress />
      <NeuralBackground />
      <CursorSpotlight />
      <ClickRipple />
      <LoaderSplash />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <MarqueeTicker />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Leadership />
        <Projects />
        <Certifications />
        <TechnicalTraining />
        <Achievements />
        <Contact />
        <Footer />
      </div>
      <ChatWidget />
      <QuickNav />
    </div>
  );
}

export default App;
