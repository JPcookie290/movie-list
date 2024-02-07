import React, { useState } from "react";
import MovieContext from "../utils/MovieContext";
import { IMovie } from "../ts/interfaces/global_interface";

interface Props {
  children: React.ReactNode;
}

export default function MovieProvider({ children }: Props) {
  const [movies, setMovies] = useState<IMovie[]>([]);

  return (
    <MovieContext.Provider value={[movies, setMovies]}>
      {children}
    </MovieContext.Provider>
  );
}
