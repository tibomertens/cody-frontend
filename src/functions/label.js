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
      `${import.meta.env.VITE_API_URL}/api/v1/users/update/${userId}`,
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

export const updateBudget = async (items, userId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/users/budget/${userId}`,
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
      renovationsToUpdate.push("Zonneboiler incl. collectoren");
    }

    if (
      items.typePlatDakIsolatie === "sterk" ||
      items.typePlatDakIsolatie === "niet"
    ) {
      renovationsToUpdate.push("Warm plat dak (isolatie + dakdichting)");
    }

    if (
      items.typeHellendDakIsolatie === "sterk" ||
      items.typeHellendDakIsolatie === "niet"
    ) {
      renovationsToUpdate.push("Dakisolatie langs de binnenzijde");
      renovationsToUpdate.push(
        "Dak-isolatie langs de buitenzijde (Sarking dak)"
      );
    }

    if (
      items.typeVloerBovenKelderIsolatie === "sterk" ||
      items.typeVloerBovenKelderIsolatie === "niet"
    ) {
      renovationsToUpdate.push("Kelderplafondisolatie");
    }

    if (
      items.typeVloerOpVolleGrondIsolatie === "sterk" ||
      items.typeVloerOpVolleGrondIsolatie === "niet"
    ) {
      renovationsToUpdate.push("Isolatie en renovatie vloeren op volle grond");
    }

    if (items.typeGevelIsolatie === "sterk") {
      renovationsToUpdate.push("Na-isolatie van de spouwmuur");
      renovationsToUpdate.push("Buitenmuurisolatie langs de buitenzijde");
      renovationsToUpdate.push("Buitenmuurisolatie langs de binnenzijde");
    }

    if (items.pvAanwezig === true) {
      renovationsToUpdate.push("Zonnepanelen");
    }

    if (items.typeVenster === "driedubbel") {
      renovationsToUpdate.push("Driedubbel glas");
    }

    if (items.typeVenster === "dubbel" || items.typeVenster === "driedubbel") {
      renovationsToUpdate.push("Dubbel HR-glas");
    }

    if (items.typeVenster === "HR" || items.typeVenster === "driedubbel") {
      renovationsToUpdate.push("Dubbel HR-glas");
    }

    if (items.verwarmSanitairWarmWaterMet === "warmtepompboiler") {
      renovationsToUpdate.push("Warmtepompboiler");
    }

    if (
      items.typeVerwarming === "Elektrische warmtepomp lucht-lucht" ||
      items.typeVerwarming === "Elektrische warmtepomp lucht-water" ||
      items.verwarmingEnergiedrager === "Elektrische warmtepomp bodem-water"
    ) {
      renovationsToUpdate.push("Lucht-lucht warmtepomp");
    }

    if (
      items.typeVerwarming === "Elektrische warmtepomp lucht-water" ||
      items.typeVerwarming === "Elektrische warmtepomp bodem-water"
    ) {
      renovationsToUpdate.push(
        "Lucht-waterwarmtepomp (excl. warmteafgiftesysteem)"
      );
    }

    if (items.typeVerwarming === "Elektrische warmtepomp bodem-water") {
      renovationsToUpdate.push(
        "Bodem-waterwarmtepomp (excl. warmteafgiftesysteem)"
      );
    }

    if (
      items.typeVerwarming === "Niet-condenserende ketel" ||
      items.typeVerwarming === "Elektrische warmtepomp bodem-water"
    ) {
      renovationsToUpdate.push(
        "Gascondensatieketel (excl. warmteafgiftesysteem)"
      );
    }

    if (items.typeVentilatie === "CWTW" || items.typeVentilatie === "C") {
      renovationsToUpdate.push("Ventilatie type C");
    }

    if (items.typeVentilatie === "DWTW" || items.typeVentilatie === "D") {
      renovationsToUpdate.push("Ventilatie type D");
    }

    // Make API calls to update status for each renovation
    const updatePromises = renovationsToUpdate.map(async (renovationTitle) => {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/users/${userId}/renovations/${renovationTitle}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: "Extra",
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
          `${
            import.meta.env.VITE_API_URL
          }/api/v1/users/${userId}/renovations/${renovationTitle}`,
          {
            method: "PATCH",
            body: JSON.stringify({
              status: "Extra",
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
