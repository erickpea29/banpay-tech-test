import { Fragment, useEffect, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

export enum SortByOptions {
  newest = "newest",
  oldest = "oldest",
}

export type Option = {
  label: string;
  value: SortByOptions;
};

const sortByOptions: Option[] = [
  { label: "Newest First", value: SortByOptions.newest },
  { label: "Oldest First", value: SortByOptions.oldest },
];

export const SortBy = ({
  onChange,
}: {
  onChange: (value: SortByOptions) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<Option>(
    sortByOptions[0]
  );

  useEffect(() => {
    onChange(selectedOption.value);
  }, [selectedOption]);

  return (
    <div className="flex justify-start  pb-6 ">
      <Listbox value={selectedOption} onChange={setSelectedOption}>
        <ListboxButton className="flex items-center gap-2 rounded-md border border-black px-4 py-2 dark:border-zinc-800 dark:text-white">
          <span className="text-base text-black dark:text-white">
            {selectedOption.label}
          </span>
          <ChevronUpDownIcon className="pointer-events-none size-6 fill-black dark:fill-white"></ChevronUpDownIcon>
        </ListboxButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="opacity-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions className="ring-opacity/5 absolute z-10 mt-2 flex w-48 flex-col justify-center overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black focus:outline-none dark:bg-zinc-950 dark:text-white dark:ring-zinc-800">
            {sortByOptions.map((option) => (
              <ListboxOption
                key={option.value}
                className="group flex select-none justify-between p-2 data-[focus]:bg-zinc-200 dark:text-white dark:data-[focus]:bg-zinc-800"
                value={option}
              >
                <div className="cursor-default text-sm text-black dark:text-white">
                  {option.label}
                </div>
                <CheckIcon className="pointer-events-none invisible size-5 fill-[#3BB46E] group-data-[selected]:visible" />
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </Listbox>
    </div>
  );
};
