import { Quote, Flame, Shield, Award } from "lucide-react";
import { professionalSummary } from "../data";

export default function Summary() {
  const highlights = [
    {
      icon: <Award className="w-5 h-5 text-teal-600" />,
      title: "15% Revenue Lift Model",
      desc: "Success driving predictive forecasting models with a recorded lift of 15% in retail sales metrics."
    },
    {
      icon: <Flame className="w-5 h-5 text-indigo-600" />,
      title: "Data Pipeline Veracity",
      desc: "Automated ETL staging logic to filter invalid out-of-bounds metrics, preserving integrity."
    },
    {
      icon: <Shield className="w-5 h-5 text-emerald-600" />,
      title: "C-Level Dashboards",
      desc: "Designed extensive report sets in Tableau and Power BI simplifying corporate KPI tracking."
    }
  ];

  return (
    <section id="summary" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Block: Summary Content */}
          <div className="lg:col-span-12">
            <span className="text-xs uppercase font-mono tracking-widest text-[#008080] font-bold block mb-2">
              EXECUTIVE BRIEF
            </span>
            <h2 className="font-display text-3xl font-bold text-slate-900 tracking-tight mb-6">
              Professional Summary
            </h2>
            
            {/* Styled Pull-Quote block */}
            <div className="relative pl-6 border-l-4 border-teal-500 my-8">
              <Quote className="absolute -top-4 -left-3 w-8 h-8 text-teal-500/10 -scale-x-100" />
              <p className="text-slate-700 text-lg leading-relaxed font-sans font-medium italic">
                "{professionalSummary}"
              </p>
            </div>
          </div>
        </div>

        {/* Highlight Grid Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {highlights.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-slate-50 border border-slate-200 hover:border-slate-350 p-5 rounded-xl transition-all"
            >
              <div className="p-2 bg-white border border-slate-150 inline-block rounded-lg mb-4 shadow-2xs">
                {item.icon}
              </div>
              <h4 className="font-display text-sm font-bold text-slate-900 mb-2">{item.title}</h4>
              <p className="text-slate-600 text-xs leading-relaxed font-sans">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
