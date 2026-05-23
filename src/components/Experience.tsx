import { Calendar, Briefcase, ChevronRight, CheckCircle2 } from "lucide-react";
import { experiences } from "../data";

export default function Experience() {
  return (
    <section id="experience" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-[#008080] font-bold block mb-2">
            CHRONOLOGY OF WORK
          </span>
          <h2 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
            Professional Experience
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Five years of record utilizing database languages, mathematical algorithms, and customer-centric dashboards to maximize sales velocity and ensure metric veracity.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-slate-200 pl-6 md:pl-8 space-y-12 max-w-4xl">
          {experiences.map((exp, idx) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Indicator Hub */}
              <div className="absolute -left-12 md:-left-[43px] top-1.5 w-8 h-8 rounded-full bg-white border border-slate-300 group-hover:border-teal-500 flex items-center justify-center transition-all shadow-2xs group-hover:bg-teal-50">
                <Briefcase className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-600 transition-colors" />
              </div>

              {/* Role Title and Metadata */}
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5">
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-semibold text-teal-700 font-sans tracking-tight">
                      {exp.company}
                    </span>
                  </div>

                  {/* Duration Badge */}
                  <div className="inline-flex items-center gap-1.5 self-start md:self-auto py-1 px-2.5 rounded-md bg-slate-50 border border-slate-200 font-mono text-xs font-semibold text-slate-600">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                {/* Subtitle intro */}
                <p className="text-slate-600 text-sm font-sans leading-relaxed">
                  {exp.description}
                </p>

                {/* Detailed accomplishments bullets */}
                <ul className="space-y-3.5 pl-1">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex gap-3 text-xs text-slate-600 leading-relaxed font-sans">
                      <ChevronRight className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills used tags */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mr-1 self-center">
                    Skills deployed:
                  </span>
                  {exp.skillsTested.map((tag, key) => (
                    <span 
                      key={key} 
                      className="text-[10px] font-mono bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100 rounded px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
