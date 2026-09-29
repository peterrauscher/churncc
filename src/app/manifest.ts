import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Churnable — Compare Credit Card & Bank Account Bonuses",
    short_name: "Churnable",
    description:
      "Find and compare the latest credit card welcome offers and bank account bonuses. Maximize your rewards with unbiased, data-driven financial tools.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0160c4",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
