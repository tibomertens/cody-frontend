import "dotenv";

export const getAllPromotors = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/promotors`
    );
    let data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllLocations = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/locations`
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

export const createPromotor = async (body) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/promotors`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};