import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "../database";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  trustedOrigins: process.env.BETTER_AUTH_TRUSTED_ORIGINS?.split(",") || [
    process.env.BETTER_AUTH_URL!,
  ],
  advanced: {
    defaultCookieAttributes: {
      secure: process.env.NODE_ENV === "production",
    },
    crossSubDomainCookies: {
      ...(process.env.NODE_ENV === "production" && {
        enabled: true,
        domain: `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN!}`,
      }),
    },
  },
});
