export type SocialLink = {
  id: "x" | "linkedin" | "youtube" | "facebook";
  name: string;
  handle: string;
  href: string | null;
  actionLabel: string;
  ariaLabel: string;
};

export const socialLinks: SocialLink[] = [
  {
    id: "x",
    name: "X",
    handle: "@churncc",
    href: "https://x.com/intent/follow?screen_name=churncc",
    actionLabel: "Follow",
    ariaLabel: "Follow Churnable on X",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "Churnable",
    href: "https://www.linkedin.com/company/churnable/",
    actionLabel: "Follow",
    ariaLabel: "Follow Churnable on LinkedIn",
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "@churncc",
    href: "https://www.youtube.com/@churncc",
    actionLabel: "Subscribe",
    ariaLabel: "Subscribe to Churnable on YouTube",
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "Churnable",
    href: null,
    actionLabel: "Coming soon",
    ariaLabel: "Churnable on Facebook (coming soon)",
  },
];
