import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { PageShell } from "@/components/app/PageShell";

export const Route = createFileRoute("/app/chat")({
  head: () => ({ meta: [{ title: "AI Stylist — MirrorMind AI" }] }),
  component: Chat,
});

type Msg = { role: "user" | "ai"; text: string };

const seed: Msg[] = [
  { role: "ai", text: "Welcome back, M. I've already scanned your wardrobe and the Berlin street feeds this morning. What occasion are we styling for?" },
  { role: "user", text: "I have a product launch tonight. Want to feel sharp but unmistakably techwear." },
  { role: "ai", text: "Got it. I'd lead with the Shadow Shell J1 over a fitted black tee, Vortex slacks, Vertex chrome kicks, and one mercury chain. Confidence index lands around 94. Want me to render it on your twin?" },
];

function Chat() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: "Locked in. Let me cross-reference your saved looks and trend deltas — pulling 3 variations now." }]);
      setTyping(false);
    }, 1100);
  };

  return (
    <PageShell title="AI Stylist" subtitle="/ personal assistant">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        <div className="glass-card rounded-3xl flex flex-col h-[70vh]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
              >
                {m.role === "ai" && (
                  <div className="size-8 shrink-0 rounded-full bg-gradient-to-br from-cyan to-magenta p-px">
                    <div className="size-full rounded-full bg-background grid place-items-center">
                      <Sparkles className="size-3.5 text-cyan" />
                    </div>
                  </div>
                )}
                <div className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user" ? "bg-cyan text-background rounded-br-sm" : "bg-white/5 text-foreground rounded-bl-sm ring-1 ring-white/5"
                }`}>{m.text}</div>
              </motion.div>
            ))}
            {typing && (
              <div className="flex gap-3 items-center">
                <div className="size-8 rounded-full bg-gradient-to-br from-cyan to-magenta p-px">
                  <div className="size-full rounded-full bg-background grid place-items-center"><Sparkles className="size-3.5 text-cyan" /></div>
                </div>
                <div className="flex gap-1 px-4 py-3 bg-white/5 rounded-2xl ring-1 ring-white/5">
                  <span className="size-1.5 rounded-full bg-cyan animate-glow" />
                  <span className="size-1.5 rounded-full bg-cyan animate-glow" style={{ animationDelay: "150ms" }} />
                  <span className="size-1.5 rounded-full bg-cyan animate-glow" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>
          <div className="border-t border-white/5 p-4 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask your stylist anything…"
              className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none px-3 py-2"
            />
            <button onClick={send} className="size-10 rounded-full bg-cyan text-background grid place-items-center neon-cyan">
              <Send className="size-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-5">
            <p className="text-[10px] font-mono uppercase tracking-widest text-magenta mb-3">/ quick prompts</p>
            <div className="space-y-2">
              {["Outfit for hackathon demo", "What suits cool undertone?", "Dress like a K-drama lead", "Build a capsule for travel"].map((p) => (
                <button key={p} onClick={() => setInput(p)} className="w-full text-left text-xs px-3 py-2 rounded-lg bg-white/[0.03] hover:bg-white/5 transition">{p}</button>
              ))}
            </div>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <p className="text-[10px] font-mono uppercase tracking-widest text-cyan mb-2">/ context</p>
            <p className="text-xs text-muted-foreground leading-relaxed">Stylist is reading your aesthetic DNA, saved looks, wardrobe inventory, and live trend feed.</p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
