import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, SearchBar } from "@/components";
import { useRouter } from "next/router";

export function Navbar() {
  const [, setSearch] = useState<string>("");
  const router = useRouter();

  const handleSearchChange = (search: string) => {
    setSearch(search);
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex px-2 lg:px-0">
            <div className="flex shrink-0 items-center">
              <Link href={"/"}>
                <Image
                  src="/images/logo.svg"
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
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  router.pathname === "/"
                    ? "border-b-2 border-black text-gray-900"
                    : "text-gray-500 hover:border-b-2 hover:border-black"
                }`}
              >
                Films
              </Link>

              <SignedIn>
                <Link
                  href="/my-favorites"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    router.pathname === "/my-favorites"
                      ? "border-b-2 border-black text-gray-900"
                      : "text-gray-500 hover:border-b-2 hover:border-black"
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
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-950">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="hidden lg:ml-4 lg:flex lg:items-center">
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

      <DisclosurePanel className="lg:hidden">
        <div className="space-y-1 pb-3 pt-2">
          <DisclosureButton
            as="a"
            href="#"
            className="block border-l-4 border-slate-950 bg-slate-50 py-2 pl-3 pr-4 text-base font-medium text-black"
          >
            Films
          </DisclosureButton>
        </div>
        <div className="border-t border-gray-200 pb-3 pt-4">
          <button
            type="button"
            className="relative ml-auto shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">View notifications</span>
            <BellIcon aria-hidden="true" className="size-6" />
          </button>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
