import { useState, useEffect } from "react";
import { Film } from "@/types/film";

export const useFilms = (searchQuery: string = "") => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await fetch("https://ghibliapi.vercel.app/films");
        if (!res.ok) {
          throw new Error("Failed to fetch films");
        }
        const data: Film[] = await res.json();

        const filteredFilms = searchQuery
          ? data.filter((film) =>
              film.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : data;

        setFilms(filteredFilms);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, [searchQuery]);

  return { films, loading, error };
};
