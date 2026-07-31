import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MirageFi",
    short_name: "MirageFi",
    description:
      "Swap tokenized real-world assets on Robinhood Chain, at prices anchored to the live mid.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6efe2",
    theme_color: "#f6efe2",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
