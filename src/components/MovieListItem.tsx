import Rating from "./Rating";
import { IMovie } from "../ts/interfaces/global_interface";

interface Props {
  movie: IMovie;
  onRating: (id: number, rating: number) => void;
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
export default function MovieListItem({ movie, onRating }: Props) {
  return (
    <div className="movie-card">
      <h2>Title: {movie.title}</h2>
      <h5>Director: {movie.director}</h5>
      <span>Runtime: {movie.runtime}</span>
      <div>
        <Rating item={movie} onRating={onRating} />
      </div>
    </div>
  );
}
