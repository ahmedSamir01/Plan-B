import React from "react";
import { Link } from "react-router-dom";

function Course({ name, desc, photo, id }) {
  const placeholder =
    "https://images.unsplash.com/photo-1597484661973-ee6cd0b6482c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card">
        <img
          src={photo?.startsWith("~") ? placeholder : photo}
          className="card-img-top"
          alt={name}
        />
        <div className="card-body">
          <h5 className="card-title mb-3">{name}</h5>
          <p className="card-text">{desc}</p>
          <Link to={`/courses/${id}`} className="btn btn-primary">
            Enroll
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Course;
