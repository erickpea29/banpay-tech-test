import { useState } from "react";
import { Film } from "@/types/film";
import { SortBy, SortByOptions } from "@/components/";
import Link from "next/link";
import Image from "next/image";

interface FilmListProps {
  films: Film[];
}

export const FilmList = ({ films }: FilmListProps) => {
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortOption, setSortOption] = useState<SortByOptions>(
    SortByOptions.newest
  );

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  const sortedFilms = [...films].sort((a, b) => {
    if (sortOption === SortByOptions.newest) {
      return parseInt(b.release_date) - parseInt(a.release_date);
    }
    return parseInt(a.release_date) - parseInt(b.release_date);
  });

  const visibleFilms = sortedFilms.slice(0, visibleCount);

  return (
    <div>
      <SortBy onChange={(value) => setSortOption(value)} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleFilms.map((film) => (
          <Link key={film.id} href={`/films/${film.id}`} passHref>
            <div className="relative group bg-gray-100 rounded-lg overflow-hidden shadow-md cursor-pointer">
              <Image
                src={film.movie_banner}
                alt={film.title}
                width={400}
                height={250}
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-2 text-xs">
                <h3 className="text-sm font-semibold">{film.title}</h3>
                <p className="text-xs">{film.director}</p>
                <p className="text-xs">{film.release_date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {visibleCount < films.length && (
        <div className="text-center mt-8">
          <span
            onClick={handleViewMore}
            className="text-slate-950 cursor-pointer hover:underline dark:text-white"
          >
            View More
          </span>
        </div>
      )}
    </div>
  );
};
