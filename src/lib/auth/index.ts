import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthMiddleware, APIError } from "better-auth/api";

import prisma from "../database";

const LIST_ALLOWED_EMAIL = new Set(
  process.env.LIST_ALLOWED_EMAIL?.split(",") || []
);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: process.env.BETTER_AUTH_TRUSTED_ORIGINS?.split(",") || [
    process.env.BETTER_AUTH_URL as string,
  ],
  advanced: {
    defaultCookieAttributes: {
      secure: process.env.NODE_ENV === "production",
    },
    crossSubDomainCookies:
      process.env.NODE_ENV === "production"
        ? {
            enabled: true,
            domain: `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN as string}`,
          }
        : undefined,
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (!ctx.context.newSession) {
        return;
      }

      const email = ctx.context.newSession.user.email;
      if (!email || !LIST_ALLOWED_EMAIL.has(email)) {
        throw new APIError("BAD_REQUEST", {
          message: "This email is not allowed to sign in.",
        });
      }
    }),
  },
});
