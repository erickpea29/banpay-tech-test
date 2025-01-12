import Link from "next/link";
import Image from "next/image";
import { Film } from "@/types/film";
import { useState } from "react";

interface FilmListProps {
  films: Film[];
}

export const FilmList = ({ films }: FilmListProps) => {
  const [visibleCount, setVisibleCount] = useState(12);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  const visibleFilms = Array.isArray(films) ? films.slice(0, visibleCount) : [];

  return (
    <div>
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
