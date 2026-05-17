import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, AlertCircle } from "lucide-react";
import { PageShell } from "@/components/app/PageShell";
import { chatWithStylistFn } from "@/server/gemini";

export const Route = createFileRoute("/app/chat")({
  head: () => ({ meta: [{ title: "AI Stylist — MirrorMind AI" }] }),
  component: Chat,
});

type Msg = { role: "user" | "ai"; text: string };

function Chat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    
    const newMessages = [...messages, { role: "user" as const, text }];
    setMessages(newMessages);
    setInput("");
    setTyping(true);

    try {
      const result = await chatWithStylistFn({ data: newMessages });
      setMessages([...newMessages, { role: "ai", text: result.text }]);
    } catch (err) {
      setMessages([...newMessages, { role: "ai", text: "Neural link disrupted. I cannot process your request right now." }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <PageShell title="AI Stylist" subtitle="/ personal assistant">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        <div className="glass-card rounded-3xl flex flex-col h-[70vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyan/5 pointer-events-none" />
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth z-10">
            <AnimatePresence>
              {messages.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto"
                >
                  <div className="size-16 rounded-full bg-cyan/10 grid place-items-center mb-6 ring-1 ring-cyan/20 neon-cyan relative">
                    <Sparkles className="size-6 text-cyan" />
                    <div className="absolute inset-0 rounded-full border border-cyan/40 animate-ping opacity-30" />
                  </div>
                  <p className="font-serif italic text-2xl">Awaiting connection...</p>
                  <p className="text-sm text-muted-foreground mt-2">I'm scanning your wardrobe and today's street feeds. What occasion are we styling for?</p>
                </motion.div>
              )}
            </AnimatePresence>

            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
              >
                {m.role === "ai" && (
                  <div className="size-8 shrink-0 rounded-full bg-gradient-to-br from-cyan to-magenta p-px">
                    <div className="size-full rounded-full bg-background grid place-items-center">
                      <Sparkles className="size-3.5 text-cyan" />
                    </div>
                  </div>
                )}
                <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user" ? "bg-cyan text-background rounded-br-sm shadow-[0_0_15px_rgba(34,211,238,0.2)]" : "bg-white/5 text-foreground rounded-bl-sm ring-1 ring-white/10"
                }`}>
                  {m.text}
                </div>
              </motion.div>
            ))}
            
            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 items-center">
                <div className="size-8 rounded-full bg-gradient-to-br from-cyan to-magenta p-px">
                  <div className="size-full rounded-full bg-background grid place-items-center"><Sparkles className="size-3.5 text-cyan" /></div>
                </div>
                <div className="flex gap-1.5 px-5 py-4 bg-white/5 rounded-2xl ring-1 ring-white/10 rounded-bl-sm">
                  <span className="size-1.5 rounded-full bg-cyan animate-pulse" />
                  <span className="size-1.5 rounded-full bg-cyan animate-pulse" style={{ animationDelay: "150ms" }} />
                  <span className="size-1.5 rounded-full bg-cyan animate-pulse" style={{ animationDelay: "300ms" }} />
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="p-4 z-10 bg-background/50 backdrop-blur-xl border-t border-white/5">
            <div className="relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                disabled={typing}
                placeholder="Ask your stylist anything…"
                className="w-full bg-white/[0.03] border border-white/10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-cyan/40 px-5 py-4 rounded-full transition disabled:opacity-50"
              />
              <button 
                onClick={send} 
                disabled={typing || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 size-10 rounded-full bg-cyan text-background grid place-items-center neon-cyan disabled:opacity-50 disabled:shadow-none transition"
              >
                <Send className="size-4 ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-5">
            <p className="text-[10px] font-mono uppercase tracking-widest text-magenta mb-3 flex items-center gap-2">
              <Sparkles className="size-3" /> quick prompts
            </p>
            <div className="space-y-2">
              {[
                "Outfit for hackathon demo", 
                "What suits cool undertone?", 
                "Dress like a K-drama lead", 
                "Build a capsule for travel"
              ].map((p) => (
                <button 
                  key={p} 
                  onClick={() => setInput(p)} 
                  className="w-full text-left text-xs px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-transparent hover:border-white/10 transition group flex justify-between items-center"
                >
                  {p}
                  <AlertCircle className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                </button>
              ))}
            </div>
          </div>
          <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute right-0 top-0 p-4 opacity-10"><Sparkles className="size-12 text-cyan" /></div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-cyan mb-2">/ context loaded</p>
            <p className="text-xs text-muted-foreground leading-relaxed relative z-10">
              Stylist is reading your aesthetic DNA, saved looks, wardrobe inventory, and live trend feed. All inputs are optimized for maximum wow-factor.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
