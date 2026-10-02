export type EventItem = {
  slug: string;
  name: string;
  category?: string;
  date?: string;
  description?: string;
  image?: string;
  featured?: boolean;
  registrationLink?: string | null;
  status?: string;
  startDate?: string | null;
  endDate?: string | null;
  isLive?: boolean;
};

export const eventsData: EventItem[] = [
  {
    slug: "ahgv-buildverse-2026",
    name: "AHGV BUILDVERSE 2026",
    category: "Hackathon",
    date: "24 October 2026",
    description: "A next-level industry-focused hackathon by HackGyanVerse Community where participants work with real-world industry problems, gain expert exposure and build meaningful solutions.",
    image: "/events/ahgv-2026.jpg",
    featured: true,
    registrationLink: "https://unstop.com/o/Mz70soJ?lb=pX4EFBAh&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Anshufgs99609",
    status: "NOW BUILDING",
    startDate: "2026-10-24T09:00:00+05:30",
    endDate: "2026-10-24T20:00:00+05:30",
    isLive: true
  },
  {
    slug: "hack-energy-2",
    name: "Hack Energy 2.0",
    category: "Hackathon",
    date: "Past",
    description: "Our signature hackathon focused on energy innovation and sustainability.",
    image: "/events/hack-energy-2.jpg",
    featured: false,
    registrationLink: null,
    status: "PAST"
  },
  {
    slug: "hack-energy-1",
    name: "Hack Energy 1.0",
    category: "Hackathon",
    date: "Past",
    description: "The first edition of Hack Energy.",
    image: "/events/hack-energy-1.jpg",
    featured: false,
    registrationLink: null,
    status: "PAST"
  },
  {
    slug: "ai-innovation-summit",
    name: "AI Innovation & Founders Summit",
    category: "Summit",
    date: "Past",
    description: "An AI and innovation-focused summit connected with the founders and emerging technology ecosystem.",
    image: "/events/ai-summit.jpg",
    featured: false,
    registrationLink: null,
    status: "PAST"
  }
];

const liveStatusKeywords = [
  "live",
  "now",
  "now building",
  "ongoing",
  "running",
  "in progress",
  "currently live"
];

const BUILVERSE_POPUP_END_UTC = new Date("2026-10-25T00:00:00+05:30").getTime();

export function isBuildversePopupAllowed(now = Date.now()): boolean {
  return now < BUILVERSE_POPUP_END_UTC;
}

export function isLiveEvent(event?: EventItem | null, now = Date.now()): boolean {
  if (!event) return false;

  if (event.slug === "ahgv-buildverse-2026" && !isBuildversePopupAllowed(now)) {
    return false;
  }

  const status = typeof event.status === "string" ? event.status.trim().toLowerCase() : "";
  if (status && liveStatusKeywords.some((keyword) => status.includes(keyword))) {
    return true;
  }

  if (typeof event.isLive === "boolean") {
    return event.isLive;
  }

  const startTime = event.startDate ? new Date(event.startDate).getTime() : Number.NEGATIVE_INFINITY;
  const endTime = event.endDate ? new Date(event.endDate).getTime() : Number.POSITIVE_INFINITY;

  if (Number.isFinite(startTime) && Number.isFinite(endTime) && now >= startTime && now <= endTime) {
    return true;
  }

  return false;
}

export function getLiveEvent(events: EventItem[] = eventsData, now = Date.now()): EventItem | null {
  if (!events.length) return null;

  const liveEvents = events.filter((event) => isLiveEvent(event, now));

  if (!liveEvents.length) return null;

  return [...liveEvents].sort((a, b) => {
    const featuredWeight = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    if (featuredWeight !== 0) return featuredWeight;
    return a.name.localeCompare(b.name);
  })[0];
}
