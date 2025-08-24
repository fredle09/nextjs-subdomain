import { SubdomainProvider } from "@/features/sub-domain/SubdomainProvider";

type TBlogLayoutProps = React.PropsWithChildren;

export default function BlogLayout({ children }: TBlogLayoutProps) {
  return <SubdomainProvider subdomain="blog">{children}</SubdomainProvider>;
}
