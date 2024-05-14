import { jwtDecode } from "jwt-decode";

export const isValidToken = (token) => {
  if (!token) {
    return false;
  } else {
    return true;
  }
};
export const registerUser = async (email, password, familyname) => {
  let apiEndpoint = `${import.meta.env.VITE_API_URL}/api/v1/users`;

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        email: email,
        password: password, 
        username: familyname,
      }),
    });

    if (!response.ok) {
      throw new Error("Mislukt om te registreren");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

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

export const loginUser = async (email, password) => {
  let apiEndpoint = `${import.meta.env.VITE_API_URL}/api/v1/users/login`;

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        email: email,
        password: password, 
      }),
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

export const updatePassword = async (email, password) => {
  
  let apiEndpoint = `${import.meta.env.VITE_API_URL}/api/v1/users/updatepassword`;

  try {
    const response = await fetch(apiEndpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        email: email,
        password: password, 
      }),
    });

    if (!response.ok) {
      throw new Error("User data updaten mislukt");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}