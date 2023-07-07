import { createContext } from "react";

export const TaskContext = createContext({
  loading: false,
  setLoading: () => {},
  tasks: [],
  setTasks: () => {},
  members: [],
  setMembers: () => {},
  deleteTask: () => {},
  createTask: () => {},
  completedTask: () => {},
});
