import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // Vendored shadcn/ui primitives keep upstream patterns (setState in
    // effects, Math.random skeleton width); tailwind.config.ts is a Tailwind
    // v3-era leftover retained for the shadcn CLI and intentionally uses CJS.
    files: ["src/components/ui/**", "tailwind.config.ts"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  eslintConfigPrettier,
];

export default eslintConfig;
