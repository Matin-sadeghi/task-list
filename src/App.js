import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useImmer } from "use-immer";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";
import { TaskContext } from "./context/taskContext";
import {
  Tasks,
  AddTask,
  EditTask,
  ViewTask,
  Members,
  AddMember,
  EditMember,
  ViewMember,
} from "./components/index";
import { getAllMembers } from "./services/memberServices";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "./services/taskServices";

function App() {
  const navigate = useNavigate();
  const [members, setMembers] = useImmer([]);

  const [loading, setLoading] = useImmer(false);
  const [tasks, setTasks] = useImmer([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: members } = await getAllMembers();
        const { data: tasks } = await getAllTasks();
        setTasks(tasks);
        setMembers(members);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const confirmDelete = (taskId, task) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      html: `<p>task : ${task.summary}</p>
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
          setLoading(true);
          const { status } = await deleteTask(taskId);
          if (status === 200) {
            setTasks((draft) =>
              draft.filter((task) => task.id !== parseInt(taskId))
            );
            toast.error("Your task has been deleted.", { icon: "🗑️" });
            // Swal.fire("Deleted!", "Your task has been deleted.", "success");
          }
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      }
    });
  };
  const completedTask = (taskId, task) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      html: `<p>task : ${task.summary}</p>
        <p>You won't be able to revert this!</p>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, completed it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const { status, data } = await updateTask(
            { ...task, completed: true },
            taskId
          );
          if (status === 200) {
            const taskIndex = tasks.findIndex(
              (task) => parseInt(task.id) === parseInt(taskId)
            );
            setTasks((draft) => {
              draft[taskIndex] = data;
            });
            toast.success("Your task has been completed.", { icon: "👍" });

           // Swal.fire("Completed!", "Your task has been completed.", "success");
          }
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      }
    });
  };

  const createNewTask = async (values) => {
    try {
      setLoading(true);
      const { status, data } = await createTask(values);
      if (status === 201) {
        toast.success("create task", { icon: "📃" });
        setTasks((draft) => {
          draft.push(data);
        });

        setLoading(false);
        navigate("/task-list");
      }
    } catch (err) {
      console.log(err.inner);
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        loading,
        setLoading,
        tasks,
        setTasks,
        members,
        setMembers,
        completedTask,
        deleteTask: confirmDelete,
        createTask: createNewTask,
      }}
    >
      <body>
        <ToastContainer rtl={false} theme="colored" />

        <section className="gradient-custom-2">
          <div className="container py-5">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-12 col-xl-10">
                <div className="card mask-custom">
                  <div className="card-body p-4 text-white">
                    <Routes>
                      <Route path="/" element={<Navigate to="/task-list" />} />
                      <Route path="/task-list" element={<Tasks />} />
                      <Route path="/task-list/add" element={<AddTask />} />
                      <Route path="/task-list/:taskId" element={<ViewTask />} />
                      <Route
                        path="/task-list/edit/:taskId"
                        element={<EditTask />}
                      />
                      <Route path="/members" element={<Members />} />
                      <Route path="/members/add" element={<AddMember />} />
                      <Route
                        path="/members/edit/:memberId"
                        element={<EditMember />}
                      />
                      <Route
                        path="/members/:memberId"
                        element={<ViewMember />}
                      />

                      <Route
                        path="*"
                        element={
                          <>
                            <h1 style={{ textAlign: "center" }}>not found</h1>
                          </>
                        }
                      />
                    </Routes>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"
          integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V"
          crossOrigin="anonymous"
        ></script>
      </body>
    </TaskContext.Provider>
  );
}

export default App;
