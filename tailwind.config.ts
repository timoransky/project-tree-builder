import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import maskPlugin from "@lostisworld/tailwind-mask";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        highlight: "inset 0 1px 0 0 #ffffff0d",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      // Add gradient color variables
      backgroundColor: {
        "primary-gradient":
          "color-mix(in oklab, hsl(265, 89%, 64%) calc(<alpha-value> * 100%), transparent)",
        "secondary-gradient":
          "color-mix(in oklab, hsl(173, 80%, 40%) calc(<alpha-value> * 100%), transparent)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateX(-33.333%) translateY(-25%)" },
          "30%": { transform: "translateX(-80%) translateY(-25%)" },
          "70%": { transform: "translateX(0%) translateY(-25%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 30s linear infinite",
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
