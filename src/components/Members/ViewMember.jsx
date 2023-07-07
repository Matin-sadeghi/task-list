import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMember } from "../../services/memberServices";
import { MemberHeader } from "..";
import Loading from "../Loading";

const ViewMember = () => {
  const { memberId } = useParams();

  const [member, setMember] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const findSelectedMember = async () => {
      try {
        setLoading(true);
        const { data: member } = await getMember(parseInt(memberId));
        setMember(member);
        setLoading(false);
      } catch (err) {
        setLoading(false);

        console.log(err);
      }
    };
    findSelectedMember();
  }, []);

  return (
    <>
      <MemberHeader />
      {loading ? (
        <Loading />
      ) : (
        <div className="row g-3 mt-5">
        <div className="col-md-12">
            <label htmlFor="img" className="form-label">
              
            </label>
            <img
              src={member?.img}
              alt="avatar 1"
              style={{ width: 45, height: "auto" ,borderRadius:"50%"}}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <p id="username" className="form-control">
              {member.username}
            </p>
          </div>

       
          <div className="col-md-6">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <p id="status" className="form-control">
              {member.status}
            </p>
          </div>

          <div className="col-md-6">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <p id="role" className="form-control">
              {member.role}
            </p>
          </div>

          <div className="col-12">
        

            <Link to={"/members"} className="btn btn-primary">
              Back
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewMember;
