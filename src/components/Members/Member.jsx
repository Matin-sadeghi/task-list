import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { TaskContext } from "./../../context/taskContext";

const Member = ({ member, removeMember, changeStatus }) => {
  const { tasks } = useContext(TaskContext);
  const myRef = useRef(0);
  tasks.forEach((task) => {
    if (parseInt(task.member) ===parseInt(member.id)) {
      myRef.current++;
    }
  });
  return (
    <>
      <tr className="fw-normal">
        <th>
          <img
            src={member.img}
            alt="avatar 1"
            style={{ width: 45, height: "auto" ,borderRadius:"50%"}}
          />
          <span className="ms-2">{member?.username}</span>
        </th>
        <td className="align-middle">
          <span>{myRef.current}</span>
        </td>
        <td className="align-middle">
          <h6 className="mb-0">
            <span>{member.status}</span>
          </h6>
        </td>
        <td className="align-middle">
          <span
            style={{ cursor: "pointer" }}
            data-mdb-toggle="tooltip"
            title="Status"
            onClick={changeStatus}
          >
            <i
              className="fas fa-arrows-alt-h  fa-lg  me-3"
              style={{ color: "#4bd122" }}
            ></i>
          </span>

          <span
            style={{ cursor: "pointer" }}
            onClick={removeMember}
            data-mdb-toggle="tooltip"
            title="Remove"
          >
            <i className="fas fa-trash-alt fa-lg text-danger me-3"></i>
          </span>
          <Link
            to={`/members/${member.id}`}
            href="#!"
            data-mdb-toggle="tooltip"
            title="View"
          >
            <i className="fas fa-eye fa-lg text-warning me-3"></i>
          </Link>
          <Link
            to={`/members/edit/${member.id}`}
            data-mdb-toggle="tooltip"
            title="Edit"
          >
            <i
              className="fas fa-pen fa-lg me-3"
              style={{ color: "#c3c3c3" }}
            ></i>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default Member;
