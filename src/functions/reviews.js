import "dotenv";

// export const getAllReviews = async () => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/reviews`);
//       let data = await response.json();
//       return data.data;
//     } catch (error) {
//       console.error(error);
//     }
//   };

export const getReviewsByPromotor = async (promotorId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/reviews/${promotorId}`);
      let data = await response.json();
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }