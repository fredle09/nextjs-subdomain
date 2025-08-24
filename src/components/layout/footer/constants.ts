import { Github, Linkedin, Mail, Phone } from "lucide-react";

export const LIST_SOCIAL_LINK = [
  {
    name: "GitHub",
    href: "#github",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "#linkedin",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:your.email@example.com",
    icon: Mail,
  },
  {
    name: "Phone",
    href: "tel:+84123456789",
    icon: Phone,
  },
] as const;

export const LIST_FOOTER_LINK = [
  {
    title: "Điều hướng",
    links: [
      { name: "Trang chủ", href: "/" },
      { name: "Giới thiệu", href: "#about" },
      { name: "Blog", href: "/blog" },
      { name: "Dự án", href: "#projects" },
    ],
  },
  {
    title: "Thông tin",
    links: [
      { name: "Kinh nghiệm", href: "#experience" },
      { name: "Kỹ năng", href: "#skills" },
      { name: "Liên hệ", href: "#contact" },
    ],
  },
] as const;