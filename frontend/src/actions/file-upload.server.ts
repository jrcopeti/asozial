"use server";
import { baseUrl } from "@/constants";
import { getPlaiceholder } from "plaiceholder";

const uploadFile = async (formData: FormData) => {
  try {
    const response = await fetch(`${baseUrl}/api/upload-image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 413) {
        return { error: true, message: "Image is too large" };
      }
      if (response.status === 400 || response.status === 500) {
        return {
          error: true,
          message: "Accepted only images JPG, PNG or WEBP",
        };
      }
      throw new Error("Failed to upload file");
    }
    const data = await response.json();
    const src = data.url;

    const buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer()),
    );
    if (!buffer) {
      throw new Error("Failed to Buffer file");
    }
    const { base64 } = await getPlaiceholder(buffer);

    if (!base64) {
      throw new Error("Failed to get base64");
    }
    const finalData = {
      ...data,
      placeholder: base64,
    };

    return finalData;
  } catch (error) {
    console.error("Error uploading file:", error);
    return { error: true, message: "Error uploading image. Please try again." };
  }
};

export { uploadFile };
