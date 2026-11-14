export const getCarImageSrc = (img) => {
  if (!img) {
    return "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=800&q=80";
  }
  if (
    img.startsWith("http://") ||
    img.startsWith("https://") ||
    img.startsWith("data:") ||
    img.startsWith("/") ||
    img.startsWith("blob:")
  ) {
    return img;
  }
  return `data:image/png;base64,${img}`;
};
