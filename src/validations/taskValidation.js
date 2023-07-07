import * as Yup from "yup";

export const taskSchema = Yup.object().shape({
  summary: Yup.string().required("must enter summary"),
  body: Yup.string().required("must enter body"),
  priority: Yup.mixed().oneOf(
    ["High", "Low","Middle"],
    "should one of High Middle Low"
  ).required("must enter priority"),

  member: Yup.string().required("must enter member"),
});
