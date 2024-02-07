import style from "./css/Rating.module.css";

import { JSX, useCallback, useContext } from "react";
import { StarBorder, Star } from "@mui/icons-material";
import { IMovie } from "../ts/interfaces/global_interface";
import MovieContext from "../utils/MovieContext";

interface Props {
  item: IMovie;
}

export default function Rating({ item }: Props): JSX.Element[] {
  const [, setMovies] = useContext(MovieContext); //import only setter function from Context
  //create handleRating function here
  //Memo handleRating with useCallback and setMovies dependencies
  const handleRating = useCallback(
    (id: number, rating: number): void => {
      setMovies((prevMovie: IMovie[]) => {
        return prevMovie.filter((movie) => {
          if (movie.id === id) movie.rating = rating;
          return movie;
        });
      });
    },
    [setMovies]
  );

  const ratings: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    ratings.push(
      <div
        key={i}
        className={style.rating}
        onClick={() => handleRating(item.id, i + 1)}
        onMouseOver={() => handleRating(item.id, i + 1)}
      >
        {item.rating > i ? <Star /> : <StarBorder />}
      </div>
    );
  }
  return ratings;
}
