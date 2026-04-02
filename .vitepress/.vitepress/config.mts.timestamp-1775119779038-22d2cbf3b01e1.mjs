// .vitepress/.vitepress/config.mts
import { defineConfig } from "file:///C:/daten/github/guthrie/node_modules/.pnpm/vitepress@1.6.4_@algolia+cl_02fa6ea0ad937a775e105c897ef0024d/node_modules/vitepress/dist/node/index.js";
import { groupIconMdPlugin, groupIconVitePlugin } from "file:///C:/daten/github/guthrie/node_modules/.pnpm/vitepress-plugin-group-icon_54c55efba2d2e91c66dbc93a3594a4f0/node_modules/vitepress-plugin-group-icons/dist/index.mjs";
import { sidebarPlugin } from "file:///C:/daten/github/guthrie/node_modules/.pnpm/@ogs-gmbh+vitepress-plugin-sidebar@1.0.3/node_modules/@ogs-gmbh/vitepress-plugin-sidebar/public-api.mjs";

// package.json
var package_default = {
  name: "@ogs-gmbh/guthrie",
  version: "0.0.0",
  description: "Guthrie is a JSON renderer for user interfaces built with React.",
  keywords: [
    "react",
    "reactjs",
    "ui",
    "user-interface",
    "json",
    "json-renderer",
    "json-driven-ui",
    "dynamic-ui",
    "ui-renderer",
    "component-rendering",
    "frontend",
    "web-development",
    "react-components",
    "declarative-ui",
    "configuration-driven",
    "schema-driven-ui",
    "low-code",
    "no-code",
    "ui-framework",
    "ui-engine"
  ],
  homepage: "https://ogs-gmbh.github.io/guthrie/",
  bugs: "https://github.com/OGS-GmbH/guthrie/issues",
  license: "MIT",
  author: "OGS GmbH",
  contributors: [
    {
      name: "Simon Kovtyk",
      email: "simon@kovtyk.com",
      url: "https://simonkov.dev"
    },
    {
      name: "David Schummer",
      email: "david.schummer@ogs.de"
    }
  ],
  exports: {
    "./hooks/event": "./dist/main/hooks/event.mjs",
    "./options/config": "./dist/main/options/config.mjs",
    "./options/elements": "./dist/main/options/elements.mjs",
    "./options/fns": "./dist/main/options/fns.mjs",
    "./options/operations": "./dist/main/options/operations.mjs",
    "./options/variables": "./dist/main/options/variables.mjs",
    "./public-api": "./dist/main/public-api.mjs",
    "./renderer/fns": "./dist/main/renderer/fns.mjs",
    "./renderer/operations": "./dist/main/renderer/operations.mjs",
    "./renderer/props": "./dist/main/renderer/props.mjs",
    "./renderer/type": "./dist/main/renderer/type.mjs",
    "./renderer/variables": "./dist/main/renderer/variables.mjs",
    "./stores/elements": "./dist/main/stores/elements.mjs",
    "./stores/events": "./dist/main/stores/events.mjs",
    "./stores/events-config": "./dist/main/stores/events-config.mjs",
    "./stores/fns": "./dist/main/stores/fns.mjs",
    "./stores/operators": "./dist/main/stores/operators.mjs",
    "./stores/refs": "./dist/main/stores/refs.mjs",
    "./stores/templates": "./dist/main/stores/templates.mjs",
    "./stores/variables": "./dist/main/stores/variables.mjs",
    "./package.json": "./package.json"
  },
  repository: "https://github.com/OGS-GmbH/guthrie",
  type: "module",
  scripts: {
    build: "tsdown",
    "ci:build:main:production": "node .esbuild/build.mjs",
    "ci:docs:extract:typedoc": "typedoc",
    "ci:docs:main:vitepress": "bash ./.vitepress/scripts/pre-vitepress.sh && vitepress build .vitepress",
    "ci:pr:commitlint:main:commitlint": "commitlint",
    "ci:pr:lint:main:eslint": "eslint .",
    "ci:pr:lint:main:oxlint": "oxlint .",
    "ci:test:main:vitest": "vitest run --coverage",
    commit: "commit",
    prepare: "husky",
    vitepress: "bash ./.vitepress/scripts/pre-vitepress.sh && vitepress dev .vitepress",
    "vitepress:preview": "vitepress preview .vitepress"
  },
  dependencies: {
    "@ogs-gmbh/react-hooks": "^1.0.0",
    "@vitejs/plugin-react": "^6.0.1",
    axios: "^1.13.6",
    "html-react-parser": "^5.2.17",
    react: "^19.2.4",
    zustand: "^5.0.12"
  },
  devDependencies: {
    "@commitlint/cli": "^20.5.0",
    "@commitlint/config-conventional": "^20.5.0",
    "@commitlint/prompt-cli": "^20.5.0",
    "@eslint/json": "^0.14.0",
    "@eslint/markdown": "^7.5.1",
    "@ogs-gmbh/linter": "^2.0.4",
    "@ogs-gmbh/oxlint-presets": "^1.0.4",
    "@ogs-gmbh/vitepress-plugin-sidebar": "^1.0.3",
    "@ogs-gmbh/vitepress-theme": "^1.1.0",
    "@testing-library/react": "^16.3.2",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitest/coverage-v8": "^4.1.2",
    esbuild: "^0.27.4",
    "esbuild-plugin-d.ts": "^1.3.1",
    "esbuild-plugin-file-copy": "2.0.0-next.0",
    "esbuild-plugin-file-path-extensions": "^2.1.4",
    "esbuild-plugin-package-json": "^2.0.0",
    eslint: "^9.39.4",
    "fast-glob": "^3.3.3",
    husky: "^9.1.7",
    jsdom: "^29.0.1",
    "lint-staged": "^16.4.0",
    "npm-package-json-lint": "^9.1.0",
    oxlint: "^1.57.0",
    "react-dom": "^19.2.4",
    "sass-embedded": "^1.98.0",
    tsdown: "^0.21.6",
    typedoc: "^0.28.18",
    "typedoc-plugin-frontmatter": "^1.3.1",
    "typedoc-plugin-markdown": "^4.11.0",
    typescript: "^5.9.3",
    "typescript-eslint": "^8.57.2",
    vite: "^8.0.3",
    vitepress: "^1.6.4",
    "vitepress-plugin-group-icons": "^1.7.3",
    vitest: "^4.1.2"
  },
  publishConfig: {
    directory: "dist/main"
  }
};

// .vitepress/.vitepress/config.mts
var config_default = defineConfig({
  title: "_ts-template",
  description: "A project template with a ready-to-use structure.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    externalLinkIcon: true,
    search: {
      provider: "local"
    },
    logo: {
      light: "https://raw.githubusercontent.com/OGS-GmbH/.github/refs/tags/v1.0.0/docs/assets/logo/dark.svg",
      dark: "https://raw.githubusercontent.com/OGS-GmbH/.github/refs/tags/v1.0.0/docs/assets/logo/light.svg",
      alt: "OGS GmbH Logo"
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: 'Copyright \xA9 2026 \u2014 present <a target="_blank" href="https://www.ogs.de/en/">OGS GmbH</a>'
    },
    nav: [
      { text: "Guide", link: "/guide" },
      { text: "Reference", link: "/reference" },
      { text: package_default.version, items: [
        { text: "Repository", link: "https://github.com/OGS-GmbH/_ts-template" },
        { text: "Changelog", link: "https://github.com/OGS-GmbH/_ts-template/blob/main/CHANGELOG.md" },
        { text: "Contributing", link: "/other/contributing" }
      ] }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/OGS-GmbH" },
      { icon: "facebook", link: "https://www.facebook.com/OGS.GmbH" },
      { icon: { svg: '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 382 382"><path d="M347.445 0H34.555C15.471 0 0 15.471 0 34.555v312.889C0 366.529 15.471 382 34.555 382h312.889C366.529 382 382 366.529 382 347.444V34.555C382 15.471 366.529 0 347.445 0zM118.207 329.844c0 5.554-4.502 10.056-10.056 10.056H65.345c-5.554 0-10.056-4.502-10.056-10.056V150.403c0-5.554 4.502-10.056 10.056-10.056h42.806c5.554 0 10.056 4.502 10.056 10.056v179.441zM86.748 123.432c-22.459 0-40.666-18.207-40.666-40.666S64.289 42.1 86.748 42.1s40.666 18.207 40.666 40.666-18.206 40.666-40.666 40.666zM341.91 330.654a9.247 9.247 0 0 1-9.246 9.246H286.73a9.247 9.247 0 0 1-9.246-9.246v-84.168c0-12.556 3.683-55.021-32.813-55.021-28.309 0-34.051 29.066-35.204 42.11v97.079a9.246 9.246 0 0 1-9.246 9.246h-44.426a9.247 9.247 0 0 1-9.246-9.246V149.593a9.247 9.247 0 0 1 9.246-9.246h44.426a9.247 9.247 0 0 1 9.246 9.246v15.655c10.497-15.753 26.097-27.912 59.312-27.912 73.552 0 73.131 68.716 73.131 106.472v86.846z"/></svg>' }, link: "https://www.linkedin.com/company/41198063/" },
      { icon: "xing", link: "https://www.xing.com/pages/ogsgmbh" },
      { icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></svg>' }, link: "https://www.ogs.de/en/" },
      { icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302L140-685v465h680v-465L480-462Zm0-60 336-218H145l335 218ZM140-685v-55 520-465Z"/></svg>' }, link: "mailto:info@ogs.de" }
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting started", link: "/guide/" }
        ]
      },
      sidebarPlugin({
        path: "./dist/vitepress-src/reference",
        normalizeDirNames: true
      }),
      {
        text: "Other",
        items: [
          { text: "Contributing", link: "/other/contributing" },
          { text: "Code of Conduct", link: "/other/code-of-conduct" }
        ]
      },
      {
        text: "Legal",
        items: [
          { text: "Disclaimer", link: "/legal/disclaimer" },
          { text: "MIT License", link: "/legal/license" },
          { text: "Copyright \xA9 2026 \u2014 present OGS GmbH", link: "https://www.ogs.de/en/" }
        ]
      }
    ]
  },
  head: [
    ["link", { rel: "shortcut icon", href: "https://raw.githubusercontent.com/OGS-GmbH/.github/refs/tags/v1.1.0/docs/assets/favicon/favicon.ico" }],
    ["link", { rel: "apple-touch-icon", href: "https://raw.githubusercontent.com/OGS-GmbH/.github/refs/tags/v1.1.0/docs/assets/favicon/apple-touch-icon.png" }],
    ["link", { rel: "manifest", href: "site.webmanifest" }],
    ["link", { rel: "icon", type: "image/svg+xml", href: "https://raw.githubusercontent.com/OGS-GmbH/.github/refs/tags/v1.1.0/docs/assets/favicon/favicon.svg" }],
    ["link", { rel: "icon", type: "image/png", href: "https://raw.githubusercontent.com/OGS-GmbH/.github/refs/tags/v1.1.0/docs/assets/favicon/favicon-96x96.png", sizes: "96x96" }]
  ],
  base: "/_ts-template/",
  srcDir: "../dist/vitepress-src",
  outDir: "../dist/docs",
  titleTemplate: ":title - OGS _ts-template",
  cleanUrls: true,
  appearance: true,
  markdown: {
    /* eslint-disable-next-line @tseslint/typedef */
    config(md) {
      md.use(groupIconMdPlugin);
    }
  },
  vite: {
    plugins: [
      groupIconVitePlugin()
    ]
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcZGF0ZW5cXFxcZ2l0aHViXFxcXGd1dGhyaWVcXFxcLnZpdGVwcmVzc1xcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxkYXRlblxcXFxnaXRodWJcXFxcZ3V0aHJpZVxcXFwudml0ZXByZXNzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovZGF0ZW4vZ2l0aHViL2d1dGhyaWUvLnZpdGVwcmVzcy8udml0ZXByZXNzL2NvbmZpZy5tdHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnXG5pbXBvcnQgeyBncm91cEljb25NZFBsdWdpbiwgZ3JvdXBJY29uVml0ZVBsdWdpbiB9IGZyb20gXCJ2aXRlcHJlc3MtcGx1Z2luLWdyb3VwLWljb25zXCJcbmltcG9ydCB7IHNpZGViYXJQbHVnaW4gfSBmcm9tICBcIkBvZ3MtZ21iaC92aXRlcHJlc3MtcGx1Z2luLXNpZGViYXJcIjtcbmltcG9ydCBwYWNrYWdlSnNvbiBmcm9tIFwiLi4vLi4vcGFja2FnZS5qc29uXCI7XG5cbi8vIGh0dHBzOi8vdml0ZXByZXNzLmRldi9yZWZlcmVuY2Uvc2l0ZS1jb25maWdcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHRpdGxlOiBcIl90cy10ZW1wbGF0ZVwiLFxuICBkZXNjcmlwdGlvbjogXCJBIHByb2plY3QgdGVtcGxhdGUgd2l0aCBhIHJlYWR5LXRvLXVzZSBzdHJ1Y3R1cmUuXCIsXG4gIHRoZW1lQ29uZmlnOiB7XG4gICAgLy8gaHR0cHM6Ly92aXRlcHJlc3MuZGV2L3JlZmVyZW5jZS9kZWZhdWx0LXRoZW1lLWNvbmZpZ1xuICAgIGV4dGVybmFsTGlua0ljb246IHRydWUsXG4gICAgc2VhcmNoOiB7XG4gICAgICBwcm92aWRlcjogXCJsb2NhbFwiXG4gICAgfSxcbiAgICBsb2dvOiB7XG4gICAgICBsaWdodDogXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vT0dTLUdtYkgvLmdpdGh1Yi9yZWZzL3RhZ3MvdjEuMC4wL2RvY3MvYXNzZXRzL2xvZ28vZGFyay5zdmdcIixcbiAgICAgIGRhcms6IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL09HUy1HbWJILy5naXRodWIvcmVmcy90YWdzL3YxLjAuMC9kb2NzL2Fzc2V0cy9sb2dvL2xpZ2h0LnN2Z1wiLFxuICAgICAgYWx0OiBcIk9HUyBHbWJIIExvZ29cIlxuICAgIH0sXG4gICAgZm9vdGVyOiB7XG4gICAgICBtZXNzYWdlOiBcIlJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cIixcbiAgICAgIGNvcHlyaWdodDogJ0NvcHlyaWdodCBcdTAwQTkgMjAyNiBcdTIwMTQgcHJlc2VudCA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cub2dzLmRlL2VuL1wiPk9HUyBHbWJIPC9hPidcbiAgICB9LFxuICAgIG5hdjogW1xuICAgICAgeyB0ZXh0OiBcIkd1aWRlXCIsIGxpbms6IFwiL2d1aWRlXCIgfSxcbiAgICAgIHsgdGV4dDogXCJSZWZlcmVuY2VcIiwgbGluazogXCIvcmVmZXJlbmNlXCIgfSxcbiAgICAgIHsgdGV4dDogcGFja2FnZUpzb24udmVyc2lvbiwgaXRlbXM6IFtcbiAgICAgICAgeyB0ZXh0OiBcIlJlcG9zaXRvcnlcIiwgbGluazogXCJodHRwczovL2dpdGh1Yi5jb20vT0dTLUdtYkgvX3RzLXRlbXBsYXRlXCIgfSxcbiAgICAgICAgeyB0ZXh0OiBcIkNoYW5nZWxvZ1wiLCBsaW5rOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9PR1MtR21iSC9fdHMtdGVtcGxhdGUvYmxvYi9tYWluL0NIQU5HRUxPRy5tZFwiIH0sXG4gICAgICAgIHsgdGV4dDogXCJDb250cmlidXRpbmdcIiwgbGluazogXCIvb3RoZXIvY29udHJpYnV0aW5nXCIgfSxcbiAgICAgIF0gfVxuICAgIF0sXG4gICAgc29jaWFsTGlua3M6IFtcbiAgICAgIHsgaWNvbjogXCJnaXRodWJcIiwgbGluazogXCJodHRwczovL2dpdGh1Yi5jb20vT0dTLUdtYkhcIiB9LFxuICAgICAgeyBpY29uOiBcImZhY2Vib29rXCIsIGxpbms6IFwiaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL09HUy5HbWJIXCIgfSxcbiAgICAgIHsgaWNvbjogeyBzdmc6ICc8c3ZnIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIiB2aWV3Qm94PVwiMCAwIDM4MiAzODJcIj48cGF0aCBkPVwiTTM0Ny40NDUgMEgzNC41NTVDMTUuNDcxIDAgMCAxNS40NzEgMCAzNC41NTV2MzEyLjg4OUMwIDM2Ni41MjkgMTUuNDcxIDM4MiAzNC41NTUgMzgyaDMxMi44ODlDMzY2LjUyOSAzODIgMzgyIDM2Ni41MjkgMzgyIDM0Ny40NDRWMzQuNTU1QzM4MiAxNS40NzEgMzY2LjUyOSAwIDM0Ny40NDUgMHpNMTE4LjIwNyAzMjkuODQ0YzAgNS41NTQtNC41MDIgMTAuMDU2LTEwLjA1NiAxMC4wNTZINjUuMzQ1Yy01LjU1NCAwLTEwLjA1Ni00LjUwMi0xMC4wNTYtMTAuMDU2VjE1MC40MDNjMC01LjU1NCA0LjUwMi0xMC4wNTYgMTAuMDU2LTEwLjA1Nmg0Mi44MDZjNS41NTQgMCAxMC4wNTYgNC41MDIgMTAuMDU2IDEwLjA1NnYxNzkuNDQxek04Ni43NDggMTIzLjQzMmMtMjIuNDU5IDAtNDAuNjY2LTE4LjIwNy00MC42NjYtNDAuNjY2UzY0LjI4OSA0Mi4xIDg2Ljc0OCA0Mi4xczQwLjY2NiAxOC4yMDcgNDAuNjY2IDQwLjY2Ni0xOC4yMDYgNDAuNjY2LTQwLjY2NiA0MC42NjZ6TTM0MS45MSAzMzAuNjU0YTkuMjQ3IDkuMjQ3IDAgMCAxLTkuMjQ2IDkuMjQ2SDI4Ni43M2E5LjI0NyA5LjI0NyAwIDAgMS05LjI0Ni05LjI0NnYtODQuMTY4YzAtMTIuNTU2IDMuNjgzLTU1LjAyMS0zMi44MTMtNTUuMDIxLTI4LjMwOSAwLTM0LjA1MSAyOS4wNjYtMzUuMjA0IDQyLjExdjk3LjA3OWE5LjI0NiA5LjI0NiAwIDAgMS05LjI0NiA5LjI0NmgtNDQuNDI2YTkuMjQ3IDkuMjQ3IDAgMCAxLTkuMjQ2LTkuMjQ2VjE0OS41OTNhOS4yNDcgOS4yNDcgMCAwIDEgOS4yNDYtOS4yNDZoNDQuNDI2YTkuMjQ3IDkuMjQ3IDAgMCAxIDkuMjQ2IDkuMjQ2djE1LjY1NWMxMC40OTctMTUuNzUzIDI2LjA5Ny0yNy45MTIgNTkuMzEyLTI3LjkxMiA3My41NTIgMCA3My4xMzEgNjguNzE2IDczLjEzMSAxMDYuNDcydjg2Ljg0NnpcIi8+PC9zdmc+JyB9LCBsaW5rOiBcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9jb21wYW55LzQxMTk4MDYzL1wiIH0sXG4gICAgICB7IGljb246IFwieGluZ1wiLCBsaW5rOiBcImh0dHBzOi8vd3d3LnhpbmcuY29tL3BhZ2VzL29nc2dtYmhcIiB9LFxuICAgICAgeyBpY29uOiB7IHN2ZzogJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48Y2lyY2xlIGN4PVwiMTJcIiBjeT1cIjEyXCIgcj1cIjEwXCIvPjxwYXRoIGQ9XCJNMTIgMmExNC41IDE0LjUgMCAwIDAgMCAyMCAxNC41IDE0LjUgMCAwIDAgMC0yME0yIDEyaDIwXCIvPjwvc3ZnPicgfSwgbGluazogXCJodHRwczovL3d3dy5vZ3MuZGUvZW4vXCIgfSxcbiAgICAgIHsgaWNvbjogeyBzdmc6ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAtOTYwIDk2MCA5NjBcIj48cGF0aCBkPVwiTTE0MC0xNjBxLTI0IDAtNDItMTh0LTE4LTQydi01MjBxMC0yNCAxOC00MnQ0Mi0xOGg2ODBxMjQgMCA0MiAxOHQxOCA0MnY1MjBxMCAyNC0xOCA0MnQtNDIgMThIMTQwWm0zNDAtMzAyTDE0MC02ODV2NDY1aDY4MHYtNDY1TDQ4MC00NjJabTAtNjAgMzM2LTIxOEgxNDVsMzM1IDIxOFpNMTQwLTY4NXYtNTUgNTIwLTQ2NVpcIi8+PC9zdmc+JyB9LCBsaW5rOiBcIm1haWx0bzppbmZvQG9ncy5kZVwiIH1cbiAgICBdLFxuICAgIHNpZGViYXI6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJHdWlkZVwiLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogXCJHZXR0aW5nIHN0YXJ0ZWRcIiwgbGluazogXCIvZ3VpZGUvXCIgfSxcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHNpZGViYXJQbHVnaW4oe1xuICAgICAgICBwYXRoOiBcIi4vZGlzdC92aXRlcHJlc3Mtc3JjL3JlZmVyZW5jZVwiLFxuICAgICAgICBub3JtYWxpemVEaXJOYW1lczogdHJ1ZVxuICAgICAgfSksXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiT3RoZXJcIixcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6IFwiQ29udHJpYnV0aW5nXCIsIGxpbms6IFwiL290aGVyL2NvbnRyaWJ1dGluZ1wiIH0sXG4gICAgICAgICAgeyB0ZXh0OiBcIkNvZGUgb2YgQ29uZHVjdFwiLCBsaW5rOiBcIi9vdGhlci9jb2RlLW9mLWNvbmR1Y3RcIiB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiTGVnYWxcIixcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6IFwiRGlzY2xhaW1lclwiLCBsaW5rOiBcIi9sZWdhbC9kaXNjbGFpbWVyXCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiTUlUIExpY2Vuc2VcIiwgbGluazogXCIvbGVnYWwvbGljZW5zZVwiIH0sXG4gICAgICAgICAgeyB0ZXh0OiBcIkNvcHlyaWdodCBcdTAwQTkgMjAyNiBcdTIwMTQgcHJlc2VudCBPR1MgR21iSFwiLCBsaW5rOiBcImh0dHBzOi8vd3d3Lm9ncy5kZS9lbi9cIiB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIGhlYWQ6IFtcbiAgICBbIFwibGlua1wiLCB7IHJlbDogXCJzaG9ydGN1dCBpY29uXCIsIGhyZWY6IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL09HUy1HbWJILy5naXRodWIvcmVmcy90YWdzL3YxLjEuMC9kb2NzL2Fzc2V0cy9mYXZpY29uL2Zhdmljb24uaWNvXCIgfSBdLFxuICAgIFsgXCJsaW5rXCIsIHsgcmVsOiBcImFwcGxlLXRvdWNoLWljb25cIiwgaHJlZjogXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vT0dTLUdtYkgvLmdpdGh1Yi9yZWZzL3RhZ3MvdjEuMS4wL2RvY3MvYXNzZXRzL2Zhdmljb24vYXBwbGUtdG91Y2gtaWNvbi5wbmdcIiB9IF0sXG4gICAgWyBcImxpbmtcIiwgeyByZWw6IFwibWFuaWZlc3RcIiwgaHJlZjogXCJzaXRlLndlYm1hbmlmZXN0XCIgfSBdLFxuICAgIFsgXCJsaW5rXCIsIHsgcmVsOiBcImljb25cIiwgdHlwZTogXCJpbWFnZS9zdmcreG1sXCIsIGhyZWY6IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL09HUy1HbWJILy5naXRodWIvcmVmcy90YWdzL3YxLjEuMC9kb2NzL2Fzc2V0cy9mYXZpY29uL2Zhdmljb24uc3ZnXCIgfSBdLFxuICAgIFsgXCJsaW5rXCIsIHsgcmVsOiBcImljb25cIiwgdHlwZTogXCJpbWFnZS9wbmdcIiwgaHJlZjogXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vT0dTLUdtYkgvLmdpdGh1Yi9yZWZzL3RhZ3MvdjEuMS4wL2RvY3MvYXNzZXRzL2Zhdmljb24vZmF2aWNvbi05Nng5Ni5wbmdcIiwgc2l6ZXM6IFwiOTZ4OTZcIiB9IF1cbiAgXSxcbiAgYmFzZTogXCIvX3RzLXRlbXBsYXRlL1wiLFxuICBzcmNEaXI6IFwiLi4vZGlzdC92aXRlcHJlc3Mtc3JjXCIsXG4gIG91dERpcjogXCIuLi9kaXN0L2RvY3NcIixcbiAgdGl0bGVUZW1wbGF0ZTogXCI6dGl0bGUgLSBPR1MgX3RzLXRlbXBsYXRlXCIsXG4gIGNsZWFuVXJsczogdHJ1ZSxcbiAgYXBwZWFyYW5jZTogdHJ1ZSxcbiAgbWFya2Rvd246IHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHRzZXNsaW50L3R5cGVkZWYgKi9cbiAgICBjb25maWcobWQpIHtcbiAgICAgIG1kLnVzZShncm91cEljb25NZFBsdWdpbilcbiAgICB9XG4gIH0sXG4gIHZpdGU6IHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICBncm91cEljb25WaXRlUGx1Z2luKClcbiAgICBdXG4gIH1cbn0pXG4iLCAie1xuICBcIm5hbWVcIjogXCJAb2dzLWdtYmgvZ3V0aHJpZVwiLFxuICBcInZlcnNpb25cIjogXCIwLjAuMFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiR3V0aHJpZSBpcyBhIEpTT04gcmVuZGVyZXIgZm9yIHVzZXIgaW50ZXJmYWNlcyBidWlsdCB3aXRoIFJlYWN0LlwiLFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcInJlYWN0XCIsXG4gICAgXCJyZWFjdGpzXCIsXG4gICAgXCJ1aVwiLFxuICAgIFwidXNlci1pbnRlcmZhY2VcIixcbiAgICBcImpzb25cIixcbiAgICBcImpzb24tcmVuZGVyZXJcIixcbiAgICBcImpzb24tZHJpdmVuLXVpXCIsXG4gICAgXCJkeW5hbWljLXVpXCIsXG4gICAgXCJ1aS1yZW5kZXJlclwiLFxuICAgIFwiY29tcG9uZW50LXJlbmRlcmluZ1wiLFxuICAgIFwiZnJvbnRlbmRcIixcbiAgICBcIndlYi1kZXZlbG9wbWVudFwiLFxuICAgIFwicmVhY3QtY29tcG9uZW50c1wiLFxuICAgIFwiZGVjbGFyYXRpdmUtdWlcIixcbiAgICBcImNvbmZpZ3VyYXRpb24tZHJpdmVuXCIsXG4gICAgXCJzY2hlbWEtZHJpdmVuLXVpXCIsXG4gICAgXCJsb3ctY29kZVwiLFxuICAgIFwibm8tY29kZVwiLFxuICAgIFwidWktZnJhbWV3b3JrXCIsXG4gICAgXCJ1aS1lbmdpbmVcIlxuICBdLFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9vZ3MtZ21iaC5naXRodWIuaW8vZ3V0aHJpZS9cIixcbiAgXCJidWdzXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL09HUy1HbWJIL2d1dGhyaWUvaXNzdWVzXCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcImF1dGhvclwiOiBcIk9HUyBHbWJIXCIsXG4gIFwiY29udHJpYnV0b3JzXCI6IFtcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJTaW1vbiBLb3Z0eWtcIixcbiAgICAgIFwiZW1haWxcIjogXCJzaW1vbkBrb3Z0eWsuY29tXCIsXG4gICAgICBcInVybFwiOiBcImh0dHBzOi8vc2ltb25rb3YuZGV2XCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIkRhdmlkIFNjaHVtbWVyXCIsXG4gICAgICBcImVtYWlsXCI6IFwiZGF2aWQuc2NodW1tZXJAb2dzLmRlXCJcbiAgICB9XG4gIF0sXG4gIFwiZXhwb3J0c1wiOiB7XG4gICAgXCIuL2hvb2tzL2V2ZW50XCI6IFwiLi9kaXN0L21haW4vaG9va3MvZXZlbnQubWpzXCIsXG4gICAgXCIuL29wdGlvbnMvY29uZmlnXCI6IFwiLi9kaXN0L21haW4vb3B0aW9ucy9jb25maWcubWpzXCIsXG4gICAgXCIuL29wdGlvbnMvZWxlbWVudHNcIjogXCIuL2Rpc3QvbWFpbi9vcHRpb25zL2VsZW1lbnRzLm1qc1wiLFxuICAgIFwiLi9vcHRpb25zL2Zuc1wiOiBcIi4vZGlzdC9tYWluL29wdGlvbnMvZm5zLm1qc1wiLFxuICAgIFwiLi9vcHRpb25zL29wZXJhdGlvbnNcIjogXCIuL2Rpc3QvbWFpbi9vcHRpb25zL29wZXJhdGlvbnMubWpzXCIsXG4gICAgXCIuL29wdGlvbnMvdmFyaWFibGVzXCI6IFwiLi9kaXN0L21haW4vb3B0aW9ucy92YXJpYWJsZXMubWpzXCIsXG4gICAgXCIuL3B1YmxpYy1hcGlcIjogXCIuL2Rpc3QvbWFpbi9wdWJsaWMtYXBpLm1qc1wiLFxuICAgIFwiLi9yZW5kZXJlci9mbnNcIjogXCIuL2Rpc3QvbWFpbi9yZW5kZXJlci9mbnMubWpzXCIsXG4gICAgXCIuL3JlbmRlcmVyL29wZXJhdGlvbnNcIjogXCIuL2Rpc3QvbWFpbi9yZW5kZXJlci9vcGVyYXRpb25zLm1qc1wiLFxuICAgIFwiLi9yZW5kZXJlci9wcm9wc1wiOiBcIi4vZGlzdC9tYWluL3JlbmRlcmVyL3Byb3BzLm1qc1wiLFxuICAgIFwiLi9yZW5kZXJlci90eXBlXCI6IFwiLi9kaXN0L21haW4vcmVuZGVyZXIvdHlwZS5tanNcIixcbiAgICBcIi4vcmVuZGVyZXIvdmFyaWFibGVzXCI6IFwiLi9kaXN0L21haW4vcmVuZGVyZXIvdmFyaWFibGVzLm1qc1wiLFxuICAgIFwiLi9zdG9yZXMvZWxlbWVudHNcIjogXCIuL2Rpc3QvbWFpbi9zdG9yZXMvZWxlbWVudHMubWpzXCIsXG4gICAgXCIuL3N0b3Jlcy9ldmVudHNcIjogXCIuL2Rpc3QvbWFpbi9zdG9yZXMvZXZlbnRzLm1qc1wiLFxuICAgIFwiLi9zdG9yZXMvZXZlbnRzLWNvbmZpZ1wiOiBcIi4vZGlzdC9tYWluL3N0b3Jlcy9ldmVudHMtY29uZmlnLm1qc1wiLFxuICAgIFwiLi9zdG9yZXMvZm5zXCI6IFwiLi9kaXN0L21haW4vc3RvcmVzL2Zucy5tanNcIixcbiAgICBcIi4vc3RvcmVzL29wZXJhdG9yc1wiOiBcIi4vZGlzdC9tYWluL3N0b3Jlcy9vcGVyYXRvcnMubWpzXCIsXG4gICAgXCIuL3N0b3Jlcy9yZWZzXCI6IFwiLi9kaXN0L21haW4vc3RvcmVzL3JlZnMubWpzXCIsXG4gICAgXCIuL3N0b3Jlcy90ZW1wbGF0ZXNcIjogXCIuL2Rpc3QvbWFpbi9zdG9yZXMvdGVtcGxhdGVzLm1qc1wiLFxuICAgIFwiLi9zdG9yZXMvdmFyaWFibGVzXCI6IFwiLi9kaXN0L21haW4vc3RvcmVzL3ZhcmlhYmxlcy5tanNcIixcbiAgICBcIi4vcGFja2FnZS5qc29uXCI6IFwiLi9wYWNrYWdlLmpzb25cIlxuICB9LFxuICBcInJlcG9zaXRvcnlcIjogXCJodHRwczovL2dpdGh1Yi5jb20vT0dTLUdtYkgvZ3V0aHJpZVwiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImJ1aWxkXCI6IFwidHNkb3duXCIsXG4gICAgXCJjaTpidWlsZDptYWluOnByb2R1Y3Rpb25cIjogXCJub2RlIC5lc2J1aWxkL2J1aWxkLm1qc1wiLFxuICAgIFwiY2k6ZG9jczpleHRyYWN0OnR5cGVkb2NcIjogXCJ0eXBlZG9jXCIsXG4gICAgXCJjaTpkb2NzOm1haW46dml0ZXByZXNzXCI6IFwiYmFzaCAuLy52aXRlcHJlc3Mvc2NyaXB0cy9wcmUtdml0ZXByZXNzLnNoICYmIHZpdGVwcmVzcyBidWlsZCAudml0ZXByZXNzXCIsXG4gICAgXCJjaTpwcjpjb21taXRsaW50Om1haW46Y29tbWl0bGludFwiOiBcImNvbW1pdGxpbnRcIixcbiAgICBcImNpOnByOmxpbnQ6bWFpbjplc2xpbnRcIjogXCJlc2xpbnQgLlwiLFxuICAgIFwiY2k6cHI6bGludDptYWluOm94bGludFwiOiBcIm94bGludCAuXCIsXG4gICAgXCJjaTp0ZXN0Om1haW46dml0ZXN0XCI6IFwidml0ZXN0IHJ1biAtLWNvdmVyYWdlXCIsXG4gICAgXCJjb21taXRcIjogXCJjb21taXRcIixcbiAgICBcInByZXBhcmVcIjogXCJodXNreVwiLFxuICAgIFwidml0ZXByZXNzXCI6IFwiYmFzaCAuLy52aXRlcHJlc3Mvc2NyaXB0cy9wcmUtdml0ZXByZXNzLnNoICYmIHZpdGVwcmVzcyBkZXYgLnZpdGVwcmVzc1wiLFxuICAgIFwidml0ZXByZXNzOnByZXZpZXdcIjogXCJ2aXRlcHJlc3MgcHJldmlldyAudml0ZXByZXNzXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQG9ncy1nbWJoL3JlYWN0LWhvb2tzXCI6IFwiXjEuMC4wXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiOiBcIl42LjAuMVwiLFxuICAgIFwiYXhpb3NcIjogXCJeMS4xMy42XCIsXG4gICAgXCJodG1sLXJlYWN0LXBhcnNlclwiOiBcIl41LjIuMTdcIixcbiAgICBcInJlYWN0XCI6IFwiXjE5LjIuNFwiLFxuICAgIFwienVzdGFuZFwiOiBcIl41LjAuMTJcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAY29tbWl0bGludC9jbGlcIjogXCJeMjAuNS4wXCIsXG4gICAgXCJAY29tbWl0bGludC9jb25maWctY29udmVudGlvbmFsXCI6IFwiXjIwLjUuMFwiLFxuICAgIFwiQGNvbW1pdGxpbnQvcHJvbXB0LWNsaVwiOiBcIl4yMC41LjBcIixcbiAgICBcIkBlc2xpbnQvanNvblwiOiBcIl4wLjE0LjBcIixcbiAgICBcIkBlc2xpbnQvbWFya2Rvd25cIjogXCJeNy41LjFcIixcbiAgICBcIkBvZ3MtZ21iaC9saW50ZXJcIjogXCJeMi4wLjRcIixcbiAgICBcIkBvZ3MtZ21iaC9veGxpbnQtcHJlc2V0c1wiOiBcIl4xLjAuNFwiLFxuICAgIFwiQG9ncy1nbWJoL3ZpdGVwcmVzcy1wbHVnaW4tc2lkZWJhclwiOiBcIl4xLjAuM1wiLFxuICAgIFwiQG9ncy1nbWJoL3ZpdGVwcmVzcy10aGVtZVwiOiBcIl4xLjEuMFwiLFxuICAgIFwiQHRlc3RpbmctbGlicmFyeS9yZWFjdFwiOiBcIl4xNi4zLjJcIixcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOS4yLjE0XCIsXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE5LjIuM1wiLFxuICAgIFwiQHZpdGVzdC9jb3ZlcmFnZS12OFwiOiBcIl40LjEuMlwiLFxuICAgIFwiZXNidWlsZFwiOiBcIl4wLjI3LjRcIixcbiAgICBcImVzYnVpbGQtcGx1Z2luLWQudHNcIjogXCJeMS4zLjFcIixcbiAgICBcImVzYnVpbGQtcGx1Z2luLWZpbGUtY29weVwiOiBcIjIuMC4wLW5leHQuMFwiLFxuICAgIFwiZXNidWlsZC1wbHVnaW4tZmlsZS1wYXRoLWV4dGVuc2lvbnNcIjogXCJeMi4xLjRcIixcbiAgICBcImVzYnVpbGQtcGx1Z2luLXBhY2thZ2UtanNvblwiOiBcIl4yLjAuMFwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjkuMzkuNFwiLFxuICAgIFwiZmFzdC1nbG9iXCI6IFwiXjMuMy4zXCIsXG4gICAgXCJodXNreVwiOiBcIl45LjEuN1wiLFxuICAgIFwianNkb21cIjogXCJeMjkuMC4xXCIsXG4gICAgXCJsaW50LXN0YWdlZFwiOiBcIl4xNi40LjBcIixcbiAgICBcIm5wbS1wYWNrYWdlLWpzb24tbGludFwiOiBcIl45LjEuMFwiLFxuICAgIFwib3hsaW50XCI6IFwiXjEuNTcuMFwiLFxuICAgIFwicmVhY3QtZG9tXCI6IFwiXjE5LjIuNFwiLFxuICAgIFwic2Fzcy1lbWJlZGRlZFwiOiBcIl4xLjk4LjBcIixcbiAgICBcInRzZG93blwiOiBcIl4wLjIxLjZcIixcbiAgICBcInR5cGVkb2NcIjogXCJeMC4yOC4xOFwiLFxuICAgIFwidHlwZWRvYy1wbHVnaW4tZnJvbnRtYXR0ZXJcIjogXCJeMS4zLjFcIixcbiAgICBcInR5cGVkb2MtcGx1Z2luLW1hcmtkb3duXCI6IFwiXjQuMTEuMFwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjkuM1wiLFxuICAgIFwidHlwZXNjcmlwdC1lc2xpbnRcIjogXCJeOC41Ny4yXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjguMC4zXCIsXG4gICAgXCJ2aXRlcHJlc3NcIjogXCJeMS42LjRcIixcbiAgICBcInZpdGVwcmVzcy1wbHVnaW4tZ3JvdXAtaWNvbnNcIjogXCJeMS43LjNcIixcbiAgICBcInZpdGVzdFwiOiBcIl40LjEuMlwiXG4gIH0sXG4gIFwicHVibGlzaENvbmZpZ1wiOiB7XG4gICAgXCJkaXJlY3RvcnlcIjogXCJkaXN0L21haW5cIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZULFNBQVMsb0JBQW9CO0FBQzFWLFNBQVMsbUJBQW1CLDJCQUEyQjtBQUN2RCxTQUFTLHFCQUFzQjs7O0FDRi9CO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxhQUFlO0FBQUEsRUFDZixVQUFZO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxVQUFZO0FBQUEsRUFDWixNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxRQUFVO0FBQUEsRUFDVixjQUFnQjtBQUFBLElBQ2Q7QUFBQSxNQUNFLE1BQVE7QUFBQSxNQUNSLE9BQVM7QUFBQSxNQUNULEtBQU87QUFBQSxJQUNUO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBUTtBQUFBLE1BQ1IsT0FBUztBQUFBLElBQ1g7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFXO0FBQUEsSUFDVCxpQkFBaUI7QUFBQSxJQUNqQixvQkFBb0I7QUFBQSxJQUNwQixzQkFBc0I7QUFBQSxJQUN0QixpQkFBaUI7QUFBQSxJQUNqQix3QkFBd0I7QUFBQSxJQUN4Qix1QkFBdUI7QUFBQSxJQUN2QixnQkFBZ0I7QUFBQSxJQUNoQixrQkFBa0I7QUFB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
