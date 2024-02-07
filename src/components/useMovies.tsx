import { useState, useEffect, useContext } from "react";
import { IMovie } from "../ts/interfaces/global_interface";
import MovieContext from "../utils/MovieContext";

export default function useMovies() {
  const [movies, setMovies] = useContext(MovieContext);
  const [err, setErr] = useState<Error | null>(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    (async () => {
      try {
        const data = await fetch(`/movies`, options);
        setMovies((await data.json()) as IMovie[]);
      } catch (error) {
        setErr(error as Error);
      }
    })();
  }, [setMovies]);

  return [movies, err];
}
