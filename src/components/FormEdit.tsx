import { IMovie, MovieInput } from "../ts/interfaces/global_interface";
import { useEffect, useState } from "react";

interface Props {
  onSave: (movie: MovieInput) => void;
  editMovie?: IMovie;
}

export default function FormEdit({ onSave, editMovie }: Props): JSX.Element {
  const [movie, setMovie] = useState<MovieInput>({
    title: "",
    director: "",
    runtime: 0,
  });
  useEffect(() => {
    if (editMovie) {
      setMovie(editMovie);
    }
  }, [editMovie]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMovie((prevMovie) => {
      return { ...prevMovie, [name]: value };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(movie);
  };
  return (
    <form className="input-movie-form" onSubmit={handleSubmit}>
      <label htmlFor="title">
        Title:
        <input
          name="title"
          id="title"
          type="text"
          placeholder="Movie title"
          value={movie.title}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="director">
        Director:
        <input
          name="director"
          id="director"
          type="text"
          placeholder="Movie director"
          value={movie.director}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="runtime">
        Runtime:
        <input
          name="runtime"
          id="runtime"
          type="number"
          placeholder="Movie runtime"
          value={movie.runtime}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}
