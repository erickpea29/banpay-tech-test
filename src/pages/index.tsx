import { Navbar, FilmList, Footer } from "@/components";
import { Film } from "@/types/film";

interface HomeProps {
  films: Film[];
  error: string | null;
}

export default function Home({ films, error }: HomeProps) {
  return (
    <main>
      <Navbar />
      <section className="flex flex-col items-center justify-center text-center px-4 py-8 dark:bg-zinc-950">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">
          BROWSE
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed max-w-2xl dark:text-white">
          Discover the magical world of Studio Ghibli. Browse through iconic
          films, explore different genres, directors, and more. Find your next
          favorite animated film from the legendary animation studio.
        </p>
      </section>
      <section className="bg-gray-100 py-12 dark:bg-zinc-950">
        <div className="text-center mb-8">
          <p className="text-gray-700 text-lg font-medium dark:text-white ">
            All films from the Studio Ghibli Universe, featuring unique
            animation and unforgettable stories.
          </p>
        </div>
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <FilmList films={films} />
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch("https://ghibliapi.vercel.app/films");
    if (!res.ok) {
      throw new Error("Failed to fetch films");
    }
    const films: Film[] = await res.json();
    return {
      props: {
        films,
        error: null,
      },
    };
  } catch (err) {
    return {
      props: {
        films: [],
        error: (err as Error).message,
      },
    };
  }
}
