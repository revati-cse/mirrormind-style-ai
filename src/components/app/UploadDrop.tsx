import { Upload } from "lucide-react";
import { useRef, useState } from "react";

export function UploadDrop({ label = "Drop your image", hint, onFile }: { label?: string; hint?: string; onFile?: (f: File) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const handle = (f?: File | null) => {
    if (!f) return;
    setPreview(URL.createObjectURL(f));
    onFile?.(f);
  };
  return (
    <div
      onClick={() => ref.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => { e.preventDefault(); handle(e.dataTransfer.files?.[0]); }}
      className="relative aspect-[4/5] rounded-3xl border border-dashed border-white/15 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan/40 transition cursor-pointer overflow-hidden grid place-items-center"
    >
      {preview ? (
        <img src={preview} alt="upload preview" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="text-center px-6">
          <div className="size-12 mx-auto rounded-2xl bg-cyan/10 grid place-items-center mb-4 ring-1 ring-cyan/20">
            <Upload className="size-5 text-cyan" />
          </div>
          <p className="text-foreground font-medium">{label}</p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
      )}
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => handle(e.target.files?.[0])} />
    </div>
  );
}
