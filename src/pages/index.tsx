import { Navbar } from "@/components";
import Image from "next/image";
import Link from "next/link";

type Film = {
  id: string;
  title: string;
  director: string;
  release_date: string;
  image: string;
  movie_banner: string;
};

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
          Browse genres. Or directors. Or double-award-winners. Find films you
          didn’t know you were looking for.
        </p>
      </section>
      <section className="bg-gray-100 py-12">
        <div className="text-center mb-8">
          <p className="text-gray-700 text-lg font-medium">
            All films in the Studio Ghibli Database.
          </p>
        </div>
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {films.map((film) => (
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
        </div>
      </section>
    </main>
  );
}
