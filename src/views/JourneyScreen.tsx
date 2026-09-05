import React, { useState } from 'react';
import { TIMELINE_ITEMS, SPECIALIZATIONS } from '../data/portfolioData';

export const JourneyScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 800);
  };

  return (
    <section id="journey" className="py-20 px-6 lg:px-16 max-w-7xl mx-auto scroll-mt-20">
      {/* Journey Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#302922] border border-[#7B5E3C]/50 mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#ffb86e] animate-pulse" />
          <span className="font-label-uppercase text-xs text-[#FBE9B3] tracking-widest font-semibold">
            05 / CHRONOLOGY & EVOLUTION
          </span>
        </div>
        <h1 className="font-headline-xl text-4xl sm:text-6xl text-[#FBE9B3] tracking-tight font-bold mb-4">
          The Journey So Far
        </h1>
        <p className="font-body-lg text-base sm:text-lg text-[#d7c3b2] max-w-2xl leading-relaxed">
          A trajectory forged through rigorous academic discipline, competitive engineering
          challenges, and forward-looking autonomous systems.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 sm:pl-10 border-l border-[#7B5E3C]/40 space-y-10 mb-20 ml-2 sm:ml-4">
        {TIMELINE_ITEMS.map((item, idx) => {
          const isLatest = idx === TIMELINE_ITEMS.length - 1;
          return (
            <div key={item.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-1 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                  isLatest
                    ? 'bg-[#ffb86e] border-[#ffb86e] shadow-lg shadow-[#ffb86e]/30 scale-125'
                    : 'bg-[#18120c] border-[#7B5E3C] group-hover:border-[#ffb86e]'
                }`}
              />

              <div className="bg-[#18120c] border border-[#7B5E3C]/40 p-6 sm:p-7 rounded-xl hover:border-[#7B5E3C] transition-all shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <span className="font-label-uppercase text-xs text-[#ffb86e] tracking-widest font-semibold">
                    {item.step}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[11px] font-label-uppercase tracking-wider border ${
                      item.statusType === 'current'
                        ? 'bg-[#ffb86e]/20 text-[#ffb86e] border-[#ffb86e]/40 font-bold'
                        : item.statusType === 'completed'
                        ? 'bg-[#78d1fd]/10 text-[#78d1fd] border-[#78d1fd]/30'
                        : 'bg-[#251e18] text-[#d7c3b2] border-[#7B5E3C]/30'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h2 className="font-headline-md text-xl sm:text-2xl text-[#FBE9B3] font-bold mb-2">
                  {item.title}
                </h2>

                <p className="font-body-md text-sm sm:text-base text-[#d7c3b2] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Domains / Specializations */}
      <div className="mb-20">
        <div className="mb-8">
          <span className="font-label-uppercase text-xs text-[#9f8e7e] tracking-widest block mb-2 font-semibold">
            CORE DISCIPLINES
          </span>
          <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#FBE9B3] font-bold tracking-tight">
            Active Domains & Engineering Tracks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPECIALIZATIONS.map((spec) => (
            <div
              key={spec.title}
              className="bg-[#18120c] border border-[#7B5E3C]/40 p-6 sm:p-7 rounded-xl flex flex-col justify-between hover:border-[#7B5E3C] transition-colors shadow-lg"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#251e18] border border-[#7B5E3C]/40 flex items-center justify-center text-[#ffb86e] mb-4">
                  <span className="material-symbols-outlined text-xl">{spec.icon}</span>
                </div>
                <h3 className="font-headline-md text-xl text-[#FBE9B3] font-bold mb-3">
                  {spec.title}
                </h3>
                <p className="font-body-md text-sm text-[#d7c3b2] leading-relaxed mb-6">
                  {spec.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#7B5E3C]/20">
                {spec.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 bg-[#251e18] text-[#ffb86e] rounded text-xs font-label-uppercase tracking-wider border border-[#7B5E3C]/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="border-t border-[#7B5E3C]/30 pt-16 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Links & Narrative */}
          <div className="lg:col-span-6">
            <span className="font-label-uppercase text-xs text-[#ffb86e] tracking-widest block mb-2 font-semibold">
              COMMUNICATIONS
            </span>
            <h2 className="font-headline-lg text-3xl sm:text-5xl text-[#FBE9B3] font-bold mb-6 tracking-tight">
              HAVE AN IDEA?<br />LET'S BUILD IT.
            </h2>
            <p className="font-body-md text-base text-[#d7c3b2] leading-relaxed mb-8 max-w-lg">
              Whether you're looking to collaborate on cutting-edge AI research, build a scalable web
              application, or discuss high-impact technical challenges—my inbox is open.
            </p>

            {/* Quick Links */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl border border-[#7B5E3C] hover:border-[#ffb86e] text-[#eee0d5] hover:text-[#ffb86e] text-xs font-label-uppercase tracking-wider flex items-center justify-center gap-2 transition-all bg-[#18120c]"
              >
                <span className="material-symbols-outlined text-base">code</span>
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl border border-[#7B5E3C] hover:border-[#ffb86e] text-[#eee0d5] hover:text-[#ffb86e] text-xs font-label-uppercase tracking-wider flex items-center justify-center gap-2 transition-all bg-[#18120c]"
              >
                <span className="material-symbols-outlined text-base">share</span>
                LinkedIn
              </a>
              <a
                href="mailto:saivarshith@example.com"
                className="px-5 py-3 rounded-xl border border-[#7B5E3C] hover:border-[#ffb86e] text-[#eee0d5] hover:text-[#ffb86e] text-xs font-label-uppercase tracking-wider flex items-center justify-center gap-2 transition-all bg-[#18120c]"
              >
                <span className="material-symbols-outlined text-base">mail</span>
                Email
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form Card */}
          <div className="lg:col-span-6 bg-[#18120c] border border-[#7B5E3C]/50 p-6 sm:p-8 rounded-xl shadow-2xl">
            <h3 className="font-headline-md text-2xl text-[#FBE9B3] font-bold mb-2">
              Send a Message
            </h3>
            <p className="font-body-sm text-xs text-[#9f8e7e] mb-6 font-label-uppercase tracking-wider">
              DIRECT DISPATCH TO SAI VARSHITH
            </p>

            {submitted ? (
              <div className="bg-[#211a14] border border-[#ffb86e]/40 p-6 rounded-xl text-center animate-in fade-in duration-300">
                <span className="w-12 h-12 rounded-full bg-[#ffb86e]/20 text-[#ffb86e] flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-2xl">check</span>
                </span>
                <h4 className="font-headline-md text-xl text-[#FBE9B3] font-bold mb-2">
                  Inquiry Transmitted
                </h4>
                <p className="text-sm text-[#d7c3b2] mb-6">
                  Thank you for reaching out. Sai Varshith will review your message and reply promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-[#251e18] hover:bg-[#302922] text-[#ffb86e] text-xs font-label-uppercase rounded-lg border border-[#7B5E3C]/40 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-label-uppercase text-[#d7c3b2] mb-2 tracking-wider">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-[#211a14] border border-[#7B5E3C]/50 rounded-xl px-4 py-3 text-sm text-[#eee0d5] placeholder-[#9f8e7e]/50 focus:outline-none focus:border-[#ffb86e] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-label-uppercase text-[#d7c3b2] mb-2 tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@organization.com"
                    className="w-full bg-[#211a14] border border-[#7B5E3C]/50 rounded-xl px-4 py-3 text-sm text-[#eee0d5] placeholder-[#9f8e7e]/50 focus:outline-none focus:border-[#ffb86e] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-label-uppercase text-[#d7c3b2] mb-2 tracking-wider">
                    Project Scope / Inquiry
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, research idea, or collaboration..."
                    className="w-full bg-[#211a14] border border-[#7B5E3C]/50 rounded-xl px-4 py-3 text-sm text-[#eee0d5] placeholder-[#9f8e7e]/50 focus:outline-none focus:border-[#ffb86e] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#E49A48] hover:bg-[#F5C972] disabled:opacity-50 text-[#2c1600] py-3.5 rounded-xl font-label-uppercase text-xs font-bold tracking-wider transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#E49A48]/15"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#2c1600] border-t-transparent rounded-full animate-spin" />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      Transmit Inquiry
                      <span className="material-symbols-outlined text-sm">send</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
