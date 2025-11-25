import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";
import { flatRoutes } from "remix-flat-routes";

const stealthMode = process.env.STEALTH_MODE === "true";

export default remixRoutesOptionAdapter((defineRoutes) => {
  if (stealthMode) {
    return defineRoutes((route) => {
      route("/", "routes/_index.tsx", { index: true });
      route("/contact-sales", "routes/contact-us.tsx");
    });
  }

  return flatRoutes("routes", defineRoutes, {
    ignoredRouteFiles: [
      "**/.*", // Ignore dotfiles like .DS_Store
      "**/*.{test,spec}.{js,jsx,ts,tsx}",
      // This is for server-side utilities you want to colocate next to your
      // routes without making an additional directory. If you need a route that
      // includes "server" or "client" in the filename, use the escape brackets
      // like: my-route.[server].tsx.
      "**/*.server.*",
      "**/*.client.*",
    ],
  });
});
