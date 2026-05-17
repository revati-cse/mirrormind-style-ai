import { Link } from "@tanstack/react-router";

export function BrandMark({ subdued = false }: { subdued?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="relative grid size-7 place-items-center">
        <span className="absolute inset-0 rounded-md bg-gradient-to-tr from-cyan via-magenta to-purple animate-glow opacity-90" />
        <span className="relative size-2.5 rounded-[3px] bg-background ring-1 ring-white/30" />
      </span>
      <span className={`font-serif italic text-[1.35rem] leading-none tracking-tight ${subdued ? "text-foreground" : "text-foreground"}`}>
        MirrorMind
      </span>
    </Link>
  );
}
