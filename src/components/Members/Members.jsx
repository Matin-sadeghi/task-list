import { useContext } from "react";

import { deleteMember, updateMember } from "../../services/memberServices";
import { useImmer } from "use-immer";
import Swal from "sweetalert2";

import Loading from "../Loading";
import { Member, MemberHeader } from "..";
import { deleteTask } from "../../services/taskServices";
import { TaskContext } from "./../../context/taskContext";
import { toast } from "react-toastify";

const Tasks = () => {
  const { tasks, members, setMembers, setTasks } = useContext(TaskContext);
  const removeMember = (memberId, member) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      html: `<p>Member : ${member.username}</p>
        <p>You won't be able to revert this!</p>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLogin(true);
          const { status } = await deleteMember(memberId);

          if (status === 200) {
            tasks.forEach(async (task) => {
              if (parseInt(task.member) === parseInt(memberId)) {
                await deleteTask(parseInt(task.id));
                setTasks((draft) => draft.filter((d) => d.id !== task.id));
              }
            });
      
            toast.error(" member has been deleted.", { icon: "🗑️" });

            setMembers((draft) =>
              draft.filter((task) => task.id !== parseInt(memberId))
            );
          }
          setLogin(false);
        } catch (err) {
          console.log(err);
          setLogin(false);
        }
      }
    });
  };

  const changeStatus = (memberId, member) => {
    Swal.fire({
      title: "Are you sure?",
      html: `<p>member : ${member.username}</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLogin(true);
          const { status, data } = await updateMember(
            {
              ...member,
              status: member.status === "active" ? "Inactive" : "active",
            },
            memberId
          );
          if (status === 200) {
   
            toast.success("Your member status has been changed.",{icon:"👍"})
            const memberIndex = members.findIndex(
              (member) => parseInt(member.id) === parseInt(memberId)
            );

            setMembers((draft) => {
              draft[memberIndex] = data;
            });
          }
          setLogin(false);
        } catch (err) {
          console.log(err);
          setLogin(false);
        }
      }
    });
  };

  const [login, setLogin] = useImmer(false);

  return (
    <>
      <MemberHeader />
      <table className="table text-white mb-0">
        <thead>
          <tr>
            <th scope="col">Team Member</th>
            <th scope="col">count of Tasks</th>
            <th scope="col">status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {login ? (
            <>
              {" "}
              <Loading />{" "}
            </>
          ) : (
            members.map((member) => (
              <Member
                member={member}
                removeMember={() => removeMember(member.id, member)}
                changeStatus={() => changeStatus(member.id, member)}
                key={member.id}
              />
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default Tasks;
