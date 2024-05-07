export const getTasks = async (userId) => {
  try {
    let apiEndpoint = `${import.meta.env.VITE_API_URL}/api/v1/tasks/${userId}`;

    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tasks data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updateTask = async (id, task) => {
  try {
    let apiEndpoint = `${import.meta.env.VITE_API_URL}/api/v1/tasks/${id}`;

    const response = await fetch(apiEndpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const removeTask = async (id) => {
  try {
    let apiEndpoint = `${import.meta.env.VITE_API_URL}/api/v1/tasks/${id}`;

    const response = await fetch(apiEndpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to remove task");
    }

    if (response.status === 204) {
      // Task successfully removed
      return { success: true };
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    let apiEndpoint = `${import.meta.env.VITE_API_URL}/api/v1/tasks`;

    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
