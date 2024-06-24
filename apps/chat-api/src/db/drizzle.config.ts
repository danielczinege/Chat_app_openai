import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./schema.ts",
    out: "./drizzle",
    dbCredentials: {
        url: "postgres://postgres:postgres@localhost:5432/postgres"
    }
});
