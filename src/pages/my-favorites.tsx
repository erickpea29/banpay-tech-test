import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "@/components";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Film } from "@/types/film";

function MyFavorites() {
  const { user } = useUser();
  const [favoriteFilms, setFavoriteFilms] = useState<Film[]>([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const movies = user?.publicMetadata?.movies || {};
      const filmPromises = Object.values(movies).map(async (movieId) => {
        const res = await fetch(
          `https://ghibliapi.vercel.app/films/${movieId}`
        );
        return res.json();
      });

      const films = await Promise.all(filmPromises);
      setFavoriteFilms(films);
      setLoading(false);
    };

    if (user) {
      fetchFavorites();
    }
  }, [user]);

  return (
    <main className="flex flex-col min-h-screen dark:bg-zinc-950">
      <Navbar />
      <section className="flex-grow">
        <div className="flex flex-col items-center justify-center text-center px-4 py-8 dark:bg-zinc-950">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">
            My Favorites
          </h1>
        </div>
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 ">
          {favoriteFilms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteFilms.map((film) => (
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
          ) : (
            <p className="text-gray-500">You have no favorite movies yet.</p>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default MyFavorites;
