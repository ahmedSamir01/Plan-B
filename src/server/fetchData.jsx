const fetchData = async (endpoint = "") => {
  const response = await fetch(
    `https://test.plan-b-eg.com/api/Courses/GetAllCourses${endpoint}`
  );

  if (response.ok) {
    let json = await response.json();
    return json;
  }

  throw new Error(response.status);
};

export default fetchData;
