import { Link } from "react-router-dom";
import classNames from "classnames";

const Task = ({ task, members, deleteTask, completedTask }) => {
  const member = members.find((m) => parseInt(m.id) === parseInt(task.member));
  const priorityClass = classNames({
    badge: true,
    "bg-danger": task.priority === "High",
    "bg-warning": task.priority === "Middle",
    "bg-success": task.priority === "Low",
  });
  //
  return (
    <>
    
      <tr className="fw-normal">
        <th>
          <img
            src={member?.img}
            alt="avatar 1"
            style={{ width: 45, height: "auto" ,borderRadius:"50%"}}
          />
          <span className="ms-2">{member?.username}</span>
        </th>
        <td className="align-middle">
          <span>{task.summary}</span>
        </td>
        <td className="align-middle">
          <h6 className="mb-0">
            <span className={priorityClass}>{task.priority} priority</span>
          </h6>
        </td>
        <td className="align-middle">
          {task.completed ? (
            <span data-mdb-toggle="tooltip">
              <i className="fas fa-500px fa-lg text-success me-3"></i>
            </span>
          ) : (
            <span
              style={{ cursor: "pointer" }}
              onClick={completedTask}
              data-mdb-toggle="tooltip"
              title="Done"
            >
              <i className="fas fa-check fa-lg me-3" style={{color:"#4bd122"}}></i>
            </span>
          )}

          <span
            style={{ cursor: "pointer" }}
            onClick={deleteTask}
            data-mdb-toggle="tooltip"
            title="Remove"
          >
            <i className="fas fa-trash-alt fa-lg text-danger me-3"></i>
          </span>
          <Link
            to={`/task-list/${task.id}`}
            href="#!"
            data-mdb-toggle="tooltip"
            title="View"
          >
            <i className="fas fa-eye fa-lg text-warning me-3"></i>
          </Link>
          <Link
            to={`/task-list/edit/${task.id}`}
            data-mdb-toggle="tooltip"
            title="Edit"
          >
            <i className="fas fa-pen fa-lg  me-3" style={{color:"#c3c3c3"}}></i>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default Task;
