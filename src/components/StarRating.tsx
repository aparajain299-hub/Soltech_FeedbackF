import { Star } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type StarRatingProps = {
  value: number;
  onChange: (value: number) => void;
  label: string;
  name: string;
  invalid?: boolean;
};

const STARS = [1, 2, 3, 4, 5];

export function StarRating({ value, onChange, label, name, invalid }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  return (
    <div
      role="radiogroup"
      aria-label={label}
      aria-required="true"
      aria-invalid={invalid ? true : undefined}
      className="flex items-center gap-1 sm:gap-2"
      onMouseLeave={() => setHovered(0)}
    >
      {STARS.map((star) => {
        const filled = star <= active;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            name={name}
            aria-checked={value === star}
            aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
            tabIndex={value === star || (value === 0 && star === 1) ? 0 : -1}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onFocus={() => setHovered(star)}
            onBlur={() => setHovered(0)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowUp") {
                event.preventDefault();
                onChange(Math.min(5, (value || 0) + 1));
              }
              if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
                event.preventDefault();
                onChange(Math.max(1, (value || 1) - 1));
              }
            }}
            className={cn(
              "rounded-xl p-1.5 transition-transform duration-150 outline-none",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "hover:scale-110 active:scale-95",
            )}
          >
            <Star
              className={cn(
                "size-9 transition-colors duration-150 sm:size-10",
                filled ? "text-accent" : "text-border",
              )}
              fill={filled ? "currentColor" : "transparent"}
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}
