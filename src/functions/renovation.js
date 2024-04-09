export const getRenovations = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/renovations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch renovation data");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getRecommendedRenovations = async (userId) => {
  try {
    let apiEndpoint = `http://localhost:3000/api/v1/users/${userId}/recommended`;

    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recommended renovation data");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getActiveRenovations = async (userId) => {
  try {
    let apiEndpoint = `http://localhost:3000/api/v1/users/${userId}/active`;

    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch active renovation data");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getCompletedRenovations = async (userId) => {
  try {
    let apiEndpoint = `http://localhost:3000/api/v1/users/${userId}/completed`;

    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch completed renovation data");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getSavedRenovations = async (userId) => {
  try {
    let apiEndpoint = `http://localhost:3000/api/v1/users/${userId}/saved`;

    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch saved renovation data");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getRenovationById = async (renovationId) => {
  try {
    let apiEndpoint = `http://localhost:3000/api/v1/renovations/${renovationId}`;

    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch renovation data");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getUserRenovationById = async (userId, renovationId) => {
  try {
    let apiEndpoint = `http://localhost:3000/api/v1/users/${userId}/renovations/${renovationId}`;

    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch renovation data");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}