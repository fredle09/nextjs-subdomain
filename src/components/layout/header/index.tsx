// TODO: Refactor to use server component
"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";

import Show from "@/components/show";
import Mapping from "@/components/mapping";
import { Button } from "@/components/ui/button";

import { LIST_NAVIGATION } from "./constants";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              Portfolio
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Mapping
                data={LIST_NAVIGATION}
                as={Link}
                keyProps="name"
                transform={({ href, name }) => ({
                  href,
                  className:
                    "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-200",
                  children: name,
                })}
              />
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300"
            >
              <Show when={isMenuOpen}>
                <X className="h-6 w-6" />
              </Show>
            </Button>
          </div>
        </div>

        <Show when={isMenuOpen}>
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              {/* TODO: Refactor to use Mapping component */}
              {LIST_NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                  // TODO: set only prefetch with route on the same
                  prefetch={false}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </Show>
      </nav>
    </header>
  );
}
