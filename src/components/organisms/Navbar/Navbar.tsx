import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Autosuggest from "react-autosuggest";

// Definir la interfaz para una película
interface Film {
  id: string;
  title: string;
}

const fetchFilms = async (query: string): Promise<Film[]> => {
  const response = await fetch(`https://ghibliapi.vercel.app/films`);
  const films: Film[] = await response.json();
  return films.filter((film) =>
    film.title.toLowerCase().includes(query.toLowerCase())
  );
};

export function Navbar() {
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Film[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    event: React.FormEvent<HTMLElement>,
    { newValue }: { newValue: string }
  ): void => {
    setSearch(newValue);
  };

  const handleSuggestionsFetchRequested = async ({
    value,
  }: {
    value: string;
  }): Promise<void> => {
    const films = await fetchFilms(value);
    setSuggestions(films);
  };

  const handleSuggestionsClearRequested = (): void => {
    setSuggestions([]);
  };

  const renderSuggestion = (suggestion: Film) => (
    <div className="hover:bg-indigo-100 cursor-pointer">
      <Link key={suggestion.id} href={`/films/${suggestion.id}`} passHref>
        <p className="text-gray-900">{suggestion.title}</p>
      </Link>
    </div>
  );

  const inputProps = {
    placeholder: "Search Films",
    value: search,
    onChange: handleChange,
    ref: inputRef,
    className:
      "block w-full rounded-md bg-white py-1.5 pl-10 pr-3 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6",
  };

  const renderSuggestionsContainer = ({
    containerProps,
    children,
  }: {
    containerProps: React.HTMLProps<HTMLDivElement>;
    children: React.ReactNode;
  }) => {
    const inputWidth = inputRef.current ? inputRef.current.offsetWidth : "auto";
    return (
      <div
        {...containerProps}
        className="max-h-60 overflow-y-auto bg-white shadow-lg rounded-md mt-1 absolute z-50"
        style={{ width: inputWidth }}
      >
        {children}
      </div>
    );
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
                href="#"
                className="inline-flex items-center border-b-2 border-black px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Films
              </Link>
              <Link
                href="#"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                People
              </Link>
              <Link
                href="#"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Locations
              </Link>
              <Link
                href="#"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Species
              </Link>
              <Link
                href="#"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Vehicles
              </Link>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="grid w-full max-w-lg grid-cols-1 lg:max-w-xs">
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={handleSuggestionsClearRequested}
                getSuggestionValue={(suggestion: Film) => suggestion.title}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                renderSuggestionsContainer={renderSuggestionsContainer}
              />
            </div>
          </div>
          <div className="flex items-center lg:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
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
        </div>
      </div>

      <DisclosurePanel className="lg:hidden">
        <div className="space-y-1 pb-3 pt-2">
          <DisclosureButton
            as="a"
            href="#"
            className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
          >
            Films
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="#"
            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
          >
            People
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="#"
            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
          >
            Locations
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="#"
            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
          >
            Species
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="#"
            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
          >
            Vehicles
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
