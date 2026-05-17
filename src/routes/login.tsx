import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/shared/brand";
import heroAvatar from "@/assets/hero-avatar.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — MirrorMind AI" }, { name: "description", content: "Enter the MirrorMind atelier." }] }),
  component: Login,
});

function Login() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img src={heroAvatar} alt="MirrorMind" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/50 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan mb-3">/ private preview</p>
          <h2 className="font-serif italic text-4xl text-balance">Step into the mirror built for you.</h2>
        </div>
      </div>
      <div className="flex flex-col px-6 sm:px-12 py-10 bg-background relative">
        <div className="absolute inset-0 bg-radial-glow opacity-50 pointer-events-none" />
        <div className="relative"><BrandMark /></div>
        <div className="relative flex-1 grid place-items-center">
          <div className="w-full max-w-sm">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-3">/ enter atelier</p>
            <h1 className="font-serif italic text-4xl mb-2">Welcome back.</h1>
            <p className="text-sm text-muted-foreground mb-8">Sign in to resume your aesthetic profile.</p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Email</label>
                <input type="email" placeholder="you@atelier.ai" className="mt-1.5 w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-cyan/40" />
              </div>
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Password</label>
                <input type="password" placeholder="••••••••" className="mt-1.5 w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-cyan/40" />
              </div>
              <Link to="/app" className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-cyan text-background py-3 text-sm font-semibold neon-cyan">
                Enter MirrorMind <ArrowUpRight className="size-4 group-hover:translate-x-0.5 transition" />
              </Link>
            </form>

            <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
              <div className="h-px flex-1 bg-white/10" /> or <div className="h-px flex-1 bg-white/10" />
            </div>
            <button className="w-full py-3 rounded-full ring-1 ring-white/10 text-sm font-medium hover:bg-white/5 transition">Continue with Google</button>

            <p className="mt-8 text-xs text-muted-foreground text-center">
              New here? <Link to="/app" className="text-cyan hover:underline">Request access</Link>
            </p>
          </div>
        </div>
        <p className="relative text-[10px] font-mono uppercase tracking-widest text-muted-foreground">© MirrorMind AI</p>
      </div>
    </div>
  );
}
