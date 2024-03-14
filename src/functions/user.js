import { jwtDecode } from "jwt-decode";

export const isValidToken = (token) => {
  if (!token) {
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