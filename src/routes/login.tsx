import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { BrandMark } from "@/components/shared/brand";
import heroAvatar from "@/assets/hero-avatar.jpg";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — MirrorMind AI" }, { name: "description", content: "Enter the MirrorMind atelier." }] }),
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill in both email and password");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Identity confirmed. Accessing atelier...");
      navigate({ to: "/app" });
    } catch (err: any) {
      toast.error(err.message || "Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google authentication successful.");
      navigate({ to: "/app" });
    } catch (err: any) {
      toast.error(err.message || "Failed to authenticate with Google");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:block overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={heroAvatar} alt="MirrorMind" className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/50 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan mb-3">/ private preview</p>
            <h2 className="font-serif italic text-4xl text-balance">Step into the mirror built for you.</h2>
          </motion.div>
        </div>
      </div>
      
      <div className="flex flex-col px-6 sm:px-12 py-10 bg-background relative">
        <div className="absolute inset-0 bg-radial-glow opacity-50 pointer-events-none" />
        <div className="relative"><BrandMark /></div>
        <div className="relative flex-1 grid place-items-center">
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="w-full max-w-sm glass-card p-8 rounded-3xl"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-3">/ enter atelier</p>
            <h1 className="font-serif italic text-4xl mb-2">Welcome back.</h1>
            <p className="text-sm text-muted-foreground mb-8">Sign in to resume your aesthetic profile.</p>

            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@atelier.ai" 
                  className="mt-1.5 w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-cyan/40 transition" 
                />
              </div>
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="mt-1.5 w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-cyan/40 transition" 
                />
              </div>
              <button 
                disabled={loading}
                className="group w-full flex items-center justify-center gap-2 rounded-full bg-cyan text-background py-3 text-sm font-semibold neon-cyan disabled:opacity-50 transition"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : <>Enter MirrorMind <ArrowUpRight className="size-4 group-hover:translate-x-0.5 transition" /></>}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
              <div className="h-px flex-1 bg-white/10" /> or <div className="h-px flex-1 bg-white/10" />
            </div>
            
            <button 
              onClick={handleGoogleLogin}
              className="w-full py-3 rounded-full ring-1 ring-white/10 text-sm font-medium hover:bg-white/5 transition flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            <p className="mt-8 text-xs text-muted-foreground text-center">
              New here? <Link to="/app" className="text-cyan hover:underline">Request access</Link>
            </p>
          </motion.div>
        </div>
        <p className="relative text-[10px] font-mono uppercase tracking-widest text-muted-foreground">© MirrorMind AI</p>
      </div>
    </div>
  );
}
