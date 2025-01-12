import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, SearchBar, ToggleMode } from "@/components";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

export function Navbar() {
  const [, setSearch] = useState<string>("");
  const router = useRouter();
  const { theme } = useTheme();

  console.log(theme);

  const handleSearchChange = (search: string) => {
    setSearch(search);
  };

  return (
    <Disclosure as="nav" className="bg-white dark:bg-zinc-950 shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex px-2 lg:px-0">
            <div className="flex shrink-0 items-center">
              <Link href={"/"}>
                <Image
                  src={
                    theme === "dark"
                      ? "/images/logo-dark.png"
                      : "/images/logo.svg"
                  }
                  alt="Logo"
                  width={140}
                  height={40}
                  priority
                />
              </Link>
            </div>
            <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium dark:text-white ${
                  router.pathname === "/"
                    ? "border-b-2 border-black text-black dark:border-white"
                    : "text-black hover:border-b-2 hover:border-black dark:hover:border-white"
                }`}
              >
                Films
              </Link>

              <SignedIn>
                <Link
                  href="/my-favorites"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium dark:text-white  ${
                    router.pathname === "/my-favorites"
                      ? "border-b-2 border-black text-black dark:border-white"
                      : "text-black hover:border-b-2 hover:border-black dark:hover:border-white"
                  }`}
                >
                  Favorites
                </Link>
              </SignedIn>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <SearchBar onSearchChange={handleSearchChange} />
          </div>
          <div className="flex items-center lg:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-950 dark:text-white dark:bg-zinc-950">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden dark:text-white dark:bg-zinc-950"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="hidden lg:ml-4 lg:flex lg:items-center">
            <ToggleMode />
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/sign-in")}
                className="relative "
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                Sign in
              </Button>
            </SignedOut>
          </div>
        </div>
      </div>

      <DisclosurePanel className="lg:hidden w-full max-w-full border dark:border-zinc-800">
        <div className="space-y-1 pb-3 pt-2">
          <DisclosureButton
            as="a"
            href="#"
            className="block py-2 pl-3 pr-4 text-base font-medium text-black dark:text-white"
          >
            Films
          </DisclosureButton>

          <SignedIn>
            <DisclosureButton
              as="a"
              href="/my-favorites"
              className="block  py-2 pl-3 pr-4 text-base font-medium text-black dark:text-white"
            >
              Favorites
            </DisclosureButton>
          </SignedIn>
        </div>
        <div className="border-t border-gray-200 dark:border-zinc-800 pb-3 pt-4 pl-4  ">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <div className=" pb-3  flex justify-center ">
          <SignedOut>
            <DisclosureButton as="a" href="/sign-in">
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/sign-in")}
                className="relative w-96"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                Sign in
              </Button>
            </DisclosureButton>
          </SignedOut>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
