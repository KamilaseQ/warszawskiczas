import "dotenv/config";
import { defineConfig } from "prisma/config";

const user = process.env.DB_USER || "";
const pass = encodeURIComponent(process.env.DB_PASSWORD || "");
const host = process.env.DB_HOST || "127.0.0.1";
const port = process.env.DB_PORT || "3306";
const db = process.env.DB_NAME || "";
const safeDbUrl = `mysql://${user}:${pass}@${host}:${port}/${db}`;

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: safeDbUrl,
  },
});
