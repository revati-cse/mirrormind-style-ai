import { createFileRoute } from "@tanstack/react-router";
import { Heart, Plus, Sparkles } from "lucide-react";
import { PageShell } from "@/components/app/PageShell";
import { motion, AnimatePresence } from "framer-motion";
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
  const hasLooks = looks.length > 0;

  return (
    <PageShell title="Saved Looks" subtitle="/ your private archive">
      <AnimatePresence mode="wait">
        {!hasLooks ? (
          <motion.div 
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }}
            className="h-96 glass-card rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-magenta/5 pointer-events-none" />
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="relative z-10 mb-6"
            >
              <div className="size-20 rounded-full bg-cyan/10 border border-cyan/20 grid place-items-center mx-auto neon-cyan">
                <Sparkles className="size-8 text-cyan" />
              </div>
            </motion.div>
            <h2 className="font-serif italic text-3xl mb-2 relative z-10">No saved looks yet</h2>
            <p className="text-sm text-muted-foreground max-w-sm mb-8 relative z-10">
              Start building your collection by uploading items to the scanner or matcher. Your best looks will appear here.
            </p>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative z-10 flex items-center gap-2 px-6 py-3 rounded-full bg-cyan text-background font-semibold text-sm neon-cyan hover:bg-cyan/90 transition"
            >
              <Plus className="size-4" /> Start Scanning
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {looks.map((l, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative rounded-3xl overflow-hidden ring-1 ring-white/5 hover:ring-cyan/30 transition duration-500"
              >
                <div className="aspect-[4/5] relative">
                  <img src={l.img} alt={l.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  
                  {/* Hover overlay with glow */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-br from-cyan/10 to-magenta/10 backdrop-blur-sm"
                  />
                </div>

                {/* Save button */}
                <motion.button 
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 right-4 size-10 rounded-full bg-background/70 backdrop-blur border border-magenta/30 grid place-items-center text-magenta hover:bg-background/90 transition neon-magenta"
                >
                  <Heart className="size-5 fill-magenta" />
                </motion.button>

                {/* Text content */}
                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">{l.tag}</p>
                    <p className="font-serif italic text-2xl text-foreground">{l.name}</p>
                  </motion.div>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
