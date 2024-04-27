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
  let apiEndpoint = `${import.meta.env.VITE_API_URL}/api/v1/users/${userId}`;

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
    return data.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAdmin = async (token) => {
  const decoded = jwtDecode(token);
  let isAdmin = decoded.admin;
  
  if (!isAdmin) {
    return false;
  }

  let userId = decoded.id;
  let apiEndpoint = `${import.meta.env.VITE_API_URL}/api/v1/users/${userId}`;

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
    return data.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const loginAdmin = async (email, password) => {
  let apiEndpoint = `${import.meta.env.VITE_API_URL}/api/v1/users/login/admin`;

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
