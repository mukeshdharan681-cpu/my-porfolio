import { useState } from "react";
import { Check, Star, ShieldAlert, Cpu, Terminal, Sparkles, Languages } from "lucide-react";
import { skillGroups, languages } from "../data";

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-16 bg-[#fafafa] border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#008080] font-bold block mb-2">
              TECHNICAL EXPERTISE
            </span>
            <h2 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
              Skills & Core Proficiencies
            </h2>
          </div>
          <p className="text-slate-500 text-xs font-mono max-w-xs leading-relaxed">
            Hover over any technical node to view subskills, utilities, and associated methodologies.
          </p>
        </div>

        {/* Dynamic Skill Group Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillGroups.map((group, gIdx) => (
            <div 
              key={gIdx} 
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-100">
                {gIdx === 0 && <Terminal className="w-4 h-4 text-teal-600" />}
                {gIdx === 1 && <Cpu className="w-4 h-4 text-indigo-600" />}
                {gIdx === 2 && <Sparkles className="w-4 h-4 text-amber-600" />}
                <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-800">
                  {group.category}
                </h3>
              </div>

              <div className="space-y-6">
                {group.skills.map((skill, sIdx) => {
                  const isHovered = hoveredSkill === skill.name;

                  return (
                    <div 
                      key={sIdx}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="space-y-2 relative group"
                    >
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 font-display flex items-center gap-1.5 label-hover">
                            {skill.name}
                            <span className="text-[10px] font-mono py-0.5 px-1.5 rounded-full bg-teal-50 text-teal-700 font-bold border border-teal-100">
                              {skill.level}
                            </span>
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          {skill.years} Yrs Exp
                        </span>
                      </div>

                      {/* Profiency progress slider bar */}
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            skill.level === "Expert" 
                              ? "bg-teal-600 w-full" 
                              : "bg-indigo-500 w-[85%]"
                          }`} 
                        />
                      </div>

                      {/* Subskills chips display with stagger animations */}
                      <div className="flex flex-wrap gap-1 pt-1 opacity-75 group-hover:opacity-100 transition-opacity">
                        {skill.subskills.map((sub, key) => (
                          <span 
                            key={key} 
                            className="text-[10px] font-mono bg-slate-50 border border-slate-150 text-slate-500 rounded py-0.5 px-1.5 hover:border-slate-300 hover:text-slate-800 transition-colors"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Languages Section Widget */}
        <div className="mt-12 bg-slate-900 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
          {/* Subtle grid background to keep alignment premium */}
          <div className="absolute inset-0 grid-bg-dark opacity-10 pointer-events-none" />
          
          <div className="flex items-center gap-4 relative z-10">
            <span className="bg-slate-800 p-3 rounded-xl border border-slate-700">
              <Languages className="w-6 h-6 text-teal-400" />
            </span>
            <div>
              <h3 className="font-display font-medium text-lg text-white">Linguistic Proficiencies</h3>
              <p className="text-slate-400 text-xs">Primary spoken, written, and technical documentation languages</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 relative z-10 w-full md:w-auto justify-center">
            {languages.map((lang, idx) => (
              <div 
                key={idx} 
                className="bg-slate-800/80 border border-slate-700/85 px-5 py-3 rounded-xl flex items-center gap-3"
              >
                <div className="w-2.5 h-2.5 bg-teal-400 rounded-full" />
                <div>
                  <span className="text-sm font-bold block">{lang.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono uppercase">{lang.proficiency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
