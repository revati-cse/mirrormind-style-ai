import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app/AppSidebar";
import { MobileMenuContext } from "@/components/app/mobile-menu";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Atelier — MirrorMind AI" },
      { name: "description", content: "Your AI fashion intelligence command center." },
    ],
  }),
  component: AppLayout,
});

function AppLayout() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/login", replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow opacity-30" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex flex-col items-center"
        >
          <div className="size-16 rounded-full bg-cyan/10 border border-cyan/30 flex items-center justify-center mb-6 neon-cyan relative">
            <Loader2 className="size-8 text-cyan animate-spin" />
            <div className="absolute inset-0 rounded-full border border-cyan/50 animate-ping opacity-20" />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-cyan animate-pulse">Initializing neural twin...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-background relative">
      <div className={`lg:hidden fixed inset-0 z-40 transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-background/70 backdrop-blur-sm transition ${open ? "opacity-100" : "opacity-0"}`}
        />
        <div className={`absolute inset-y-0 left-0 transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <AppSidebar onNavigate={() => setOpen(false)} />
        </div>
      </div>

      <div className="hidden lg:block">
        <AppSidebar />
      </div>

      <main className="flex-1 min-w-0 relative">
        <div className="absolute inset-0 bg-radial-glow opacity-40 pointer-events-none" />
        <div className="relative h-full">
          <MobileMenuContext.Provider value={() => setOpen(true)}>
            <Outlet />
          </MobileMenuContext.Provider>
        </div>
      </main>
    </div>
  );
}
