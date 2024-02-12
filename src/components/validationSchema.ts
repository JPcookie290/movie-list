import * as yup from "yup";

const movieSchema = yup
  .object({
    title: yup
      .string()
      .required("title is required")
      .min(2, "the title must hav min. 2 chars")
      .max(30, "The title must have maxHeaderSize. 30 chars"),
    director: yup.string().required("director is required"),
    runtime: yup.number().required("runtime is required"),
  })
  .required();

export default movieSchema;
