import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-medium tracking-widest uppercase",
        "text-[#C5A880] border border-[#C5A880]/20 bg-[#C5A880]/5",
        "px-3 py-1 rounded-sm",
        className
      )}
    >
      {children}
    </span>
  );
}