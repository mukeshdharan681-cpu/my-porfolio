import { GraduationCap, Award, BookOpen, CheckCircle, Network } from "lucide-react";
import { education } from "../data";

export default function Education() {
  return (
    <section id="education" className="py-16 bg-[#fafafa] border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-[#008080] font-bold block mb-2">
            ACADEMIC BACKGROUND
          </span>
          <h2 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
            Education & Certifications
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Education Segment Block (left) */}
          <div className="lg:col-span-8 space-y-6">
            {education.map((edu, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xs hover:shadow-xs transition-shadow"
              >
                {/* Academic logo backdrop overlay */}
                <div className="absolute right-4 bottom-4 text-slate-100 font-display font-black text-6xl pointer-events-none select-none opacity-40">
                  B.TECH
                </div>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div className="flex gap-4">
                    <div className="bg-teal-50 border border-teal-150 p-3 h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 text-teal-600">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-slate-900 leading-snug">
                        {edu.degree}
                      </h3>
                      <p className="text-sm font-semibold text-teal-700 font-sans tracking-tight pt-1">
                        {edu.institution}
                      </p>
                      <p className="text-slate-400 text-xs mt-1 leading-none">{edu.location}</p>
                    </div>
                  </div>

                  <span className="px-3 py-1 font-mono text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 rounded-md self-start md:self-auto">
                    {edu.duration}
                  </span>
                </div>

                {/* Key Program Focuses list */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400 block">
                    Curriculum Milestones & Subject Focuses
                  </span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {edu.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex gap-2.5 text-xs text-slate-600 leading-relaxed font-sans">
                        <BookOpen className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats sidebar detailing his Specialization Achievements (right) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 relative overflow-hidden border border-slate-850">
              <div className="absolute right-0 top-0 opacity-10 font-mono text-[100px] leading-none pointer-events-none text-white font-black">
                AI
              </div>
              
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-teal-400 mb-4 flex items-center gap-2">
                <Network className="w-4 h-4 text-teal-400" />
                Undergrad Specialization
              </h4>

              <div className="space-y-4">
                <div className="border-l-2 border-teal-500 pl-3">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">CORE FOCUS</span>
                  <span className="text-xs font-semibold text-white">Neural Networks & Deep Predictive Models</span>
                </div>
                
                <div className="border-l-2 border-teal-500 pl-3">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">PROGRAMMING BASE</span>
                  <span className="text-xs font-semibold text-white">Scientific Python & Data Structuring in C</span>
                </div>

                <div className="border-l-2 border-teal-500 pl-3">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">PRACTICAL INTEGRATIONS</span>
                  <span className="text-xs font-semibold text-white">Query Optimizations & ETL Pipelines</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
