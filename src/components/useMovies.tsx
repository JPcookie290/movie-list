import { useState, useEffect, useContext } from "react";
import { IMovie, MovieInput } from "../ts/interfaces/global_interface";
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

  async function handleDelete(movie: IMovie) {
    const options = {
      method: "DELETE",
    };
    const res = await fetch(`/movies/${movie.id}`, options);

    if (res.ok) {
      setMovies((prevMovie) =>
        prevMovie.filter((prevMovie) => prevMovie.id !== movie.id)
      );
    }
  }
  async function handleAdd(
    movie: MovieInput,
    edited: boolean = true
  ): Promise<void> {
    //json-server creates automatic ids if the object is missing one

    let method = "POST";
    let url = "/movies";

    if (edited) {
      method = "PUT";
      url += `/${movie.id}`;
    } else {
      movie.id = Math.random().toString(36).replace("0.", "");
    }
    const options = {
      method,
      body: JSON.stringify(movie),
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);
    if (edited) {
      setMovies((prevMovies) =>
        prevMovies?.map((prevMovie) => {
          if (prevMovie.id === movie.id) {
            console.log(data);
            return data;
          }
          return prevMovie;
        })
      );
    } else {
      setMovies((prevMovie) => [...prevMovie, data]);
    }
  }

  return [movies, err, handleDelete, handleAdd];
}
