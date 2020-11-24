/* --- dev helper functions --- */
export function AssertClientSide() {
  return typeof window !== "undefined";
}

export function AssertServerSide() {
  return typeof window === "undefined";
}

// --- Slugify Title --- //
export function slugifyTitle(title: string): string {
  return title.replace(/\s+$/g, "").replace(/\s+/g, "-").toLowerCase();
}
