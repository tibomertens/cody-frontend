export const getAllPromotors = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/promotors");
      let data = await response.json();
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };
  
export const getAllLocations = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/locations");
  
      if (!response.ok) {
        throw new Error("Failed to fetch renovation data");
      }
  
      let data = await response.json();
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };