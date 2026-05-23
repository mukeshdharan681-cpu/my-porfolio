import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, CheckCircle, Send, MessageSquare, Briefcase, FileCheck, ArrowUpRight } from "lucide-react";
import { personalInfo } from "../data";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    roleType: "Full-Time Hiring",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 850);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      org: "",
      roleType: "Full-Time Hiring",
      message: ""
    });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Side (left) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#008080] font-bold block mb-2">
                GET IN TOUCH
              </span>
              <h2 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
                Establish Connection
              </h2>
              <p className="text-slate-600 text-xs font-sans mt-3 leading-relaxed">
                Open to full-time roles, strategic analytics consulting contracts, and technical data pipeline optimizations worldwide.
              </p>
            </div>

            {/* Direct Details Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-5">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                Direct Coordinates
              </span>

              {/* Email Row */}
              <a 
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3.5 group"
              >
                <div className="bg-white border border-slate-200 text-slate-500 p-2.5 rounded-lg group-hover:bg-teal-50 group-hover:border-teal-200 group-hover:text-teal-700 transition-all flex-shrink-0 shadow-2xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-mono text-slate-400 block uppercase font-medium">LOBBY EMAIL</span>
                  <span className="text-xs font-mono font-semibold text-slate-700 group-hover:text-[#008080] transition-colors truncate block">{personalInfo.email}</span>
                </div>
              </a>

              {/* Phone Row */}
              <a 
                href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3.5 group"
              >
                <div className="bg-white border border-slate-200 text-slate-500 p-2.5 rounded-lg group-hover:bg-teal-50 group-hover:border-teal-200 group-hover:text-teal-700 transition-all flex-shrink-0 shadow-2xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-400 block uppercase font-medium">SECURE VOICE</span>
                  <span className="text-xs font-mono font-semibold text-slate-700 transition-colors block">{personalInfo.phone}</span>
                </div>
              </a>

              {/* Location Row */}
              <div className="flex items-center gap-3.5">
                <div className="bg-white border border-slate-200 text-slate-500 p-2.5 rounded-lg flex-shrink-0 shadow-2xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-400 block uppercase font-medium">GEOGRAPHY BASE</span>
                  <span className="text-xs font-sans font-semibold text-slate-700 block">{personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Pitch Callout */}
            <div className="bg-teal-50/50 border border-teal-100 rounded-xl p-4 text-xs text-teal-950 font-sans leading-relaxed flex gap-3">
              <FileCheck className="w-5 h-5 text-[#008080] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Recruiter Fast-Track Protocol</span>
                Once the form submission matches parameters, a secure JSON summary of credentials will be automatically compiled and dispatched.
              </div>
            </div>
          </div>

          {/* Form Side (right) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs relative">
              
              {isSubmitted ? (
                /* Success Slate */
                <div className="py-12 text-center space-y-6 animate-fadeIn">
                  <div className="w-14 h-14 bg-teal-50 border border-teal-150 text-teal-600 rounded-full flex items-center justify-center mx-auto shadow-2xs">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-slate-900">Form Captured & Simulated</h3>
                    <p className="text-slate-600 text-xs font-sans max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-slate-800">{formData.name}</strong>. Your pipeline simulation executed cleanly. Here is your structured request packet:
                    </p>
                  </div>

                  {/* Simulated Sent JSON Packet */}
                  <div className="bg-slate-950 text-slate-300 p-4 rounded-xl text-left border border-slate-900 max-w-sm mx-auto">
                    <span className="text-[9px] font-mono text-slate-500 uppercase block mb-1">STDOUT DATA PACKET</span>
                    <pre className="text-[10px] font-mono leading-relaxed text-teal-400 whitespace-pre-wrap">
{JSON.stringify({
  sender: formData.name,
  origin: formData.org || "Independent",
  type: formData.roleType,
  relay_status: "SUCCESS_SIMULATED",
  time_utc: new Date().toISOString()
}, null, 2)}
                    </pre>
                  </div>

                  <button
                    onClick={handleReset}
                    className="mt-4 px-4 py-2 text-xs font-mono font-semibold hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-lg transition-colors cursor-pointer"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                /* Interactive Form UI */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                    <MessageSquare className="w-4 h-4 text-slate-400" />
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-800">
                      Discourse & Inquiry Portal
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full text-xs py-2 px-3 border border-slate-200 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-700">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="johndoe@organization.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-xs py-2 px-3 border border-slate-200 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Organization info */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-700">Company / Organization</label>
                      <input
                        type="text"
                        placeholder="Enterprise Solutions inc."
                        value={formData.org}
                        onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                        className="w-full text-xs py-2 px-3 border border-slate-200 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                      />
                    </div>

                    {/* Role Type Dropdown */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-700">Subject of Inquiry</label>
                      <select
                        value={formData.roleType}
                        onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                        className="w-full text-xs py-2 px-3 border border-slate-200 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none bg-white"
                      >
                        <option>Full-Time Hiring</option>
                        <option>Contract Consulting</option>
                        <option>Project Partnership</option>
                        <option>General Discourse</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">Formulate Inquiry *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Input message requirements here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full text-xs py-2 px-3 border border-slate-200 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none font-sans"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#008080] hover:bg-teal-700 text-slate-950 font-mono font-bold text-xs py-2.5 px-4 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      "TRANSCRIPTION IN PROGRESS..."
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>DISPATCH PACKET</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
