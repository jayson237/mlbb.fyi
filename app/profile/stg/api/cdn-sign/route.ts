import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { cdn } from "@/lib/cloudinary";
import getCurrentUser from "@/lib/actions/getCurrentUser";

cdn;
const signUploadForm = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const eager = "e_blur:400,h_150,w_150|c_fill,h_150,w_150";
  const folder = process.env.CLOUDINARY_FOLDER;

  const signature = cloudinary.v2.utils.api_sign_request(
    {
      timestamp,
      eager,
      folder,
    },
    process.env.CDN_API_SECRET as string
  );

  return { timestamp, signature, eager, folder };
};

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );

  const cloudName = cloudinary.v2.config().cloud_name;
  const apiKey = cloudinary.v2.config().api_key;

  const sig = signUploadForm();
  return NextResponse.json(
    {
      folder: sig.folder,
      signature: sig.signature,
      timestamp: sig.timestamp,
      cloudname: cloudName,
      apikey: apiKey,
      eager: sig.eager,
      sig,
    },
    { status: 200 }
  );
}
