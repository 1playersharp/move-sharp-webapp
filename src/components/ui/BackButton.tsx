"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

// Returns to whatever the visitor was looking at before, rather than a fixed
// destination — someone who arrived at sign-in from the pricing section of the
// landing page should land back there, not at the top of it.
//
// History is not guaranteed: a visitor who opened /sign-in directly, from a
// bookmark or a link in an email, has nothing to go back to and router.back()
// would do nothing at all. Fall back to the intro page so the button is never
// dead.
export function BackButton({
  fallback = "/",
  label = "Go back",
  className = "w-full",
  size = "md",
}: {
  fallback?: string;
  label?: string;
  className?: string;
  /** Defaults to md so it matches the primary submit button it sits under. */
  size?: "sm" | "md" | "lg";
}) {
  const router = useRouter();

  return (
    <Button
      variant="secondary"
      size={size}
      className={className}
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          router.back();
        } else {
          router.push(fallback);
        }
      }}
    >
      ← {label}
    </Button>
  );
}
