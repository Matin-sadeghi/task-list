
import { Link} from "react-router-dom";
const Header = () => {

  return (
    <div className="text-center pt-3 pb-2">
      <img
        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
        alt="Check"
        width="60"
      />
      <h2 className="my-4">Task List</h2>
      <Link to={"/task-list/add"} className="btn btn-dark">
        add task
      </Link>
      {" "}
     
      <Link to={"/members"} className="btn btn-light">Members</Link> 
    </div>
  );
};

export default Header;
