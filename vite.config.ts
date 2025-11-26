import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import type { Plugin, UserConfig } from "vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig as defineVitestConfig } from "vitest/config";

// Custom plugin to handle .sudo files
const sudoFilesPlugin = {
  name: "sudo-files",
  transform(code: string, id: string) {
    if (id.endsWith(".sudo")) {
      return {
        code: `export default ${JSON.stringify(code)}`,
        map: undefined,
      };
    }
  },
};

/**
 * Vite plugin to add cache headers for static assets during development
 */
function staticCacheHeaders(): Plugin {
  return {
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        // Cache font files for 1 year in development
        if (request.url?.startsWith("/fonts/")) {
          response.setHeader(
            "Cache-Control",
            "public, max-age=31536000, immutable",
          );
        }
        next();
      });
    },
    name: "static-cache-headers",
  };
}

const sharedConfig: UserConfig = {
  plugins: [
    tailwindcss(),
    !process.env.VITEST && reactRouter(),
    tsconfigPaths(),
    staticCacheHeaders(),
    sudoFilesPlugin,
  ],
  server: { port: 3000 },
};

const testConfig = defineVitestConfig({
  test: {
    projects: [
      {
        ...sharedConfig,
        test: { include: ["app/**/*.test.ts"], name: "unit-tests" },
      },
      {
        ...sharedConfig,
        test: {
          globalSetup: "app/test/vitest.global-setup.ts",
          include: ["app/**/*.spec.ts"],
          name: "integration-tests",
          setupFiles: ["app/test/setup-server-test-environment.ts"],
        },
      },
      {
        ...sharedConfig,
        test: {
          environment: "happy-dom",
          include: ["app/**/*.test.tsx"],
          name: "react-happy-dom-tests",
          setupFiles: ["app/test/setup-browser-test-environment.ts"],
        },
      },
    ],
  },
});

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  ...testConfig,
  // TODO: Remove this workaround once React includes renderToPipeableStream in
  // the Bun entrypoint. See: https://github.com/facebook/react/pull/34193
  resolve:
    command === "build"
      ? { alias: { "react-dom/server": "react-dom/server.node" } }
      : undefined,
}));
