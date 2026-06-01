import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
import { siteConfig } from "../siteConfig";
import { GitHub, LinkedIn, Itch, Envelope, ChevronRight, Terminal, Copy, Check, X } from "../components/Icons/icons.jsx";

// Terminal Form Component
const TerminalContactForm = () => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  // --- CONFIGURATION REQUIRED ---
  // You will need to set these up in an .env file or replace them directly.
  // SERVICE_ID: 'service_xxxx'
  // TEMPLATE_ID: 'template_xxxx'
  // PUBLIC_KEY: 'xxxxxxx'
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

  const steps = [
    { label: "IDENT_USER", placeholder: "enter your name...", key: "name" },
    { label: "RETURN_PATH", placeholder: "enter your email...", key: "email" },
    { label: "MSG_CONTENT", placeholder: "what's on your mind?", key: "message" }
  ];

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [step]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const currentKey = steps[step].key;
    const updatedData = { ...formData, [currentKey]: input };
    setFormData(updatedData);
    setInput("");

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      setError(null);
      
      try {
        // Send the email via EmailJS
        // Map your form data to your EmailJS template variables here
        const templateParams = {
          from_name: updatedData.name,
          from_email: updatedData.email,
          message: updatedData.message,
          to_name: siteConfig.name,
        };

        const result = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );

        if (result.status === 200) {
          setIsDone(true);
        } else {
          throw new Error("UNEXPECTED_STATUS_CODE");
        }
      } catch (err) {
        console.error("Transmission Failure:", err);
        setError("UPLINK_FAILURE: " + (err.text || err.message || "UNKNOWN_ERROR"));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isDone) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="font-mono text-(--accent) p-6 border border-(--accent)/30 bg-black/20 rounded-lg"
      >
        <div className="mb-2">> TRANSMISSION_SUCCESSFUL</div>
        <div className="mb-4">> DATA_PACKET_QUEUED_FOR_REVIEW</div>
        <button 
          onClick={() => { setStep(0); setIsDone(false); setFormData({ name: "", email: "", message: "" }); }}
          className="text-xs border border-(--accent) px-2 py-1 hover:bg-(--accent) hover:text-black transition-colors"
        >
          RESET_TERMINAL
        </button>
      </motion.div>
    );
  }

  return (
    <div className="font-mono bg-black/40 border border-(--bordercolor) p-6 rounded-lg shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 border-b border-(--bordercolor) pb-2 opacity-50">
        <span className="text-xs">SECURE_CHANNEL_V4.1</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-(--muted) opacity-60">// INITIALIZING_UPLINK...</div>
        <div className="text-(--muted) opacity-60">// CONNECTION_ESTABLISHED</div>
        
        {/* Previous Steps */}
        {steps.slice(0, step).map((s, i) => (
          <div key={i}>
            <span className="text-(--accent)">> {s.label}:</span>
            <span className="ml-2 text-(--text)">{formData[s.key]}</span>
          </div>
        ))}

        {/* Current Step */}
        {!isSubmitting && !error && (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-(--accent) whitespace-nowrap">> {steps[step].label}:</label>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={steps[step].placeholder}
              className="bg-transparent border-none outline-none text-(--text) flex-1 min-w-0 placeholder:opacity-30"
            />
          </form>
        )}

        {isSubmitting && (
          <div className="text-(--accent) animate-pulse">
            > ENCRYPTING_AND_TRANSMITTING...
          </div>
        )}

        {error && (
          <div className="space-y-4">
            <div className="text-red-500 font-bold">> {error}</div>
            <button 
              onClick={() => { setError(null); }}
              className="text-xs border border-red-500 text-red-500 px-2 py-1 hover:bg-red-500 hover:text-black transition-colors"
            >
              RETRY_PROTOCOL
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("ONLINE");

  useEffect(() => {
    // Basic logic for Online/Idle based on hour (9 AM to 11 PM)
    const hour = new Date().getHours();
    if (hour >= 23 || hour < 8) {
      setStatus("SYSTEM_IDLE");
    } else {
      setStatus("ONLINE");
    }
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { 
      name: "GitHub", 
      url: siteConfig.socials.github, 
      tag: "CODE_REPOSITORY", 
      description: "Explore my source logs", 
      icon: <GitHub className="w-6 h-6" /> 
    },
    { 
      name: "LinkedIn", 
      url: siteConfig.socials.linkedin, 
      tag: "PROFESSIONAL_NETWORK", 
      description: "Establish a direct link", 
      icon: <LinkedIn className="w-6 h-6" /> 
    },
    { 
      name: "Itch.io", 
      url: siteConfig.socials.itch, 
      tag: "STATION_GAMES", 
      description: "Playtest my simulations", 
      icon: <Itch className="w-6 h-6" /> 
    },
  ];

  return (
    <div className="py-20 px-4 max-w-6xl mx-auto">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 border-l-4 border-(--accent) pl-6"
      >
        <h1 className="text-6xl font-bold text-(--text) tracking-tighter mb-2">
          COMM.<span className="text-(--accent)">UPLINK</span>
        </h1>
        <p className="text-xl text-(--muted) font-mono uppercase tracking-widest opacity-70">
          Establish a secure connection // PROTOCOL_V4.1
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Terminal Form */}
        <div className="lg:col-span-7 space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-2">
              <Terminal className="w-6 h-6 text-(--accent)" />
              <h2 className="text-2xl font-bold uppercase tracking-tight">Direct_Transmission</h2>
            </div>
            <p className="text-sm text-(--muted) mb-6 font-mono opacity-60">
              Send a direct message to my inbox via this terminal interface. 
              <br className="hidden sm:block" />
              For traditional mail, use the <span className="text-(--accent)">[MAIL_PROTOCOL]</span> on the right.
            </p>
            <TerminalContactForm />
          </section>

          {/* Status Message */}
          <div className="p-4 border border-(--bordercolor)/30 rounded-lg flex items-center justify-between text-sm font-mono">
            <div className="flex items-center gap-4 text-(--muted) opacity-60">
              <span className={`w-2 h-2 rounded-full animate-pulse ${status === "ONLINE" ? "bg-(--accent)" : "bg-yellow-500"}`} />
              SYSTEM_STATUS: {status}
            </div>
            <div className="text-xs opacity-30 uppercase tracking-tighter hidden sm:block">
              Location: Netherlands [UTC+1]
            </div>
          </div>
        </div>

        {/* Right Column: Nodes & Email */}
        <div className="lg:col-span-5 space-y-10">
          {/* Profile Icon */}
          <div className="flex items-center gap-5 p-5 bg-(--surface) border border-(--bordercolor) rounded-lg">
            <img
              src={siteConfig.aboutImage}
              alt={siteConfig.name}
              className="w-16 h-16 rounded-md object-contain flex-shrink-0"
            />
            <div className="font-mono">
              <div className="text-xs text-(--muted) opacity-50 uppercase tracking-widest mb-1">OPERATOR_ID</div>
              <div className="text-(--text) font-bold">{siteConfig.name}</div>
              <div className="text-xs text-(--accent) opacity-70 mt-1 uppercase tracking-tighter">{siteConfig.role}</div>
            </div>
          </div>

          {/* Enhanced Email Node */}
          <div className="space-y-4">
             <div className="flex items-center gap-3">
              <Envelope className="w-5 h-5 text-(--accent)" />
              <h2 className="text-xl font-bold uppercase tracking-tight">Mail_Protocol</h2>
            </div>
            
            <div className="bg-(--surface) border border-(--bordercolor) rounded-lg p-1 flex items-center group transition-all hover:border-(--accent)">
              <div className="flex-1 px-4 py-3 font-mono text-sm truncate opacity-80">
                {siteConfig.socials.email}
              </div>
              <button 
                onClick={copyEmail}
                className="p-3 bg-(--bg) border-l border-(--bordercolor) text-(--muted) hover:text-(--accent) transition-colors relative"
                title="Copy to clipboard"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Copy className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
                {copied && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-(--accent) text-black text-[10px] font-bold px-2 py-1 rounded">
                    COPIED
                  </div>
                )}
              </button>
              <a 
                href={`mailto:${siteConfig.socials.email}`}
                className="p-3 bg-(--accent) text-(--accent-text) hover:bg-(--accent-hover) transition-colors rounded-r-md"
                title="Open in mail app"
              >
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Social Nodes */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <GitHub className="w-5 h-5 text-(--accent-secondary)" />
              <h2 className="text-xl font-bold uppercase tracking-tight">Global_Nodes</h2>
            </div>

            <div className="flex flex-col gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 10, borderColor: "var(--accent-secondary)" }}
                  className="flex items-center gap-5 p-5 bg-(--surface) border border-(--bordercolor) rounded-lg group transition-all"
                >
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-(--bg) border border-(--bordercolor) rounded-md text-(--muted) group-hover:text-(--accent-secondary) transition-colors">
                    {social.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono text-(--muted) opacity-50 uppercase tracking-tighter">{social.tag}</span>
                    </div>
                    <h3 className="text-lg font-bold text-(--text) group-hover:text-(--accent-secondary) transition-colors">
                      {social.name}
                    </h3>
                  </div>
                  <ChevronRight className="w-4 h-4 text-(--bordercolor) group-hover:text-(--accent-secondary) transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
