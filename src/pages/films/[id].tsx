import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { Navbar } from "@/components";
import { useEffect, useState } from "react";
import Link from "next/link";

type Film = {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  image: string;
  movie_banner: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://ghibliapi.vercel.app/films");
  const films: Film[] = await res.json();

  const paths = films.map((film) => ({
    params: { id: film.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
  const film: Film = await res.json();

  return { props: { film } };
};

export default function FilmDetail({ film }: { film: Film }) {
  const [relatedFilms, setRelatedFilms] = useState<Film[]>([]);

  useEffect(() => {
    async function fetchRelatedFilms() {
      const res = await fetch("https://ghibliapi.vercel.app/films");
      const films: Film[] = await res.json();

      const filteredFilms = films.filter((f) => f.id !== film.id);
      const shuffledFilms = filteredFilms.sort(() => Math.random() - 0.5);

      setRelatedFilms(shuffledFilms.slice(0, 5));
    }

    fetchRelatedFilms();
  }, [film.id]);

  return (
    <main>
      <Navbar />
      <div
        className="relative max-h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${film.movie_banner})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

        <div className="relative z-10 px-4 py-8 mx-auto max-w-7xl text-white">
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <Image
              src={film.image}
              alt={film.title}
              width={200}
              height={345}
              className="rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8"
            />
            <div>
              <h1 className="text-4xl font-bold mb-4">{film.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <h5 className="text-1xl font-semibold">{film.release_date}</h5>
                <blockquote className="text-1xl ">
                  <p>{film.original_title_romanised}</p>
                </blockquote>
              </div>

              <h5 className="text-1xl mb-4">Directed by {film.director}</h5>

              <p className="text-gray-300 text-lg mb-6">{film.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold mb-6">Related Films</h2>
        <div className="grid grid-cols-1 gap-6">
          {relatedFilms.map((relatedFilm) => (
            <div
              key={relatedFilm.id}
              className="flex flex-col md:flex-row bg-[#304a7a] rounded-lg overflow-hidden shadow-md"
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
                <Link
                  key={relatedFilm.id}
                  href={`/films/${relatedFilm.id}`}
                  passHref
                >
                  <p className="text-sm text-blue-400 hover:underline">
                    See more
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
