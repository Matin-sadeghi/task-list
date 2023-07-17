import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Not Found - 404</h1>
      <p className="notFound">
        <Link
          style={{ color: "whitesmoke" }}
          className="notFoundLink"
          to={"/task-list"}
        >
          Back to Home <i className="fa fa-home"></i>
        </Link>
      </p>
    </>
  );
};

export default NotFound;
