import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { Navbar, RelatedFilms, Footer } from "@/components";
import { Film } from "@/types/film";

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
  return (
    <main className="bg-gray-100">
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
              priority
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

      <RelatedFilms films={relatedFilms} />
      <Footer />
    </main>
  );
}
