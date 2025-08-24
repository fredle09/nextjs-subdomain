import Link from "next/link";

import Mapping from "@/components/mapping";

import { LIST_FOOTER_LINK, LIST_SOCIAL_LINK } from "./constants";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Portfolio</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Trang web cá nhân để chia sẻ về hành trình học tập, làm việc và
              các dự án công nghệ mà tôi đã thực hiện.
            </p>
            <div className="flex space-x-4">
              <Mapping
                data={LIST_SOCIAL_LINK}
                as={SocialLink}
                keyProps="name"
              />
            </div>
          </div>

          <Mapping data={LIST_FOOTER_LINK} as={FooterLink} keyProps="title" />
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Portfolio. Tất cả quyền được bảo lưu.
          </p>
          <p className="text-gray-400 text-sm mt-2 sm:mt-0">
            Made with ❤️ using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink(section: (typeof LIST_FOOTER_LINK)[number]) {
  return (
    <div key={section.title} className="col-span-1">
      <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
      <ul className="space-y-2">
        <Mapping data={[...section.links]} as={SectionLink} keyProps="name" />
      </ul>
    </div>
  );
}

function SectionLink(link: (typeof LIST_FOOTER_LINK)[number]["links"][number]) {
  return (
    <li key={link.name}>
      <Link
        href={link.href}
        className="text-gray-400 hover:text-white transition-colors duration-200"
      >
        {link.name}
      </Link>
    </li>
  );
}

function SocialLink(social: (typeof LIST_SOCIAL_LINK)[number]) {
  return (
    <Link
      key={social.name}
      href={social.href}
      className="text-gray-400 hover:text-white transition-colors duration-200"
    >
      <social.icon className="h-6 w-6" />
      <span className="sr-only">{social.name}</span>
    </Link>
  );
}
