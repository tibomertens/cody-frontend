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
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const addLabel = async (items, userId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/users/${userId}`,
      {
        method: "PATCH",
        body: JSON.stringify(items),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updateRecommendations = async (items, userId) => {
  try {
    const renovationsToUpdate = [];

    // Check conditions for each item using if statements
    if (items.zonneboilerAanwezig === true) {
      renovationsToUpdate.push("Zonneboiler");
    }
    if (items.typePlatDakIsolatie === "sterk") {
      renovationsToUpdate.push("Dak-isolatie");
    }
    if (items.typeHellendDakIsolatie === "sterk") {
      renovationsToUpdate.push("Dak-isolatie");
    }
    if (items.typeVloerBovenKelderIsolatie === "sterk") {
      renovationsToUpdate.push("Vloer-isolatie");
    }
    if (items.typeVloerOpVolleGrondIsolatie === "sterk") {
      renovationsToUpdate.push("Vloer-isolatie");
    }
    if (items.typeGevelIsolatie === "sterk") {
      renovationsToUpdate.push("Muur-isolatie");
    }
    if (items.pvAanwezig === true) {
      renovationsToUpdate.push("Zonnepanelen");
    }
    if (items.typeVenster === "driedubbel") {
      renovationsToUpdate.push("Driedubbele beglazing");
    }
    if (items.typeVenster === "dubbel") {
      renovationsToUpdate.push("Dubbele beglazing");
    }
    if (items.typeVenster === "HR") {
      renovationsToUpdate.push("HR-beglazing");
    }

    // Make API calls to update status for each renovation
    const updatePromises = renovationsToUpdate.map(async (renovationTitle) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/users/${userId}/renovations/${renovationTitle}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: "extra",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      return data;
    });

    // Wait for all API calls to complete
    const updatedRenovations = await Promise.all(updatePromises);
    return updatedRenovations;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updateChecklistRecommendations = async (items, userId) => {
  try {
    // Make API calls to update status for each item
    const updatePromises = items.map(async (renovationTitle) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/users/${userId}/renovations/${renovationTitle}`,
          {
            method: "PATCH",
            body: JSON.stringify({
              status: "extra",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error updating renovation:", error);
        throw error;
      }
    });

    // Wait for all API calls to complete
    const updatedRenovations = await Promise.all(updatePromises);
    return updatedRenovations;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
