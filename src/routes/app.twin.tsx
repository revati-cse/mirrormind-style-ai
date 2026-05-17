import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/app/PageShell";
import { UploadDrop } from "@/components/app/UploadDrop";
import heroAvatar from "@/assets/hero-avatar.jpg";

export const Route = createFileRoute("/app/twin")({
  head: () => ({ meta: [{ title: "AI Fashion Twin — MirrorMind AI" }] }),
  component: Twin,
});

function Twin() {
  return (
    <PageShell title="Your AI Fashion Twin" subtitle="/ neural body model · v4.0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 aspect-[4/5]">
          <img src={heroAvatar} alt="Fashion twin" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
          <div className="absolute top-5 left-5 text-[10px] font-mono uppercase tracking-widest text-cyan px-2 py-1 rounded bg-background/60 backdrop-blur ring-1 ring-cyan/30">Synced</div>
          <div className="absolute bottom-5 left-5 right-5">
            <p className="font-serif italic text-2xl">M.Calder · 5'10" · Lean Athletic</p>
            <p className="text-xs text-muted-foreground mt-1">Posture: confident · Undertone: cool · Persona: editorial</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass-card rounded-2xl p-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-cyan mb-3">/ calibration</p>
            <h3 className="font-serif italic text-2xl mb-4">Refine your twin</h3>
            <p className="text-sm text-muted-foreground mb-5">Upload three reference photos for higher-fidelity proportion mapping and posture analysis.</p>
            <UploadDrop label="Add reference photo" hint="Side, front, and full-body angles preferred" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[["Body Type", "Lean", "text-cyan"], ["Undertone", "Cool", "text-magenta"], ["Posture", "A+", "text-purple"]].map(([k, v, c]) => (
              <div key={k} className="glass-card rounded-2xl p-4 text-center">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</p>
                <p className={`font-serif italic text-2xl mt-1 ${c}`}>{v}</p>
              </div>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-magenta mb-3">/ persona library</p>
            <div className="grid grid-cols-2 gap-3">
              {["Editorial", "Streetwear", "Old Money", "Cyber Mode"].map((p) => (
                <button key={p} className="px-4 py-3 rounded-xl ring-1 ring-white/10 bg-white/[0.02] hover:bg-white/5 text-left transition">
                  <p className="text-sm font-medium">{p}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Tap to morph twin</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
