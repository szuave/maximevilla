import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Renocheck",
    short_name: "Renocheck",
    description:
      "Producten, events en ledenportaal voor bouwprofessionals — goodies, planners, borden en interieurcollecties.",
    start_url: "/",
    display: "standalone",
    background_color: "#F1E8D2",
    theme_color: "#C9A876",
    lang: "nl-BE",
    orientation: "portrait-primary",
    categories: ["business", "productivity", "shopping"],
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
