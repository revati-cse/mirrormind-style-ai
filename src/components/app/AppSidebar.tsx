import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Camera, Wand2, User, Shirt, ScanFace, BarChart3, MessageSquare, Heart, TrendingUp, LogOut } from "lucide-react";
import { BrandMark } from "@/components/shared/brand";

const nav = [
  { to: "/app", label: "Intelligence", icon: LayoutDashboard, end: true },
  { to: "/app/try-on", label: "Virtual Try-On", icon: Camera },
  { to: "/app/matcher", label: "Smart Matcher", icon: Wand2 },
  { to: "/app/twin", label: "Fashion Twin", icon: User },
  { to: "/app/wardrobe", label: "Wardrobe", icon: Shirt },
  { to: "/app/scanner", label: "Style Scanner", icon: ScanFace },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/chat", label: "AI Stylist", icon: MessageSquare },
  { to: "/app/saved", label: "Saved Looks", icon: Heart },
  { to: "/app/trends", label: "Trend Oracle", icon: TrendingUp },
] as const;

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="h-full w-72 shrink-0 flex flex-col bg-sidebar border-r border-sidebar-border">
      <div className="px-6 h-16 flex items-center border-b border-sidebar-border">
        <BrandMark />
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-0.5">
        {nav.map((item) => {
          const active = item.end ? pathname === item.to : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${
                active
                  ? "bg-white/5 text-foreground ring-1 ring-white/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
              }`}
            >
              <span className={`grid place-items-center size-7 rounded-lg ${active ? "bg-cyan/10 text-cyan" : "bg-white/5 text-muted-foreground group-hover:text-foreground"}`}>
                <item.icon className="size-4" />
              </span>
              <span className="flex-1">{item.label}</span>
              {active && <span className="size-1.5 rounded-full bg-cyan animate-glow" />}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <div className="glass-card rounded-2xl p-4">
          <p className="text-[10px] font-bold text-purple uppercase tracking-widest mb-1">Pro mode</p>
          <p className="text-xs text-muted-foreground leading-snug mb-3">Hyper-personalization, unlimited renders, priority Oracle.</p>
          <button className="w-full text-xs font-semibold py-2 rounded-lg bg-foreground text-background hover:bg-cyan transition">Upgrade</button>
        </div>
        <Link to="/" className="mt-3 flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition">
          <LogOut className="size-3.5" /> Exit atelier
        </Link>
      </div>
    </aside>
  );
}
