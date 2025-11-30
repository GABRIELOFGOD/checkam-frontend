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

export const uploadFiles = async (files: Array<Buffer | string | ArrayBuffer | Blob>): Promise<string[]> => {
  const toBuffer = async (file: Buffer | string | ArrayBuffer | Blob): Promise<Buffer> => {
    // Node Buffer already
    if (Buffer.isBuffer(file)) return file as Buffer;

    // String URL -> fetch and get ArrayBuffer
    if (typeof file === "string") {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`Failed to fetch file URL: ${file}`);
      const ab = await res.arrayBuffer();
      return Buffer.from(ab);
    }

    // ArrayBuffer
    if (file instanceof ArrayBuffer) return Buffer.from(file);

    // TypedArray / DataView
    if (ArrayBuffer.isView(file)) {
      const view = file as ArrayBufferView;
      return Buffer.from(view.buffer, view.byteOffset, view.byteLength);
    }

    // Blob / File (browser)
    if (typeof Blob !== "undefined" && file instanceof Blob) {
      const ab = await file.arrayBuffer();
      return Buffer.from(ab);
    }

    throw new Error("Unsupported file type");
  };

  const uploadSingle = async (file: Buffer | string | ArrayBuffer | Blob): Promise<string> => {
    const buffer = await toBuffer(file);

    const uploaded = await new Promise<UploadApiResponse>((resolve, reject) => {
      // Use resource_type: "auto" so any file type is accepted
      cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, (error, result) => {
          if (error || !result) reject(error ?? new Error("No result from upload"));
          else resolve(result);
        })
        .end(buffer);
    });

    return (uploaded.secure_url ?? uploaded.url) as string;
  };

  const urls = await Promise.all(files.map(uploadSingle));
  return urls;
};
