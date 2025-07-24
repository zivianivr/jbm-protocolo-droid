import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="w-8 h-8 rounded-lg jbm-gradient flex items-center justify-center">
        <span className="text-white font-bold text-sm">JBM</span>
      </div>
      <span className="text-2xl font-bold tracking-tight">
        <span className="text-foreground">JBM</span>{" "}
        <span className="text-primary">TELECOM</span>
      </span>
    </div>
  );
}