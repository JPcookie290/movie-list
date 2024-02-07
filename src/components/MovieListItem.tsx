import style from "./css/MovieListItem.module.css";
import Rating from "./Rating";
import { IMovie } from "../ts/interfaces/global_interface";

interface Props {
  movie: IMovie;
}
interface Props {
  movie: {
    id: number;
    title: string;
    director: string;
    runtime: number;
    rating: number;
  };
}
export default function MovieListItem({ movie }: Props) {
  const classNames = [style.movieCard]; //create classNames array
  if (movie.rating >= 5) classNames.push(style.fiveStar); //Conditionally pushed style.fiveStare to class Names array
  return (
    <div className={classNames.join(" ")}>
      <h2 className={style.heading}>Title: {movie.title}</h2>
      <h5 className={style.heading}>Director: {movie.director}</h5>
      <span>Runtime: {movie.runtime}</span>
      <div>
        <Rating item={movie} />
      </div>
    </div>
  );
}
