import { jwtDecode } from "jwt-decode";

export const checkToken = (token, router) => {
  if (!token) {
    // Redirect to the login page if the token is invalid
    router.push("/login");
    return false;
  } else {
    return true;
  }
};

export const getUser = (token) => {
  const decoded = jwtDecode(token);
  let userId = decoded.id;
  //get user by id
  let apiEndpoint = `http://localhost:3000/api/v1/users/${userId}`;
  return fetch(apiEndpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("User:", data);
      return data; // returning data for further processing if needed
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};