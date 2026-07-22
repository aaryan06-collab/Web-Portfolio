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

function App() {
  return (
    <div className="bg-dark min-h-screen text-gray-300 relative">
      <NeuralBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
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
    </div>
  );
}

export default App;
