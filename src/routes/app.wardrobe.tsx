import { createFileRoute } from "@tanstack/react-router";
import { Filter, Plus } from "lucide-react";
import { PageShell } from "@/components/app/PageShell";
import itemJacket from "@/assets/item-jacket.jpg";
import itemShoes from "@/assets/item-shoes.jpg";
import itemPants from "@/assets/item-pants.jpg";
import itemHoodie from "@/assets/item-hoodie.jpg";
import itemAccessory from "@/assets/item-accessory.jpg";

export const Route = createFileRoute("/app/wardrobe")({
  head: () => ({ meta: [{ title: "Wardrobe — MirrorMind AI" }] }),
  component: Wardrobe,
});

const wardrobe = [
  { img: itemJacket, name: "Shadow Shell J1", tag: "Outerwear", color: "Obsidian" },
  { img: itemHoodie, name: "Mohair Veil", tag: "Tops", color: "Obsidian" },
  { img: itemPants, name: "Vortex Slacks", tag: "Bottoms", color: "Slate" },
  { img: itemShoes, name: "Vertex Kicks", tag: "Footwear", color: "Chrome" },
  { img: itemAccessory, name: "Mercury Chains", tag: "Accessory", color: "Silver" },
  { img: itemJacket, name: "Onyx Trench", tag: "Outerwear", color: "Black" },
  { img: itemPants, name: "Tide Cargos", tag: "Bottoms", color: "Storm" },
  { img: itemShoes, name: "Orbital 02", tag: "Footwear", color: "Magenta" },
];

function Wardrobe() {
  return (
    <PageShell title="Your Wardrobe" subtitle="/ 287 items catalogued">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {["All", "Outerwear", "Tops", "Bottoms", "Footwear", "Accessory"].map((c, i) => (
          <button key={c} className={`text-xs font-medium px-3 py-1.5 rounded-full ring-1 transition ${i === 0 ? "bg-foreground text-background ring-foreground" : "ring-white/10 hover:bg-white/5"}`}>
            {c}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <button className="text-xs font-medium px-3 py-1.5 rounded-full ring-1 ring-white/10 flex items-center gap-1.5 hover:bg-white/5">
            <Filter className="size-3.5" /> Filter
          </button>
          <button className="text-xs font-semibold px-3 py-1.5 rounded-full bg-cyan text-background flex items-center gap-1.5 neon-cyan">
            <Plus className="size-3.5" /> Add item
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wardrobe.map((w, i) => (
          <div key={i} className="group rounded-2xl overflow-hidden ring-1 ring-white/5 bg-card">
            <div className="aspect-[3/4]">
              <img src={w.img} alt={w.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            </div>
            <div className="p-4">
              <p className="text-sm font-medium text-foreground">{w.name}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{w.tag} · {w.color}</p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
