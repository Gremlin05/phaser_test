import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "/Arcane Reborn/",
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});

