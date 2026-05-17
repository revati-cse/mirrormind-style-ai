import { Bell, Search, Sparkles, Menu } from "lucide-react";

export function AppHeader({ title, subtitle, onMenuClick }: { title: string; subtitle?: string; onMenuClick?: () => void }) {
  return (
    <header className="sticky top-0 z-30 bg-background/70 backdrop-blur-xl border-b border-white/5 px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onMenuClick} className="lg:hidden grid place-items-center size-9 rounded-lg ring-1 ring-white/10">
          <Menu className="size-4" />
        </button>
        <div className="min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground truncate">{subtitle ?? "MirrorMind"}</p>
          <h1 className="font-serif italic text-xl text-foreground truncate">{title}</h1>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-3 flex-1 max-w-md">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            placeholder="Search outfits, aesthetics, brands…"
            className="w-full bg-white/[0.03] border border-white/5 rounded-full pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-cyan/40"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="grid place-items-center size-9 rounded-full ring-1 ring-white/10 hover:bg-white/5 transition">
          <Bell className="size-4" />
        </button>
        <button className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full bg-cyan/10 text-cyan ring-1 ring-cyan/30 hover:bg-cyan/20 transition">
          <Sparkles className="size-3.5" /> AI Credits · 248
        </button>
        <div className="size-9 rounded-full bg-gradient-to-br from-cyan to-magenta p-px">
          <div className="size-full rounded-full bg-background grid place-items-center text-[11px] font-semibold">M</div>
        </div>
      </div>
    </header>
  );
}
