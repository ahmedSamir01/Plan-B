import React, { useEffect, useState } from "react";
import Course from "../../components/Course";
import Spinner from "../../components/Spinner";
import fetchData from "../../server/fetchData";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  const [isCompleted, setIsCompleted] = useState(false);

  const [index, setIndex] = useState(2);

  const loadMore = () => {
    if (!isCompleted) {
      setLoadingButton(true);
      fetchData(`?latest=true&page=${index}&limit=12`)
        .then((json) => {
          setCourses([...courses, ...json]);
          if (json.length === 0 || json.length < 12) {
            setIsCompleted(true);
          } else {
            setIsCompleted(false);
            setIndex(index + 1);
          }
        })
        .catch((e) => console.error(e))
        .finally(() => {
          setIsLoading(false);
          setLoadingButton(false);
        });
    }
  };

  function loadMoreButton() {
    if (courses.length > 0) {
      if (isCompleted) {
        return (
          <button type="button" className="btn btn-danger disabled">
            That's It
          </button>
        );
      } else {
        return (
          <button
            disabled={loadingButton}
            onClick={loadMore}
            type="button"
            className="load-more-btn btn btn-danger"
          >
            {loadingButton && (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              />
            )}
            Load More
          </button>
        );
      }
    } else {
      return null;
    }
  }

  useEffect(() => {
    fetchData("?latest=true&page=1&limit=12")
      .then((json) => setCourses(json))
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container-fluid">
      <h2 className="my-4">Courses</h2>
      <div className="row">
        {isLoading ? (
          <Spinner />
        ) : courses.length > 0 ? (
          courses.map((item) => (
            <Course
              key={item.id}
              name={item.name}
              desc={item.desc}
              photo={item.photo}
              id={item.id}
            />
          ))
        ) : (
          <h2 className="text-center mt-4">There is no content to show</h2>
        )}
      </div>
      <div className="text-center mt-3 mb-5">{loadMoreButton()}</div>
    </div>
  );
}

export default Courses;
