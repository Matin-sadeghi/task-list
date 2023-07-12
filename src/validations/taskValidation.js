import * as Yup from "yup";

export const taskSchema = Yup.object().shape({
  summary: Yup.string().required("You should enter the summary"),
  body: Yup.string().required("You should enter the body"),
  priority: Yup.mixed()
    .oneOf(
      ["High", "Low", "Middle"],
      "You should choose one of High, Middle, or Low"
    )
    .required("You should enter the priority"),

  member: Yup.string().required("You should enter the member"),
});
