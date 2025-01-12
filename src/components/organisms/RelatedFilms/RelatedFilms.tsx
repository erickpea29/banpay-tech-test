import Image from "next/image";
import Link from "next/link";
import { Film } from "@/types/film";

interface RelatedFilmsProps {
  films: Film[];
}

export function RelatedFilms({ films }: RelatedFilmsProps) {
  if (!films || films.length === 0) {
    return <p>No related films available.</p>;
  }

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl dark:bg-zinc-950">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Related Films</h2>
      <div className="grid grid-cols-1 gap-6">
        {films.map((relatedFilm) => (
          <div
            key={relatedFilm.id}
            className="flex flex-col md:flex-row bg-[#304a7a] dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg overflow-hidden shadow-md"
          >
            <div className="md:w-2/5 w-full">
              <Image
                src={relatedFilm.movie_banner}
                alt={relatedFilm.title}
                width={400}
                height={225}
                className="w-full h-full object-cover aspect-video"
              />
            </div>

            <div className="p-4 md:w-3/5 w-full flex flex-col gap-2">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {relatedFilm.title}
                </h3>
                <p className="text-xs text-white">
                  Directed by {relatedFilm.director} -{" "}
                  {relatedFilm.release_date}
                </p>
              </div>
              <p className="text-white text-sm line-clamp-2 sm:line-clamp-none">
                {relatedFilm.description}
              </p>
              <Link href={`/films/${relatedFilm.id}`} passHref>
                <p className="text-sm text-blue-400 hover:underline dark:text-white">
                  See more
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
