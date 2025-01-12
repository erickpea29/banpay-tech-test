import React, { useRef, useState } from "react";
import Autosuggest from "react-autosuggest";
import { Film } from "@/types/film";
import Link from "next/link";
import { useFilms } from "@/hooks/useFilms";

interface SearchBarProps {
  onSearchChange: (search: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  const [search, setSearch] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { films } = useFilms(search);

  const handleChange = (
    event: React.FormEvent<HTMLElement>,
    { newValue }: { newValue: string }
  ): void => {
    setSearch(newValue);
    onSearchChange(newValue);
  };

  const handleSuggestionsFetchRequested = async (): Promise<void> => {};

  const handleSuggestionSelected = (): void => {
    setSearch("");
    onSearchChange("");
  };

  const renderSuggestion = (suggestion: Film) => (
    <Link key={suggestion.id} href={`/films/${suggestion.id}`} passHref>
      <div className="hover:bg-slate-200 cursor-pointer pl-4">
        <p className="text-gray-900">{suggestion.title}</p>
      </div>
    </Link>
  );

  const inputProps = {
    placeholder: "Search Films",
    value: search,
    onChange: handleChange,
    ref: inputRef,
    className:
      "block w-full rounded-md bg-white py-1.5 pl-4 pr-3 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6",
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
    <div className="grid w-full max-w-lg grid-cols-1 lg:max-w-xs">
      <Autosuggest
        suggestions={films}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        getSuggestionValue={(suggestion: Film) => suggestion.title}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        renderSuggestionsContainer={renderSuggestionsContainer}
        onSuggestionSelected={handleSuggestionSelected}
      />
    </div>
  );
};
