import { Search, MapPin, Calendar, DollarSign, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchField = {
  icon: React.ElementType;
  label: string;
  value: string;
};

const fields: SearchField[] = [
  {
    icon: MapPin,
    label: "Location",
    value: "Address, City Or Zip",
  },
  {
    icon: Calendar,
    label: "Date/Duration",
    value: "Anytime/3 Days",
  },
  {
    icon: DollarSign,
    label: "Budget",
    value: "$0–$3000",
  },
  {
    icon: Users,
    label: "People",
    value: "5–10",
  },
];

export function HeroSearch({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={cn(
            "relative flex items-center gap-3 rounded-xl border border-border bg-background p-1 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80",
            className,
          )}
        >
          {fields.map((field) => (
            <div
              key={field.label}
              className="flex flex-col items-center gap-1.5 px-3 py-2 text-sm"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-primary">
                <field.icon className="h-4 w-4" />
              </div>
              <div className="text-foreground/70">{field.label}</div>
              <div className="text-foreground">{field.value}</div>
            </div>
          ))}
          <button className="flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors">
            Search <Search className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
