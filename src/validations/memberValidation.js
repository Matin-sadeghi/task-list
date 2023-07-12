import * as Yup from "yup";

export const memberSchema = Yup.object().shape({
  username: Yup.string().required("You should enter the username"),
  img: Yup.string()
    .required("You should enter the img")
    .url("please check the url"),
  status: Yup.mixed()
    .oneOf(
      ["Active", "Inactive"],
      "You should choose one of active, or Inactive"
    )
    .required("You should enter the status"),
  role: Yup.mixed()
    .oneOf(["Admin", "Member"], "You should choose one of Admin, or Member")
    .required("You should enter the role"),
});
