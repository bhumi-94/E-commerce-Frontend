const getImageUrl = (image) => {
  if (!image) {
    return "";
  }

  // Cloudinary / complete URL
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  // Old local backend image
  return `${import.meta.env.VITE_BACKEND_URL}${image}`;
};

export default getImageUrl;
