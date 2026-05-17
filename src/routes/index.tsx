import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Eye, Shirt, TrendingUp, Wand2, Palette, Bot, Layers, Heart } from "lucide-react";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { BrandMark } from "@/components/shared/brand";
import heroAvatar from "@/assets/hero-avatar.jpg";
import itemJacket from "@/assets/item-jacket.jpg";
import itemShoes from "@/assets/item-shoes.jpg";
import itemPants from "@/assets/item-pants.jpg";
import itemHoodie from "@/assets/item-hoodie.jpg";
import itemAccessory from "@/assets/item-accessory.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MirrorMind AI — Fashion Intelligence Platform" },
      { name: "description", content: "Virtual try-on, AI fashion twin, smart outfit matcher, aesthetic detection and trend prediction. Your wardrobe, quantified by machine intelligence." },
      { property: "og:title", content: "MirrorMind AI — Fashion Intelligence Platform" },
      { property: "og:description", content: "The AI atelier for your aesthetic identity." },
    ],
  }),
  component: Landing,
});

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const features = [
  { icon: Eye, color: "text-cyan", glow: "bg-cyan/10", title: "Virtual Try-On", desc: "Physically accurate fabric simulation rendered onto your neural body twin in real-time." },
  { icon: Wand2, color: "text-magenta", glow: "bg-magenta/10", title: "Smart Outfit Matcher", desc: "Upload a single item. We architect the entire silhouette around its color, material and aesthetic." },
  { icon: Sparkles, color: "text-purple", glow: "bg-purple/10", title: "AI Fashion Twin", desc: "Generate a personal avatar that mirrors your proportions, posture and signature look." },
  { icon: Palette, color: "text-cyan", glow: "bg-cyan/10", title: "Color Harmony Engine", desc: "Undertone, hair, eyes — distilled into a curated palette that elevates every fit." },
  { icon: Layers, color: "text-magenta", glow: "bg-magenta/10", title: "Aesthetic Detector", desc: "Old Money. Cyberpunk. Coquette. We name the genre your wardrobe is already speaking." },
  { icon: TrendingUp, color: "text-purple", glow: "bg-purple/10", title: "Trend Oracle", desc: "Predictive modeling from emerging clusters in Tokyo, Seoul, Paris and the algorithmic underground." },
  { icon: Bot, color: "text-cyan", glow: "bg-cyan/10", title: "AI Stylist Chat", desc: "A personal stylist on demand. Mood, occasion, weather — articulated as outfits in seconds." },
  { icon: Shirt, color: "text-magenta", glow: "bg-magenta/10", title: "Wardrobe Intelligence", desc: "Scan your closet, surface forgotten pairings, detect missing essentials, eliminate decision fatigue." },
];

const aesthetics = ["Old Money", "Cyberpunk", "Dark Academia", "Y2K", "Streetwear", "Coquette", "K-Fashion", "Luxury Minimalist", "Soft Aesthetic", "Techwear"];

const retailers = ["Myntra", "Ajio", "Zara", "H&M", "ASOS", "Urbanic", "Nike", "Adidas", "Amazon Fashion", "Flipkart"];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-cyan/30 overflow-x-clip">
      <MarketingNav />

      {/* HERO */}
      <section className="relative pt-40 pb-28 px-6">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-14 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 py-1 pl-2 pr-3 rounded-full bg-purple/10 text-purple text-xs font-medium ring-1 ring-purple/30 mb-7"
            >
              <span className="size-1.5 rounded-full bg-purple animate-glow" />
              v4.0 Neural Stylist · Now in private preview
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif italic text-5xl md:text-7xl lg:text-[5.4rem] leading-[0.95] text-foreground text-balance mb-7"
            >
              Your aesthetic, <br />
              <span className="text-gradient not-italic font-serif">distilled by</span> <br />
              machine intelligence.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg text-muted-foreground max-w-[52ch] text-pretty mb-10"
            >
              MirrorMind reads your visual identity, simulates outfits on your neural twin, and curates a
              high-fidelity wardrobe that transcends seasonal cycles. Stepping into the digital mirror has
              never felt this tactile.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                to="/app"
                className="group inline-flex items-center gap-2 rounded-full bg-cyan pl-5 pr-3 py-2.5 text-sm font-semibold text-background neon-cyan hover:shadow-[0_0_40px_-4px_oklch(0.88_0.18_200/0.7)] transition"
              >
                Begin analysis
                <span className="grid place-items-center size-7 rounded-full bg-background/15 group-hover:translate-x-0.5 transition">
                  <ArrowUpRight className="size-3.5" />
                </span>
              </Link>
              <a href="#features" className="text-sm font-medium px-5 py-2.5 rounded-full ring-1 ring-white/10 hover:bg-white/5 transition">
                View capabilities
              </a>
            </motion.div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "98%", v: "Style match accuracy" },
                { k: "2.4M", v: "Outfits generated" },
                { k: "+47", v: "Aesthetic genres" },
              ].map((s) => (
                <div key={s.v}>
                  <p className="font-serif italic text-3xl text-foreground">{s.k}</p>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">{s.v}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-tr from-cyan/30 via-magenta/20 to-purple/30 blur-3xl animate-glow" />
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-white/10">
              <img src={heroAvatar} alt="MirrorMind AI neural fashion avatar" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan px-2 py-1 rounded bg-background/60 backdrop-blur ring-1 ring-cyan/30">
                  ● Live render
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">v4.0</span>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                className="absolute bottom-5 left-5 right-5 glass-strong rounded-2xl p-4"
              >
                <p className="text-[10px] font-mono uppercase tracking-widest text-cyan mb-2">Aesthetic match</p>
                <p className="text-sm leading-snug mb-3">Neo-Minimalist · 96% · silk blends with chrome accents.</p>
                <div className="flex items-center gap-2">
                  <div className="size-4 rounded-full bg-zinc-900 ring-1 ring-white/20" />
                  <div className="size-4 rounded-full bg-cyan ring-1 ring-white/20" />
                  <div className="size-4 rounded-full bg-magenta ring-1 ring-white/20" />
                  <div className="ml-auto text-[10px] font-mono text-muted-foreground">confidence 0.96</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="relative mt-24 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
          <span>Connected ateliers</span>
          {retailers.slice(0, 7).map((r) => (
            <span key={r} className="hover:text-foreground transition">{r}</span>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative px-6 py-32 border-y border-white/5 bg-card/40">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fade} className="max-w-3xl mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-cyan mb-4">/ atelier</p>
            <h2 className="font-serif italic text-4xl md:text-6xl text-foreground text-balance">
              A complete intelligence layer for personal style.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group glass-card p-7 rounded-2xl hover:bg-white/5 transition"
              >
                <div className={`size-10 rounded-xl ${f.glow} grid place-items-center mb-5 ring-1 ring-white/10`}>
                  <f.icon className={`size-5 ${f.color}`} />
                </div>
                <h3 className="text-foreground font-medium text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SMART MATCHER */}
      <section id="matcher" className="relative px-6 py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fade} className="max-w-3xl mb-14">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-magenta mb-4">/ flagship</p>
            <h2 className="font-serif italic text-4xl md:text-6xl text-balance">
              Smart Outfit Matcher.<br />
              <span className="text-muted-foreground">One item in. A whole silhouette out.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <motion.div {...fade} className="lg:col-span-5">
              <div className="relative group h-full">
                <div className="absolute -inset-1 bg-gradient-to-tr from-cyan/40 to-magenta/40 rounded-3xl blur opacity-40 group-hover:opacity-70 transition" />
                <div className="relative glass-card rounded-3xl p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Uploaded base</span>
                    <span className="text-[10px] font-mono text-cyan">analyzed in 0.34s</span>
                  </div>
                  <div className="relative flex-1 rounded-2xl overflow-hidden bg-zinc-900/60 ring-1 ring-white/5">
                    <img src={itemHoodie} alt="Oversized hoodie" loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-5">
                    <p className="font-medium text-foreground">Oversized Mohair Hoodie</p>
                    <p className="text-xs text-muted-foreground">Obsidian Black · Heavyweight Knit</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-2 flex lg:flex-col items-center justify-center gap-4">
              <div className="hidden lg:block w-px flex-1 bg-gradient-to-b from-transparent via-cyan/50 to-transparent" />
              <div className="size-16 rounded-full grid place-items-center bg-background ring-1 ring-cyan/40 neon-cyan animate-glow">
                <Wand2 className="size-6 text-cyan" />
              </div>
              <div className="hidden lg:block w-px flex-1 bg-gradient-to-b from-transparent via-magenta/50 to-transparent" />
            </div>

            <div className="lg:col-span-5 space-y-4">
              {[
                { img: itemPants, name: "Structural Cargos", meta: "Slate Grey · Tactical finish", match: 98, color: "cyan", retailers: ["Zara", "H&M"] },
                { img: itemShoes, name: "Vertex Chrome Kicks", meta: "Holographic · Bio-form sole", match: 92, color: "magenta", retailers: ["ASOS", "Nike"] },
                { img: itemAccessory, name: "Mercury Chain Set", meta: "Brushed silver · Layered", match: 89, color: "purple", retailers: ["Urbanic", "Ajio"] },
              ].map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-4 flex gap-4 hover:bg-white/5 transition group cursor-pointer"
                >
                  <div className="size-24 shrink-0 rounded-xl overflow-hidden ring-1 ring-white/5">
                    <img src={m.img} alt={m.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="font-medium text-foreground">{m.name}</h5>
                      <span className={`text-[10px] font-bold text-${m.color}`}>{m.match}% MATCH</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{m.meta}</p>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {m.retailers.map((r) => (
                        <button key={r} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-medium hover:bg-foreground hover:text-background transition">
                          BUY · {r.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section id="dashboard" className="px-6 py-32 bg-card/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-14">
          <motion.div {...fade}>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-cyan mb-4">/ intelligence</p>
            <h2 className="font-serif italic text-4xl md:text-5xl mb-6 text-balance">
              Your wardrobe, quantified.
            </h2>
            <p className="text-muted-foreground text-pretty mb-10">
              Monitor style evolution, track compatibility scores, surface forgotten pairings, and discover
              acquisition opportunities — all from a single command center.
            </p>
            <div className="space-y-3">
              {[
                ["Style Cohesion", "94%", "cyan"],
                ["Aesthetic Category", "Luxury Tech-Wear", "foreground"],
                ["Confidence Index", "+12.4%", "magenta"],
                ["Items Catalogued", "287", "foreground"],
              ].map(([k, v, c]) => (
                <div key={k} className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-sm text-muted-foreground">{k}</span>
                  <span className={`text-sm font-medium ${c === "cyan" ? "text-cyan" : c === "magenta" ? "text-magenta" : "text-foreground"}`}>{v}</span>
                </div>
              ))}
            </div>
            <Link to="/app" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:underline">
              Open dashboard <ArrowUpRight className="size-4" />
            </Link>
          </motion.div>

          <motion.div {...fade} className="glass-strong rounded-3xl p-5 sm:p-7 ring-1 ring-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-6 text-xs font-semibold uppercase tracking-[0.2em]">
                <span className="text-foreground border-b border-cyan pb-3">Curated</span>
                <span className="text-muted-foreground pb-3">Wardrobe</span>
                <span className="text-muted-foreground pb-3">Analytics</span>
              </div>
              <div className="flex gap-1.5">
                <div className="size-2 rounded-full bg-zinc-700" />
                <div className="size-2 rounded-full bg-zinc-700" />
                <div className="size-2 rounded-full bg-cyan" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { img: itemJacket, name: "Shadow Shell J1", tag: "Tech", fit: "98% Fit", color: "cyan" },
                { img: itemShoes, name: "Orbital Step 02", tag: "Cyber", fit: "Match", color: "magenta" },
                { img: itemPants, name: "Vortex Slacks", tag: "Minimal", fit: "Curated", color: "purple" },
                { img: itemHoodie, name: "Mohair Veil", tag: "Streetwear", fit: "Saved", color: "cyan" },
                { img: itemAccessory, name: "Mercury Chains", tag: "Accents", fit: "New", color: "magenta" },
                { img: itemJacket, name: "Onyx Trench", tag: "Editorial", fit: "94%", color: "purple" },
              ].map((it) => (
                <div key={it.name} className="group">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden ring-1 ring-white/5 bg-zinc-900/40">
                    <img src={it.img} alt={it.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  </div>
                  <div className="flex items-start justify-between mt-3">
                    <div>
                      <p className="text-xs font-medium text-foreground">{it.name}</p>
                      <p className="text-[10px] uppercase tracking-tight text-muted-foreground">Aesthetic · {it.tag}</p>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded bg-${it.color}/10 text-${it.color}`}>{it.fit}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* AESTHETICS */}
      <section className="px-6 py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fade} className="max-w-3xl mb-12">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-purple mb-4">/ aesthetic dna</p>
            <h2 className="font-serif italic text-4xl md:text-5xl">
              We name the genre your wardrobe already speaks.
            </h2>
          </motion.div>
          <div className="flex flex-wrap gap-3">
            {aesthetics.map((a, i) => (
              <motion.span
                key={a}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="px-4 py-2 rounded-full border border-white/10 text-sm hover:bg-white/5 hover:border-cyan/40 hover:text-cyan transition cursor-default"
              >
                {a}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDS */}
      <section id="trends" className="px-6 py-32 border-t border-white/5 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fade} className="flex items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-cyan mb-4">/ trend oracle</p>
              <h2 className="font-serif italic text-4xl md:text-5xl">Where the algorithm is moving.</h2>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hidden md:block">Updated 4m ago</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: "Metallic Sheen", v: 80, color: "cyan", note: "+24% w/w" },
              { name: "Modular Layering", v: 45, color: "purple", note: "+6% w/w" },
              { name: "Gorpcore 2.0", v: 95, color: "magenta", note: "+41% w/w" },
              { name: "Soft Coquette", v: 62, color: "cyan", note: "+18% w/w" },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Trending</p>
                <p className="font-serif italic text-2xl text-foreground mb-1">{t.name}</p>
                <p className={`text-xs text-${t.color} mb-5`}>{t.note}</p>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} whileInView={{ width: `${t.v}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2 + i * 0.1 }}
                    className={`h-full rounded-full bg-${t.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow opacity-80" />
        <div className="relative max-w-4xl mx-auto text-center">
          <Heart className="mx-auto size-8 text-magenta mb-6 animate-glow" />
          <h2 className="font-serif italic text-5xl md:text-7xl leading-tight text-balance mb-8">
            Step into the <span className="text-gradient">mirror</span> built for you.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Join the private preview and let MirrorMind curate the next chapter of your aesthetic identity.
          </p>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 rounded-full bg-cyan pl-6 pr-3 py-3 text-base font-semibold text-background neon-cyan"
          >
            Launch atelier
            <span className="grid place-items-center size-8 rounded-full bg-background/15">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-14 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <BrandMark />
            <p className="text-xs text-muted-foreground mt-3 max-w-xs">
              The AI fashion intelligence platform. All dimensions synchronized.
            </p>
          </div>
          <div className="flex flex-wrap gap-8 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
            <a href="#features" className="hover:text-cyan transition">Atelier</a>
            <a href="#matcher" className="hover:text-cyan transition">Matcher</a>
            <a href="#dashboard" className="hover:text-cyan transition">Intelligence</a>
            <a href="#trends" className="hover:text-cyan transition">Trends</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} MirrorMind AI · Calibrated for aesthetic identity.
        </div>
      </footer>
    </div>
  );
}
