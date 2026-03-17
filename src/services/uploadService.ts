/**
 * Uploads an image to the cloud. Currently uses a local blob URL placeholder.
 */
export const uploadImage = async (file: File): Promise<string> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // TODO: Implement actual Cloudinary/S3 upload logic here
  return URL.createObjectURL(file);
};