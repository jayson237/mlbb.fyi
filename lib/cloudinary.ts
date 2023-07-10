import cloudinary from "cloudinary";

export const cdn = cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CDN_API_KEY,
  api_secret: process.env.CDN_API_SECRET,
  secure: true,
});
