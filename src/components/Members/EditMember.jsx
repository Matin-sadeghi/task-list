import { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Loading";
import { MemberHeader } from "..";
import { getMember, updateMember } from "../../services/memberServices";
import { TaskContext } from "./../../context/taskContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { memberSchema } from "./../../validations/memberValidation";

const EditMember = () => {
  const { members, setMembers } = useContext(TaskContext);
  const navigate = useNavigate();
  const { memberId } = useParams();
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState({
    username: "",
    img: "",
    status: "",
    role: "",
  });
  const updateSelectedMember = async (value) => {
    try {
      setLoading(true);
      const { status, data } = await updateMember(value, parseInt(memberId));
      if (status === 200) {
        setMember({
          username: "",
          img: "",
          status: "",
          role: "",
        });
        const memberIndex = members.findIndex(
          (member) => parseInt(member.id) === parseInt(memberId)
        );
        setMembers((draft) => {
          draft[memberIndex] = data;
        });
        setLoading(false);
        toast.info("your member has been updated ! ", { icon: "🔧" });
        navigate("/members");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      navigate("/members");
    }
  };
  useEffect(() => {
    const findSelectedMember = async () => {
      try {
        setLoading(true);
        const { data: member } = await getMember(parseInt(memberId));
        setMember(member);
        setLoading(false);
      } catch (err) {
        console.log(err);
        navigate("/members");
      }
    };
    findSelectedMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MemberHeader />
      {loading ? (
        <Loading />
      ) : (
        <Formik
          onSubmit={(values) => {
            updateSelectedMember(values);
          }}
          validationSchema={memberSchema}
          initialValues={{
            username: member.username,
            img: member.img,
            status: member.status,
            role: member.role,
          }}
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

export default EditMember;
