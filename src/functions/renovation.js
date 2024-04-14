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
};

export const updateState = async (userId, renovationId, body) => {
  try {
    let apiEndpoint = `http://localhost:3000/api/v1/users/${userId}/renovations/${renovationId}/updateState`;

    const response = await fetch(apiEndpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to update renovation state");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updateAmount = async (userId, renovationId, body) => {
  try {
    let apiEndpoint = `http://localhost:3000/api/v1/users/${userId}/renovations/${renovationId}/updateAmount`;

    const response = await fetch(apiEndpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to update renovation amount");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updateUserData = async (userId, renovationId, body) => {
  try {
    let apiEndpoint = `http://localhost:3000/api/v1/users/${userId}/renovations/${renovationId}/updateUserData`;

    const response = await fetch(apiEndpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to update user data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updateSavedRenovation = async (userId, renovationId, body) => {
  try {
    let apiEndpoint = `http://localhost:3000/api/v1/users/${userId}/renovations/${renovationId}/updateSaved`;

    const response = await fetch(apiEndpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to update saved renovation");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updateNotes = async (userId, renovationId, body) => {
  try {
    let apiEndpoint = `http://localhost:3000/api/v1/users/${userId}/renovations/${renovationId}/updateNotes`;

    const response = await fetch(apiEndpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to update notes");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updateChecklist = async (userId, renovationId, body) => {
  try {
    let apiEndpoint = `http://localhost:3000/api/v1/users/${userId}/renovations/${renovationId}/updateChecklist`;

    const response = await fetch(apiEndpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checklist: body }),
    });

    if (!response.ok) {
      throw new Error("Failed to update checklist");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getSuggestions = async (type) => {
  try {
    let apiEndpoint = `http://localhost:3000/api/v1/renovations/type/${type}`;

    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch suggestions");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};