import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, TrendingUp, Eye, Heart, Camera, Wand2 } from "lucide-react";
import { PageShell } from "@/components/app/PageShell";
import heroAvatar from "@/assets/hero-avatar.jpg";
import itemJacket from "@/assets/item-jacket.jpg";
import itemShoes from "@/assets/item-shoes.jpg";
import itemPants from "@/assets/item-pants.jpg";
import itemHoodie from "@/assets/item-hoodie.jpg";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Intelligence — MirrorMind AI" }] }),
  component: Dashboard,
});

function Stat({ label, value, accent, sub }: { label: string; value: string; accent: string; sub?: string }) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={`font-serif italic text-4xl mt-2 ${accent}`}>{value}</p>
      {sub && <p className="text-[11px] text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

function Dashboard() {
  return (
    <PageShell title="Cyber-Minimalist Luxe" subtitle="Aesthetic profile · M.Calder">
      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Stat label="Style Score" value="94" accent="text-cyan" sub="Top 2% of cohort" />
        <Stat label="Confidence" value="+12%" accent="text-magenta" sub="vs last month" />
        <Stat label="Items" value="287" accent="text-foreground" sub="across 4 categories" />
        <Stat label="Saved looks" value="42" accent="text-purple" sub="6 from this week" />
      </div>

      {/* Hero row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 aspect-[16/10]"
        >
          <img src={heroAvatar} alt="Your AI fashion twin" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-cyan mb-2">/ neural twin</p>
            <h2 className="font-serif italic text-3xl md:text-4xl mb-3">Today's recommended persona</h2>
            <p className="text-sm text-muted-foreground max-w-md mb-5">Chrome-accented silhouette tuned for high-contrast lighting. 96% aesthetic alignment.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/app/try-on" className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-cyan text-background neon-cyan">
                <Camera className="size-3.5" /> Try this on
              </Link>
              <Link to="/app/twin" className="text-xs font-semibold px-4 py-2 rounded-full ring-1 ring-white/15 hover:bg-white/5 transition">View twin</Link>
            </div>
          </div>
        </motion.div>

        <div className="glass-card rounded-3xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <p className="text-[10px] font-mono uppercase tracking-widest text-magenta">Aesthetic DNA</p>
            <span className="text-[10px] font-mono text-muted-foreground">v4.2</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1.5 rounded-full bg-purple/15 text-purple text-xs font-medium ring-1 ring-purple/30">Dark Academia</span>
            <span className="px-3 py-1.5 rounded-full bg-cyan/15 text-cyan text-xs font-medium ring-1 ring-cyan/30">Techwear Edge</span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 text-muted-foreground text-xs font-medium">Old Money</span>
            <span className="px-3 py-1.5 rounded-full bg-magenta/15 text-magenta text-xs font-medium ring-1 ring-magenta/30">Mercury</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Your wardrobe operates in the intersection of structured tailoring and synthetic materials. Lean into matte
            blacks; introduce one chrome accent per outfit.
          </p>
          <div className="mt-auto grid grid-cols-3 gap-3 text-center">
            {[["96", "Match"], ["12", "Genres"], ["A+", "Grade"]].map(([k, v]) => (
              <div key={v} className="rounded-xl bg-white/[0.03] py-3 ring-1 ring-white/5">
                <p className="font-serif italic text-2xl text-foreground">{k}</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended outfits */}
      <div className="mb-8">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-cyan mb-1">/ curated today</p>
            <h2 className="font-serif italic text-2xl">Picked for your spectrum</h2>
          </div>
          <Link to="/app/saved" className="text-xs font-semibold flex items-center gap-1 text-muted-foreground hover:text-foreground">
            All looks <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { img: itemJacket, name: "Shadow Shell J1", fit: "98%", tone: "text-cyan" },
            { img: itemShoes, name: "Vertex Kicks", fit: "94%", tone: "text-magenta" },
            { img: itemPants, name: "Vortex Slacks", fit: "91%", tone: "text-purple" },
            { img: itemHoodie, name: "Mohair Veil", fit: "89%", tone: "text-cyan" },
          ].map((it, i) => (
            <motion.div
              key={it.name}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="group rounded-2xl overflow-hidden ring-1 ring-white/5 bg-card relative"
            >
              <div className="aspect-[3/4]">
                <img src={it.img} alt={it.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{it.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">Editorial · AI Pick</p>
                </div>
                <span className={`text-xs font-bold ${it.tone}`}>{it.fit}</span>
              </div>
              <button className="absolute top-3 right-3 size-8 rounded-full bg-background/60 backdrop-blur grid place-items-center text-muted-foreground hover:text-magenta transition">
                <Heart className="size-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Activity grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Sparkles, t: "AI Glow-Up", d: "See your perceived confidence climb with refined silhouettes.", to: "/app/scanner", color: "text-cyan", glow: "bg-cyan/10" },
          { icon: Wand2, t: "Smart Matcher", d: "Upload one item, get a whole outfit architected around it.", to: "/app/matcher", color: "text-magenta", glow: "bg-magenta/10" },
          { icon: Eye, t: "Style Scanner", d: "Score professionalism, attractiveness, trend-fit from any photo.", to: "/app/scanner", color: "text-purple", glow: "bg-purple/10" },
          { icon: TrendingUp, t: "Trend Oracle", d: "Track viral aesthetics surfacing in Tokyo, Seoul and Berlin.", to: "/app/trends", color: "text-cyan", glow: "bg-cyan/10" },
        ].map((c) => (
          <Link key={c.t} to={c.to} className="glass-card rounded-2xl p-5 hover:bg-white/5 transition group">
            <div className={`size-10 rounded-xl ${c.glow} grid place-items-center mb-4 ring-1 ring-white/10`}>
              <c.icon className={`size-5 ${c.color}`} />
            </div>
            <p className="font-medium text-foreground">{c.t}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{c.d}</p>
            <ArrowUpRight className="mt-3 size-4 text-muted-foreground group-hover:text-foreground transition" />
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
