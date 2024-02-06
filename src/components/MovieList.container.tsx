import { useState, useEffect } from "react";
import { IMovie } from "../ts/interfaces/global_interface";
import MovieList from "./MovieList";

export default function MovieListContainer() {
  const [movies, setMovies] = useState<IMovie[]>([]);
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
  }, []);

  const handleRating = (id: number, rating: number): void => {
    setMovies((prevMovie) => {
      return prevMovie.filter((movie) => {
        if (movie.id === id) movie.rating = rating;
        return movie;
      });
    });
  };
  return (
    <MovieList
      movies={movies}
      err={err}
      handleRating={handleRating}
    ></MovieList>
  );
}
