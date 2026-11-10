import { Badge } from "@/components/ui/badge";
import type { Register } from "@/data/types";
import { cn } from "@/lib/utils";

const REGISTER_STYLE: Record<Register, string> = {
  "нейтр.": "border-border text-muted-foreground",
  "разг.": "border-chart-2/50 bg-chart-2/10 text-chart-2",
  "офиц.": "border-primary/40 bg-primary/10 text-primary",
};

const REGISTER_FULL: Record<Register, string> = {
  "нейтр.": "нейтральное",
  "разг.": "разговорное, профессиональное",
  "офиц.": "официально-деловое",
};

export function RegisterBadge({
  register,
  className,
}: {
  register: Register;
  className?: string;
}) {
  return (
    <span
      title={`Стилистическая помета: ${REGISTER_FULL[register]}`}
      className={cn("inline-flex", className)}
    >
      <Badge
        variant="outline"
        className={cn("border font-medium", REGISTER_STYLE[register])}
      >
        {register}
      </Badge>
    </span>
  );
}
