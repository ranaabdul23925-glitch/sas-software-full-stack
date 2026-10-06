import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/db";
import { provisionTenant } from "@/lib/provision";
import { APP_NAME } from "@/lib/constants";

export const auth = betterAuth({
  appName: APP_NAME,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await provisionTenant({
            id: user.id,
            name: user.name,
            email: user.email,
          });
        },
      },
    },
  },
  plugins: [nextCookies()],
});
