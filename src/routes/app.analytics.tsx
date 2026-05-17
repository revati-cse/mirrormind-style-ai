import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/app/PageShell";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — MirrorMind AI" }] }),
  component: Analytics,
});

const growth = [
  { m: "Jan", v: 64 }, { m: "Feb", v: 68 }, { m: "Mar", v: 72 }, { m: "Apr", v: 78 },
  { m: "May", v: 81 }, { m: "Jun", v: 86 }, { m: "Jul", v: 89 }, { m: "Aug", v: 94 },
];

const palette = [
  { name: "Obsidian", value: 42, fill: "oklch(0.30 0.02 270)" },
  { name: "Chrome", value: 26, fill: "oklch(0.85 0.02 250)" },
  { name: "Magenta", value: 18, fill: "oklch(0.70 0.32 340)" },
  { name: "Cyan", value: 14, fill: "oklch(0.88 0.18 200)" },
];

function Analytics() {
  return (
    <PageShell title="Fashion Analytics" subtitle="/ style evolution · 8 months">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {[["Style growth", "+47%", "text-cyan"], ["Best aesthetic", "Tech-Wear", "text-magenta"], ["Avg confidence", "94/100", "text-purple"]].map(([k, v, c]) => (
          <div key={k} className="glass-card rounded-2xl p-5">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{k}</p>
            <p className={`font-serif italic text-4xl mt-2 ${c}`}>{v}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 mb-6">
        <div className="glass-card rounded-3xl p-6 h-[360px]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-mono uppercase tracking-widest text-cyan">/ style score</p>
            <span className="text-[10px] font-mono text-muted-foreground">monthly</span>
          </div>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={growth} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="gC" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.88 0.18 200)" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="oklch(0.88 0.18 200)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="m" tick={{ fill: "oklch(0.62 0.02 270)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "oklch(0.62 0.02 270)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "oklch(0.17 0.015 270)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: "oklch(0.62 0.02 270)" }}
              />
              <Area type="monotone" dataKey="v" stroke="oklch(0.88 0.18 200)" strokeWidth={2} fill="url(#gC)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-3xl p-6 h-[360px]">
          <p className="text-[10px] font-mono uppercase tracking-widest text-magenta mb-3">/ wardrobe palette</p>
          <ResponsiveContainer width="100%" height="75%">
            <RadialBarChart data={palette} innerRadius="35%" outerRadius="95%" startAngle={90} endAngle={-270}>
              <PolarAngleAxis type="number" domain={[0, 50]} tick={false} />
              <RadialBar background={{ fill: "rgba(255,255,255,0.04)" }} dataKey="value" cornerRadius={8} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {palette.map((p) => (
              <div key={p.name} className="flex items-center gap-2 text-xs">
                <span className="size-2.5 rounded-full" style={{ background: p.fill }} />
                <span className="text-muted-foreground">{p.name}</span>
                <span className="ml-auto text-foreground">{p.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <div className="flex items-center justify-between mb-5">
          <p className="text-[10px] font-mono uppercase tracking-widest text-purple">/ aesthetic evolution</p>
          <span className="text-[10px] font-mono text-muted-foreground">8 months</span>
        </div>
        <div className="flex items-end gap-2 h-40">
          {[20, 28, 36, 30, 45, 52, 60, 72, 78, 85, 92, 96].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-cyan/20 to-magenta/60" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between mt-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <span>W1</span><span>W3</span><span>W6</span><span>W9</span><span>W12</span>
        </div>
      </div>
    </PageShell>
  );
}
