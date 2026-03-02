import {
  ESLINT_JSON_RULES,
  ESLINT_MARKDOWN_RULES,
  JS_RULES_PRESET,
  TS_RULES_PRESET,
} from "@ogs-gmbh/linter";
import globals from "globals";
import stylisticPlugin from "@stylistic/eslint-plugin";
import unicornPlugin from "eslint-plugin-unicorn";
import jsdocPlugin from "eslint-plugin-jsdoc";
import eslintMarkdown from "@eslint/markdown";
import tseslintPlugin from "typescript-eslint";
import eslintJsonPlugin from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    plugins: {
      "@markdown": eslintMarkdown,
      "@tseslint": tseslintPlugin.plugin,
      "@stylistic": stylisticPlugin,
      "@unicorn": unicornPlugin,
      "@jsdoc": jsdocPlugin,
      "@json": eslintJsonPlugin
    }
  },
  {
    ignores: [
      ".git",
      ".husky",
      ".vscode",
      ".idea",
      "node_modules",
      "dist",
      ".vitepress/.vitepress/cache"
    ]
  },
  {
    files: [
      "**/*.ts",
      "**/*.cts",
      "**/*.mts"
    ],
    languageOptions: {
      parser: tseslintPlugin.parser,
      globals: globals.browser,
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            ".vitepress/.vitepress/*",
            ".vitepress/.vitepress/theme/*"
          ]
        },
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: TS_RULES_PRESET
  },
  {
    files: [
      "**/*.js",
      "**/*.cjs",
      "**/*.mjs"
    ],
    languageOptions: {
      globals: globals.browser
    },
    rules: JS_RULES_PRESET
  },
  {
    files: [ "**/*.json" ],
    language: "@json/json",
    rules: ESLINT_JSON_RULES
  },
  {
    files: [ "**/*.json5" ],
    language: "@json/json5",
    rules: ESLINT_JSON_RULES
  },
  {
    files: [ "**/*.jsonc" ],
    language: "@json/jsonc",
    rules: ESLINT_JSON_RULES
  },
  {
    files: [ "**/*.md" ],
    rules: ESLINT_MARKDOWN_RULES,
    language: "@markdown/gfm",
    languageOptions: {
      frontmatter: "yaml"
    }
  }
);
