import { jwtDecode } from "jwt-decode";

export const isValidToken = (token) => {
  if (!token) {
    return false;
  } else {
    return true;
  }
};

export const getUser = async (token) => {
  const decoded = jwtDecode(token);
  let userId = decoded.id;
  let apiEndpoint = `http://localhost:3000/api/v1/users/${userId}`;

  try {
    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
