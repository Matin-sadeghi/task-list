import * as Yup from "yup";

export const memberSchema = Yup.object().shape({
  username: Yup.string().required("must enter username"),
  img: Yup.string().required("must enter img").url("please check the url"),
  status: Yup.mixed()
    .oneOf(["active", "Inactive"], "should one of active Inactive")
    .required("must enter status"),
  role: Yup.mixed()
    .oneOf(["Admin", "Member"], "should one of Admin Member")
    .required("must enter role"),
});
