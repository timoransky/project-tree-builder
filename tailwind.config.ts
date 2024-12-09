import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import maskPlugin from "@lostisworld/tailwind-mask";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ...
      boxShadow: {
        highlight: "inset 0 1px 0 0 #ffffff0d",
      },
    },
  },
  plugins: [
    maskPlugin,
    plugin(function ({ addUtilities, theme }) {
      const generateNestedSelectors = (depth = 6) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const selectors: Record<string, any> = {};

        const generateSelector = (currentDepth: number) => {
          if (currentDepth <= 0) return "";

          return `& > ${"ul > li:last-of-type > ".repeat(currentDepth)} div`;
        };

        for (let i = 1; i <= depth; i++) {
          const selector = generateSelector(i);

          selectors[selector] = {
            borderBottomLeftRadius: theme("borderRadius.lg"),
            borderBottomRightRadius: theme("borderRadius.lg"),
          };
        }

        return {
          ".dynamic-last-child-round": selectors,
        };
      };

      addUtilities(generateNestedSelectors());
    }),
  ],
} satisfies Config;
