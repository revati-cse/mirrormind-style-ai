import { Link } from "@tanstack/react-router";
import { BrandMark } from "@/components/shared/brand";

export function MarketingNav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <BrandMark />
          <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">Atelier</a>
            <a href="#matcher" className="hover:text-foreground transition">Matcher</a>
            <a href="#dashboard" className="hover:text-foreground transition">Intelligence</a>
            <a href="#trends" className="hover:text-foreground transition">Trends</a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition">Sign in</Link>
          <Link
            to="/app"
            className="text-sm font-semibold px-4 py-2 rounded-full bg-foreground text-background hover:bg-cyan transition"
          >
            Enter Atelier
          </Link>
        </div>
      </div>
    </nav>
  );
}
