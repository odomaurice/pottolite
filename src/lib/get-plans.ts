import { parsePlans, PLANS_ENDPOINT, type Plan } from "./plans";

export async function getPlans(): Promise<Plan[] | null> {
  try {
    const res = await fetch(PLANS_ENDPOINT, {
      next: { revalidate: 3600, tags: ["plans"] },
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.warn(`[plans] ${PLANS_ENDPOINT} responded ${res.status}`);
      return null;
    }

    return parsePlans(await res.json());
  } catch (error) {
    console.warn("[plans] request failed:", error);
    return null;
  }
}
