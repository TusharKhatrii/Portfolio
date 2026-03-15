"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { resumeData } from "@/data/resume";
import { Mail, Phone, Github, Linkedin, Copy, Check, ExternalLink } from "lucide-react";
import { SiLeetcode, SiWhatsapp } from "react-icons/si";

export function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const email = resumeData.personal.email.replace("mailto:", "");
  const phone = resumeData.personal.phone;

  // All 4 cards in one unified list
  const allCards = [
    {
      key: "email",
      label: "Email",
      value: email,
      icon: <Mail size={20} />,
      href: resumeData.personal.email,
      iconColor: "text-electric-cyan",
      iconBg: "bg-electric-cyan/10 border-electric-cyan/20",
      copyable: true,
    },
    {
      key: "phone",
      label: "Phone / WhatsApp",
      value: phone,
      icon: <Phone size={20} />,
      href: `tel:${phone}`,
      whatsappHref: "https://wa.me/923133776361",
      iconColor: "text-electric-cyan",
      iconBg: "bg-electric-cyan/10 border-electric-cyan/20",
      copyable: true,
    },
    {
      key: "github",
      label: "GitHub",
      value: "@TusharKhatrii",
      icon: <Github size={20} />,
      href: resumeData.personal.github,
      iconColor: "text-white",
      iconBg: "bg-white/5 border-white/10",
      copyable: false,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      value: "khatriitushar",
      icon: <Linkedin size={20} />,
      href: resumeData.personal.linkedin,
      iconColor: "text-[#0A66C2]",
      iconBg: "bg-[#0A66C2]/10 border-[#0A66C2]/20",
      copyable: false,
    },
  ];

  return (
    <section className="relative w-full py-32 px-6 sm:px-12 md:px-24 z-10" id="contact">
      <div className="max-w-6xl w-full mx-auto flex flex-col">

        {/* Header */}
        <motion.div
          className="flex flex-col w-full mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
              <span className="text-electric-cyan">CONTACT</span>
            </h2>
            <div className="h-[2px] w-full bg-gradient-to-r from-electric-cyan to-transparent flex-1" />
          </div>
          <p className="text-gray-400 font-mono text-sm mt-4">
            {">"} Open to opportunities — let's build something great together.
          </p>
        </motion.div>

        {/* Intro */}
        <motion.p
          className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          I'm currently a final-year CS student actively looking for{" "}
          <span className="text-neon-purple font-semibold">full-time</span>{" "}
          opportunities in backend engineering, cloud, and full-stack development.
        </motion.p>

        {/* Unified 2x2 grid of all 4 contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {allCards.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group flex items-center justify-between gap-4 p-5 rounded-xl border border-[#222] bg-[#0a0a0a]/70 backdrop-blur-sm hover:border-electric-cyan/40 transition-all duration-300"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg border shrink-0 ${item.iconBg} ${item.iconColor}`}>
                  {item.icon}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">{item.label}</span>
                  <a
                    href={item.href}
                    target={item.copyable ? undefined : "_blank"}
                    rel={item.copyable ? undefined : "noopener noreferrer"}
                    className="text-white font-mono text-sm hover:text-electric-cyan transition-colors mt-0.5 truncate"
                  >
                    {item.value}
                  </a>
                </div>
              </div>

              {item.copyable ? (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => copyToClipboard(item.value, item.key)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#333] bg-[#141414] text-gray-500 hover:text-electric-cyan hover:border-electric-cyan/40 transition-all text-xs font-mono"
                  >
                    {copied === item.key ? (
                      <><Check size={13} className="text-green-400" /> Copied</>
                    ) : (
                      <><Copy size={13} /> Copy</>
                    )}
                  </button>
                  {(item as any).whatsappHref && (
                    <a
                      href={(item as any).whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Chat on WhatsApp"
                      className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 hover:border-[#25D366]/60 transition-all text-base"
                    >
                      <SiWhatsapp />
                    </a>
                  )}
                </div>
              ) : (
                <ExternalLink size={15} className="text-gray-600 group-hover:text-electric-cyan transition-colors shrink-0" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
