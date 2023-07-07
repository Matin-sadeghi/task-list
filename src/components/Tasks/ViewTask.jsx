import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getTask } from "../../services/taskServices";
import Loading from "../Loading";
import { getMember } from "../../services/memberServices";
import { TaskHeader } from "..";
import classNames from "classnames";

const ViewTask = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({});
  const [member, setMember] = useState({});

  useEffect(() => {
    const getTaskInfo = async () => {
      try {
        setLoading(true);
        const { data: task } = await getTask(parseInt(params.taskId));
        const { data: member } = await getMember(parseInt(task.member));
        setMember(member);
        setTask(task);
        setLoading(false);
      } catch (err) {
        console.log(err);

        setLoading(false);
        navigate("/task-list");
      }
    };
    getTaskInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const priorityClass = classNames({
    badge: true,
    "bg-danger": task.priority === "High",
    "bg-warning": task.priority === "Middle",
    "bg-success": task.priority === "Low",
  });
  return (
    <>
      <TaskHeader />

      {loading ? (
        <Loading />
      ) : (
        <div className="row g-3">
          <div className="col-md-12">
            <span className="badge bg-warning text-dark">Summary</span>
            <p className="mt-2">{task.summary}</p>
          </div>

          <div className="col-12">
            <span className="badge bg-warning text-dark">Task</span>
            <p className="mt-2">{task.body}</p>
          </div>

          <div className="col-md-12">
            <div className="mt-2">
              <img
                src={member.img}
                alt="avatar 1"
                style={{ width: 45, height: "auto", borderRadius: "50%" }}
              />
              <span className="ms-2">{member.username}</span>
            </div>
          </div>

          <div className="col-md-12">
            <span className={priorityClass}>{task.priority} priority</span>
          </div>

          <div className="col-12">
            <Link to={"/task-list"} type="submit" className="btn btn-primary">
              Back
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewTask;
