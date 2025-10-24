import cloudinary from "@/config/cloudinary";
import { UploadApiResponse } from "cloudinary";

export const uploadImage = async (buffer: Buffer<ArrayBuffer>): Promise<string> => {
  const uploadedImage = await new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "image" }, (error, result) => {
        if (error || !result) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

  return uploadedImage.secure_url;
};