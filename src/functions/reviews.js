import "dotenv";

export const getReviewsByPromotor = async (promotorId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/reviews/${promotorId}`
    );
    let data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const createNewReview = async (
  promotorId,
  userId,
  selectedStars,
  updatedTitle,
  updatedExperience
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/reviews/${promotorId}/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: selectedStars,
          title: updatedTitle,
          description: updatedExperience,
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/reviews/${reviewId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReviewById = async (reviewId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/reviews/review/${reviewId}`
    );
    let data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateReview = async (
  promotorId,
  userId,
  reviewId,
  selectedStars,
  updatedTitle,
  updatedExperience
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/reviews/${reviewId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promotorId: promotorId,
          userId: userId,
          rating: selectedStars,
          title: updatedTitle,
          description: updatedExperience,
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const report = async (id, is_reported) => {
  let apiEndpoint = `${import.meta.env.VITE_API_URL}/api/v1/reviews/report/${id}`;

  try {
    const response = await fetch(apiEndpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_reported: is_reported }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
