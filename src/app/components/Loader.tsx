import { cn } from "@/lib";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  title?: string;
  className?: string;
  titleClassName?: string;
}

export function Loader({
  title,
  className,
  titleClassName,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "w-screen h-screen flex flex-col items-center justify-center",
        className
      )}
    >
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
      {title && (
        <p className={cn("mt-2 text-sm text-muted-foreground", titleClassName)}>
          {title}
        </p>
      )}
    </div>
  );
}
