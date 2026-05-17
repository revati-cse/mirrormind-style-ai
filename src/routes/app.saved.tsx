import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { PageShell } from "@/components/app/PageShell";
import itemJacket from "@/assets/item-jacket.jpg";
import itemShoes from "@/assets/item-shoes.jpg";
import itemPants from "@/assets/item-pants.jpg";
import itemHoodie from "@/assets/item-hoodie.jpg";
import heroAvatar from "@/assets/hero-avatar.jpg";

export const Route = createFileRoute("/app/saved")({
  head: () => ({ meta: [{ title: "Saved Looks — MirrorMind AI" }] }),
  component: Saved,
});

const looks = [
  { img: heroAvatar, name: "Mercury Editorial", tag: "Editorial" },
  { img: itemJacket, name: "Shadow Shell Fit", tag: "Techwear" },
  { img: itemHoodie, name: "Obsidian Veil", tag: "Streetwear" },
  { img: itemPants, name: "Vortex Office", tag: "Workwear" },
  { img: itemShoes, name: "Chrome Runner", tag: "Athflow" },
  { img: itemJacket, name: "Onyx Date Night", tag: "Evening" },
];

function Saved() {
  return (
    <PageShell title="Saved Looks" subtitle="/ your private archive">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {looks.map((l, i) => (
          <div key={i} className="group relative rounded-3xl overflow-hidden ring-1 ring-white/5">
            <div className="aspect-[4/5]">
              <img src={l.img} alt={l.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <button className="absolute top-4 right-4 size-9 rounded-full bg-background/60 backdrop-blur grid place-items-center text-magenta ring-1 ring-magenta/30">
              <Heart className="size-4 fill-magenta" />
            </button>
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{l.tag}</p>
              <p className="font-serif italic text-2xl mt-1">{l.name}</p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
