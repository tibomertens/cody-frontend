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
}