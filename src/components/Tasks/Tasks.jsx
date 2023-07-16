import Loading from "../Loading";
import { useContext } from "react";
import { TaskContext } from "./../../context/taskContext";
import { Task, TaskHeader } from "..";

const Tasks = () => {
  const { tasks, deleteTask, loading, members, completedTask } =
    useContext(TaskContext);

  return (
    <>
      <TaskHeader />
      <table className="table text-white mb-0">
        <thead>
          <tr>
            <th scope="col">Team Member</th>
            <th scope="col">Task</th>
            <th scope="col">Priority</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <>
              <tr>
                <td colSpan={4}>
                  <Loading />{" "}
                </td>
              </tr>
            </>
          ) : (
            tasks.map((task) => (
              <Task
                task={task}
                deleteTask={() => deleteTask(task.id, task)}
                completedTask={() => completedTask(task.id, task)}
                members={members}
                key={task.id}
              />
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default Tasks;
