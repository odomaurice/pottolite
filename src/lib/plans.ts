export const PLANS_ENDPOINT = "https://core-api.potto.ng/api/plans";

/**
 * The real app's plan page, where a school actually activates a plan.
 */
export const activateUrl = (planId: string) =>
  `https://core.potto.ng/app/plan-detail/${planId}`;

export type PlanApp = {
  id: string;
  name: string;
  icon: string;
  desc: string;
  altUrl: string;
};

export type Plan = {
  id: string;
  name: string;
  price: number;
  icon: string;
  desc: string;
  pageTitle: string;
  shortDesc: string;
  onCustomization: boolean;
  onManagedService: boolean;
  apps: PlanApp[];
};

const str = (value: unknown) => (typeof value === "string" ? value : "");


export function parsePlans(body: unknown): Plan[] | null {
  if (!body || typeof body !== "object") return null;
  const { status, data } = body as { status?: unknown; data?: unknown };
  if (status !== true || !Array.isArray(data)) return null;

  const plans = data.flatMap((raw): Plan[] => {
    if (!raw || typeof raw !== "object") return [];
    const plan = raw as Record<string, unknown>;
    if (
      typeof plan._id !== "string" ||
      typeof plan.name !== "string" ||
      typeof plan.price !== "number"
    ) {
      return [];
    }

    const apps = (Array.isArray(plan.apps) ? plan.apps : []).flatMap(
      (entry): PlanApp[] => {
        if (!entry || typeof entry !== "object") return [];
        const { app, altUrl } = entry as { app?: unknown; altUrl?: unknown };
        if (!app || typeof app !== "object") return [];
        const inner = app as Record<string, unknown>;
        if (typeof inner._id !== "string" || typeof inner.name !== "string") {
          return [];
        }
        return [
          {
            id: inner._id,
            name: inner.name,
            icon: str(inner.icon),
            desc: str(inner.desc),
            altUrl: str(altUrl),
          },
        ];
      },
    );

    return [
      {
        id: plan._id,
        name: plan.name,
        price: plan.price,
        icon: str(plan.icon),
        desc: str(plan.desc),
        pageTitle: str(plan.pageTitle),
        shortDesc: str(plan.shortDesc),
        onCustomization: plan.onCustomization === true,
        onManagedService: plan.onManagedService === true,
        apps,
      },
    ];
  });

  return plans.length ? plans.sort((a, b) => a.price - b.price) : null;
}

/**
 * "Free", or the price in naira with thousands separators.
 *
 * Grouped by hand rather than through Intl so the server render and the
 * browser render are guaranteed to produce identical strings.
 */
export function formatPrice(price: number) {
  if (price <= 0) return "Free";
  return `₦${Math.round(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

/** The API names are bare ("Suite"); the product is "Potto Suite". */
export const planTitle = (plan: Plan) => `Potto ${plan.name}`;

/**
 * A one-line description of the plan.
 *
 * `pageTitle` and `desc` are used inconsistently across plans in the API:
 * sometimes a real tagline, sometimes just the plan's name again ("Potto Free
 * Plan", "Potto Enterprise"). This takes the first of the two that says
 * something beyond the name.
 */
export function planTagline(plan: Plan) {
  const name = plan.name.toLowerCase();
  const restatesName = (text: string) =>
    text
      .toLowerCase()
      .replace(/potto|plan/g, "")
      .replace(name, "")
      .replace(/[^a-z]/g, "") === "";

  return (
    [plan.pageTitle, plan.desc].find(
      (text) => text.trim() !== "" && !restatesName(text),
    ) ?? ""
  );
}

/** The plan an excluded app is available on, when its altUrl names one. */
export function upgradeFor(app: PlanApp, plans: Plan[]) {
  if (!app.altUrl) return null;
  const id = app.altUrl.split("/").filter(Boolean).pop();
  return plans.find((plan) => plan.id === id) ?? null;
}

/**
 * Reduces an app name to what follows "Potto", for matching.
 *
 * The site's labels and the API's differ ("Potto Assess" against
 * "PottoAssess", "Potto Pocket" against "Pocket"); both become "assess",
 * "pocket". A name with no API counterpart (Potto Comm) simply matches
 * nothing, rather than being guessed at.
 */
const appKey = (name: string) =>
  name.toLowerCase().replace(/potto/g, "").replace(/[^a-z]/g, "");

/** The plans that include an app, cheapest first. */
export function plansIncluding(appName: string, plans: Plan[]) {
  const wanted = appKey(appName);
  return plans.filter((plan) =>
    plan.apps.some((app) => !app.altUrl && appKey(app.name) === wanted),
  );
}

/** An app's own entry in the plans data — its icon and description. */
export function findApp(appName: string, plans: Plan[]) {
  const wanted = appKey(appName);
  for (const plan of plans) {
    const app = plan.apps.find((candidate) => appKey(candidate.name) === wanted);
    if (app) return app;
  }
  return null;
}
