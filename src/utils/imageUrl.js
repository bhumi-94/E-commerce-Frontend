const getImageUrl = (image) => {
  if (!image || typeof image !== "string") {
    return "";
  }

  const cleanImage = image.trim();

  if (!cleanImage) {
    return "";
  }

  // Keep Cloudinary and other absolute image URLs unchanged
  if (/^https?:\/\//i.test(cleanImage)) {
    return cleanImage;
  }

  // Support older /uploads/... image paths
  const backendUrl = (
    import.meta.env.VITE_BACKEND_URL || ""
  ).replace(/\/+$/, "");

  const imagePath = cleanImage.startsWith("/")
    ? cleanImage
    : `/${cleanImage}`;

  return `${backendUrl}${imagePath}`;
};

export default getImageUrl;