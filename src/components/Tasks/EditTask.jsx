import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { getTask, updateTask } from "../../services/taskServices";

import Loading from "../Loading";
import { TaskHeader } from "..";
import { TaskContext } from "./../../context/taskContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { taskSchema } from "../../validations/taskValidation";
import {toast} from "react-toastify"
import { useImmer } from "use-immer";
const EditTask = () => {
  const { loading, setLoading, members, tasks, setTasks } =
    useContext(TaskContext);
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useImmer({});

  useEffect(() => {
    const findSelectedTask = async () => {
      try {
        setLoading(true);
        const { data: task } = await getTask(parseInt(taskId));
        setTask(task);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        navigate("/task-list");
      }
    };
    findSelectedTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateSelectedTask = async (values) => {
    try {
      setLoading(true);
      const { status, data } = await updateTask(values, parseInt(taskId));
      if (status === 200) {
        setLoading(false);

        const taskIndex = tasks.findIndex(
          (task) => task.id === parseInt(taskId)
        );
        setTasks((draft) => {
          draft[taskIndex] = data;
        });
        toast.info("your task has been updated ! ",{icon:"🔧"})
        navigate("/task-list");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <>
      <TaskHeader />

      {loading ? (
        <Loading />
      ) : (
        <Formik
          initialValues={{
            summary: task.summary,
            body: task.body,
            priority: task.priority,
            member: task.member,
          }}
          validationSchema={taskSchema}
          onSubmit={(values) => {
            updateSelectedTask(values);
          }}
        >
          <Form className="row g-3">
            <div className="col-md-12">
              <label htmlFor="summary" className="form-label">
                Task Summery
              </label>
              <Field
                type="text"
                className="form-control"
                placeholder="Task Summary"
                name="summary"
              />
              <ErrorMessage
                name="summary"
                render={(msg) => <div className="error-msg">{msg}</div>}
              />
            </div>

            <div className="col-12">
              <label htmlFor="body" className="form-label">
                Task
              </label>
              <Field
                className="form-control"
                name="body"
                as="textarea"
                cols="30"
                rows="10"
              />
              <ErrorMessage
                name="body"
                render={(msg) => <div className="error-msg">{msg}</div>}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <Field
                as="select"
                defaultValue={""}
                name="priority"
                className="form-select"
              >
                <option value="">Choose...</option>
                <option value="High">High priority</option>
                <option value="Middle">Middle priority</option>
                <option value="Low">Low priority</option>
              </Field>
              <ErrorMessage
                name="priority"
                render={(msg) => <div className="error-msg">{msg}</div>}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="member" className="form-label">
                Member
              </label>
              <Field
                as="select"
                defaultValue={""}
                name="member"
                className="form-select"
              >
                <option value="">Choose...</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.username}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="member"
                render={(msg) => <div className="error-msg">{msg}</div>}
              />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary me-1">
                Send
              </button>

              <Link to={"/task-list"} className="btn btn-danger">
                Back
              </Link>
            </div>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default EditTask;
