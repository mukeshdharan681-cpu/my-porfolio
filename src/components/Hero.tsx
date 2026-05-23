import { SVGProps } from "react";
import { Mail, Phone, MapPin, Download, ChevronDown, Linkedin, Github } from "lucide-react";
import { personalInfo } from "../data";

export default function Hero() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="hero" className="relative w-full border-b border-slate-200 overflow-hidden bg-[#fafafa]">
      {/* Visual Background grid element matching technical designer theme */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative flex flex-col justify-between min-h-[500px]">
        {/* Top bar with quick buttons */}
        <div className="flex justify-between items-center w-full mb-12">
          {/* Status ticker */}
          <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-mono font-bold bg-teal-50 border border-teal-150 text-teal-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Empowering Decision-Making with Data
          </span>

          {/* Social and print actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              aria-label="Print or Save Resume PDF"
              className="group flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-400 rounded-lg bg-white transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Hero Central Header */}
        <div className="max-w-3xl space-y-6">
          <span className="text-xs uppercase font-mono tracking-widest text-[#008080] font-bold block">
            DATA PORTFOLIO & PROFESSIONAL PROFILE
          </span>
          
          <h1 className="font-display text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Mukesh Dharan
          </h1>
          
          <p className="font-display text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl">
            A skilled <span className="text-[#008080] font-semibold border-b-2 border-teal-200 pb-0.5">Data Analyst & AI Specialist</span> with over 5 years of experience delivering predictive logic, cleaning transaction metrics, and designing corporate executive intelligence.
          </p>

          {/* Ticker Contact Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-8 pt-8 border-t border-slate-200">
            <a 
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-3 group border border-transparent hover:border-slate-200 p-2 rounded-lg hover:bg-white transition-all"
            >
              <span className="bg-slate-100 text-slate-700 p-2 rounded-md group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors">
                <Mail className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">EMAIL CONTACT</span>
                <span className="text-xs font-mono text-slate-700 hover:text-[#008080] font-medium break-all">{personalInfo.email}</span>
              </div>
            </a>

            <a 
              href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-3 group border border-transparent hover:border-slate-200 p-2 rounded-lg hover:bg-white transition-all"
            >
              <span className="bg-slate-100 text-slate-700 p-2 rounded-md group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors">
                <Phone className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">PHONE LINE</span>
                <span className="text-xs font-mono text-slate-700 font-medium">{personalInfo.phone}</span>
              </div>
            </a>

            <div className="flex items-center gap-3 border border-transparent p-2 rounded-lg">
              <span className="bg-slate-100 text-slate-700 p-2 rounded-md">
                <MapPin className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">LOCATION BASE</span>
                <span className="text-xs font-sans text-slate-700 font-medium">{personalInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer anchors */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-12 text-slate-400 text-xs font-mono">
          <div className="flex items-center gap-4">
            <a href="#showcase" className="text-slate-600 hover:text-teal-700 font-semibold tracking-tight transition-all flex items-center gap-1.5 group">
              Explore Showcase Sandbox
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Scroll for Timeline</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-slate-500" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
