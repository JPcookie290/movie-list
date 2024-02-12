import { MovieInput } from "../ts/interfaces/global_interface";
import { useEffect, useState } from "react";

export default function useFormEdit(
  onSave: (movie: MovieInput) => void,
  editMovie: MovieInput
) {
  const [movie, setMovie] = useState<MovieInput>({
    title: "",
    director: "",
    runtime: 0,
  });
  useEffect(() => {
    if (editMovie) {
      setMovie(editMovie as MovieInput);
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
  return { movie, handleChange, handleSubmit };
}
