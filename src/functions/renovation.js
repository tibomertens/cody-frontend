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
    console.log("Data:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
