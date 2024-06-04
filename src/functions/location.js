import "dotenv";

export const getAllLocations = async () => {
  console.log(import.meta.env.VITE_CODY_API_KEY);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/locations`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "cody-api-key": import.meta.env.VITE_CODY_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch renovation data");
    }

    let data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};
