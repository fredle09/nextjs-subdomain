import { SubdomainProvider } from "@/features/sub-domain/SubdomainProvider";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Admin Panel",
  },
  description: "Administrative panel for subdomain management",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SubdomainProvider subdomain="admin">
      <div className="min-h-screen bg-background">{children}</div>
    </SubdomainProvider>
  );
}
