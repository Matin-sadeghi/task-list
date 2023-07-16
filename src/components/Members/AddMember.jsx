import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import Loading from "../Loading";
import { MemberHeader } from "..";
import { createMember } from "../../services/memberServices";
import { TaskContext } from "./../../context/taskContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { memberSchema } from "./../../validations/memberValidation";
import { toast } from "react-toastify";

const AddMember = () => {
  const { setMembers } = useContext(TaskContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createNewMember = async (values) => {
    try {
      setLoading(true);
      const { status, data } = await createMember(values);

      if (status === 201) {
        toast.success("create member", { icon: "👷‍♂️" });

        setMembers((draft) => {
          draft.push(data);
        });
        setLoading(false);
        navigate("/members");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <>
      <MemberHeader />
      {loading ? (
        <Loading />
      ) : (
        <Formik
          onSubmit={(values) => {
            createNewMember(values);
          }}
          validationSchema={memberSchema}
          initialValues={{ username: "", img: "", status: "", role: "" }}
        >
          <Form className="row g-3 mt-5">
            <div className="col-md-6">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <Field
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
              />
              <ErrorMessage
                name="username"
                render={(msg) => <div className="error-msg">{msg}</div>}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="img" className="form-label">
                img
              </label>
              <Field
                type="text"
                className="form-control"
                placeholder="img"
                name="img"
              />
              <ErrorMessage
                name="img"
                render={(msg) => <div className="error-msg">{msg}</div>}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <Field as="select" name="status" className="form-select">
                <option value="">Choose...</option>
                <option value="Active">Active</option>
                <option value="Inactive">InActive</option>
              </Field>
              <ErrorMessage
                name="status"
                render={(msg) => <div className="error-msg">{msg}</div>}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <Field as="select" name="role" className="form-select">
                <option value="">Choose...</option>
                <option value="Admin">Admin</option>
                <option value="Member">Member</option>
              </Field>
              <ErrorMessage
                name="role"
                render={(msg) => <div className="error-msg">{msg}</div>}
              />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary me-1">
                Send
              </button>

              <Link to={"/members"} className="btn btn-danger">
                Back
              </Link>
            </div>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default AddMember;
