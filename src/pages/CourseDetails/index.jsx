import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import FetchData from "../../server/fetchData";

function CourseDetails() {
  let { id } = useParams();
  const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const placeholder =
    "https://images.unsplash.com/photo-1597484661973-ee6cd0b6482c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";

  useEffect(() => {
    FetchData()
      .then((json) => {
        const result = json.filter((item) => item.id.toString() === id);
        setCourse(...result);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="course-details my-3">
      <div className="container-fluid">
        <h2 className="mt-5 mb-4">
          <Link to="/courses" className="btn btn-primary">
            Back
          </Link>
        </h2>
        {isLoading ? (
          <Spinner />
        ) : Object.keys(course).length > 0 ? (
          <div className="row">
            <div className="col-md-6">
              <img
                src={course.photo?.startsWith("~") ? placeholder : course.photo}
                className="card-img-top h-100 img-fluid"
                alt={course.name}
              />
            </div>
            <div className="col-md-6 py-3">
              <ul className="list-unstyled d-flex flex-column h-100">
                <li>
                  <h4>
                    <b>{course.name}</b>
                  </h4>
                </li>
                <li className="mb-3">
                  <b>{course.instractorName && course.instractorName[0]}</b>
                </li>
                <li className="mb-auto">{course.fullDesc}</li>
                <li>
                  <b>price: </b>
                  <span className="badge bg-success">{course.price} L.E</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <h2 className="text-center mt-4">There is no content to show</h2>
        )}
      </div>
    </div>
  );
}

export default CourseDetails;
