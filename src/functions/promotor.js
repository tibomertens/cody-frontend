import "dotenv";

export const getAllPromotors = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/promotors`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "cody-api-key": import.meta.env.VITE_CODY_API_KEY,
        },
      }
    );
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
          "cody-api-key": import.meta.env.VITE_CODY_API_KEY,
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

export const uploadImage = async (file) => {
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET); // Configure this in your Cloudinary settings

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      return data.secure_url; // Save the Cloudinary URL
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
};

export const getUnacceptedPromotors = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/promotors/unaccepted`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "cody-api-key": import.meta.env.VITE_CODY_API_KEY,
        },
      }
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPromotorById = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/promotors/all/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "cody-api-key": import.meta.env.VITE_CODY_API_KEY,
        },
      }
    );

    let data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const acceptPromotor = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/promotors/accept/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "cody-api-key": import.meta.env.VITE_CODY_API_KEY,
        },
      }
    );

    let data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePromotor = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/promotors/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "cody-api-key": import.meta.env.VITE_CODY_API_KEY,
        },
      }
    );

    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
