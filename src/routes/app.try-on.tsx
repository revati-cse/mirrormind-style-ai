import { createFileRoute } from "@tanstack/react-router";
import { Heart, Download, Sparkles } from "lucide-react";
import { PageShell } from "@/components/app/PageShell";
import { UploadDrop } from "@/components/app/UploadDrop";
import heroAvatar from "@/assets/hero-avatar.jpg";
import itemJacket from "@/assets/item-jacket.jpg";
import itemShoes from "@/assets/item-shoes.jpg";
import itemPants from "@/assets/item-pants.jpg";
import itemHoodie from "@/assets/item-hoodie.jpg";

export const Route = createFileRoute("/app/try-on")({
  head: () => ({ meta: [{ title: "Virtual Try-On — MirrorMind AI" }] }),
  component: TryOn,
});

const looks = [
  { img: itemJacket, name: "Shadow Shell Look" },
  { img: itemShoes, name: "Chrome Runner Look" },
  { img: itemPants, name: "Vortex Tailored" },
  { img: itemHoodie, name: "Mohair Editorial" },
];

function TryOn() {
  return (
    <PageShell title="Virtual Try-On Studio" subtitle="/ live render">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 mb-8">
        <div>
          <UploadDrop label="Upload selfie or full-body photo" hint="PNG, JPG up to 12MB · Front-facing recommended" />
          <div className="mt-4 glass-card rounded-2xl p-4 flex items-center gap-3">
            <Sparkles className="size-4 text-cyan" />
            <p className="text-xs text-muted-foreground">Tip: stand in even lighting for the most accurate fabric simulation.</p>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 aspect-[4/5] lg:aspect-auto">
          <img src={heroAvatar} alt="Render preview" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/40" />
          <div className="absolute top-5 left-5 flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan px-2 py-1 rounded bg-background/60 backdrop-blur ring-1 ring-cyan/30">● Rendering</span>
          </div>
          <div className="absolute bottom-0 inset-x-0 p-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Outfit · Shadow Shell J1</p>
            <h3 className="font-serif italic text-3xl mb-4">Before / After</h3>
            <div className="flex flex-wrap gap-2">
              <button className="text-xs font-semibold px-4 py-2 rounded-full bg-cyan text-background neon-cyan flex items-center gap-2">
                <Heart className="size-3.5" /> Save look
              </button>
              <button className="text-xs font-semibold px-4 py-2 rounded-full ring-1 ring-white/15 hover:bg-white/5 transition flex items-center gap-2">
                <Download className="size-3.5" /> Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-end justify-between mb-5">
          <h2 className="font-serif italic text-2xl">Suggested looks</h2>
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">14 generated</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {looks.map((l) => (
            <div key={l.name} className="group rounded-2xl overflow-hidden ring-1 ring-white/5">
              <div className="aspect-[3/4] relative">
                <img src={l.img} alt={l.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <p className="absolute bottom-3 left-3 text-sm font-medium">{l.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
