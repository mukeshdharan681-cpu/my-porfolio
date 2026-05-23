/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  TrendingUp, 
  Terminal, 
  FileText, 
  ShieldCheck, 
  Share2, 
  ArrowUp,
  Database,
  Briefcase
} from "lucide-react";
import Hero from "./components/Hero";
import Summary from "./components/Summary";
import Showcase from "./components/Showcase";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for header background styling & active link highlights
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["hero", "summary", "showcase", "skills", "experience", "education", "contact"];
      const scrollPos = window.scrollY + 120;

      for (const sect of sections) {
        const el = document.getElementById(sect);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sect);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Brief", target: "summary" },
    { label: "Showcase", target: "showcase" },
    { label: "Skills", target: "skills" },
    { label: "Experience", target: "experience" },
    { label: "Education", target: "education" },
    { label: "Inquire", target: "contact" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-500 selection:text-slate-950">
      
      {/* Editorial Sticky Header Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-55 transition-all duration-300 border-b print:hidden ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-xs border-slate-200 py-3" 
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Brand Title */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-display font-black text-sm tracking-tight transition-transform group-hover:scale-105">
              MD
            </span>
            <div className="leading-tight">
              <span className="font-display text-sm font-black text-slate-900 block tracking-tight">
                MUKESH DHARAN
              </span>
              <span className="text-[9px] font-mono font-bold text-[#008080] uppercase tracking-widest block leading-none">
                Data Analyst
              </span>
            </div>
          </a>

          {/* Desktop Navigation Link Hub */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                className={`text-xs font-mono font-bold tracking-wide transition-colors uppercase ${
                  activeSection === link.target
                    ? "text-[#008080]"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 p-1 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu content drawer */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg py-4 md:hidden flex flex-col px-6 space-y-4 animate-dropdown">
            {navLinks.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xs font-mono font-bold uppercase py-1 border-b border-slate-50 leading-loose ${
                  activeSection === link.target
                    ? "text-[#008080]"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Main Section Scrolling Stack */}
      <main className="pt-20 md:pt-0">
        
        {/* Module 1: Hero view */}
        <div id="hero">
          <Hero />
        </div>

        {/* Module 2: Professional summary briefs */}
        <div id="summary">
          <Summary />
        </div>

        {/* Module 3: Centered Interactive Data Analyst Showcase */}
        <section id="showcase" className="py-16 bg-[#fafafa] border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-6 space-y-8">
            <div className="max-w-3xl">
              <span className="text-xs uppercase font-mono tracking-widest text-[#008080] font-bold block mb-2">
                EMPIRICAL EVIDENCE
              </span>
              <h2 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
                Case Study Showcases & Models
              </h2>
            </div>
            
            {/* Live Interactive Showcase containing ML model calculations, SQL code execution simulations, Tableau/Power BI filters */}
            <Showcase />
          </div>
        </section>

        {/* Module 4: Proficiencies & grouping matrices */}
        <div id="skills">
          <Skills />
        </div>

        {/* Module 5: Chronology/Experience work blocks */}
        <div id="experience">
          <Experience />
        </div>

        {/* Module 6: Education background, focus matrices */}
        <div id="education">
          <Education />
        </div>

        {/* Module 7: Contact information, recruitment requests forms */}
        <div id="contact">
          <Contact />
        </div>

      </main>

      {/* Footer Content Branding bar */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800 print:hidden relative overflow-hidden">
        {/* Minimal grid lines in background */}
        <div className="absolute inset-0 grid-bg-dark opacity-5 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          
          {/* Logo & copyright columns */}
          <div className="space-y-3 max-w-sm">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-[#008080] text-slate-950 flex items-center justify-center font-display font-medium text-xs font-black">
                MD
              </span>
              <span className="font-display text-sm font-bold tracking-tight">
                MUKESH DHARAN
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              Designed as a professional portfolio to exhibit SQL extraction patterns, ML elastic optimization, and robust operational BI.
            </p>
            <div className="text-[10px] text-slate-500 font-mono">
              © {new Date().getFullYear()} Mukesh Dharan. All rights reserved.
            </div>
          </div>

          {/* Quick link sets */}
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div className="space-y-2 text-xs font-mono">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">DIRECTORY</span>
              <a href="#summary" className="text-slate-400 hover:text-white block transition-colors">Summary Brief</a>
              <a href="#showcase" className="text-slate-400 hover:text-white block transition-colors">Analytics Case Studies</a>
              <a href="#skills" className="text-slate-400 hover:text-white block transition-colors">Core Skills</a>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">CHRONOLOGY</span>
              <a href="#experience" className="text-slate-400 hover:text-white block transition-colors">Employment Milestones</a>
              <a href="#education" className="text-slate-400 hover:text-white block transition-colors">Academic Studies</a>
              <a href="#contact" className="text-slate-400 hover:text-white block transition-colors">Corporate Inquiry</a>
            </div>
          </div>

          {/* Scrolling back to topmost scroll offset point */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-3 bg-slate-800 hover:bg-slate-705 border border-slate-700 hover:border-slate-600 rounded-xl text-teal-400 flex items-center justify-center transition-all cursor-pointer shadow-sm group inline-flex self-start md:self-auto"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </footer>
    </div>
  );
}
