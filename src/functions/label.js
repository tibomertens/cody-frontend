import "dotenv";

export const calculateLabel = async (items) => {
  try {
    const response = await fetch(
      `https://energie.api.vlaanderen.be/energie-api/v1/berekenIndicatief`,
      {
        method: "POST",
        body: JSON.stringify(items),
        headers: {
          "Content-Type": "application/json",
          "x-apikey": import.meta.env.VITE_VEKA_API_KEY,
        },
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
