import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { Navbar, RelatedFilms, Footer, StarRating } from "@/components";
import { Film } from "@/types/film";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

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

  const filmsRes = await fetch("https://ghibliapi.vercel.app/films");
  const films: Film[] = await filmsRes.json();

  const filteredFilms = films.filter((f) => f.id !== film.id);
  const shuffledFilms = filteredFilms.sort(() => Math.random() - 0.5);
  const relatedFilms = shuffledFilms.slice(0, 5);

  return {
    props: {
      film,
      relatedFilms,
    },
  };
};

interface FilmDetailProps {
  film: Film;
  relatedFilms: Film[];
}

export default function FilmDetail({ film, relatedFilms }: FilmDetailProps) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const { user } = useUser();

  const favorites = user?.publicMetadata?.favorites;
  const isFavorite = Array.isArray(favorites) && favorites.includes(film.id);

  const handleSave = async () => {
    if (isSignedIn) {
      try {
        const response = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filmId: film.id,
            userId: isSignedIn ? user?.id : "",
          }),
        });

        const data = await response.json();
        if (data.success) {
          toast.success("Film added to favorites!");
        } else {
          toast.error(data.message || "Something went wrong.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error adding film to favorites.");
      }
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <main className="bg-gray-100 dark:bg-zinc-950">
      <Navbar />
      <div
        className="relative max-h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${film.movie_banner})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

        <div className="relative z-10 px-4 py-8 mx-auto max-w-7xl text-white">
          <div className="relative">
            <button
              onClick={handleSave}
              aria-label="Add to favorites"
              className={`absolute right-4 text-gray-300 hover:text-red-500 focus:outline-none transition-colors ${
                isFavorite ? "text-red-500" : ""
              }`}
              disabled={isFavorite}
            >
              <HeartIcon
                className={`w-7 h-7 ${
                  isFavorite
                    ? "fill-current text-red-500"
                    : "hover:text-red-500"
                }`}
              />
            </button>

            <div className="flex flex-col items-center md:flex-row md:items-start">
              <Image
                src={film.image}
                alt={film.title}
                priority
                width={200}
                height={345}
                className="rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8"
              />
              <div>
                <h1 className="text-4xl font-bold mb-1">{film.title}</h1>
                <StarRating score={Number(film.rt_score)} />
                <div className="flex items-center space-x-4 mb-4">
                  <h5 className="text-1xl font-semibold">
                    {film.release_date}
                  </h5>
                  <blockquote className="text-1xl">
                    <p>{film.original_title_romanised}</p>
                  </blockquote>
                </div>

                <h5 className="text-1xl mb-4">Directed by {film.director}</h5>

                <p className="text-gray-300 text-lg mb-6">{film.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedFilms films={relatedFilms} />
      <Footer />
    </main>
  );
}
