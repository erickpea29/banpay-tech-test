import { Navbar, FilmList, Footer } from "@/components";
import { Film } from "@/types/film";

export async function getStaticProps() {
  const res = await fetch("https://ghibliapi.vercel.app/films");
  const films: Film[] = await res.json();
  return { props: { films } };
}

export default function Home({ films }: { films: Film[] }) {
  return (
    <main>
      <Navbar />
      <section className="flex flex-col items-center justify-center text-center px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">BROWSE</h1>
        <p className="text-gray-700 text-lg leading-relaxed max-w-2xl">
          Discover the magical world of Studio Ghibli. Browse through iconic
          films, explore different genres, directors, and more. Find your next
          favorite animated film from the legendary animation studio.
        </p>
      </section>
      <section className="bg-gray-100 py-12">
        <div className="text-center mb-8">
          <p className="text-gray-700 text-lg font-medium">
            All films from the Studio Ghibli Universe, featuring unique
            animation and unforgettable stories.
          </p>
        </div>
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <FilmList films={films} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
