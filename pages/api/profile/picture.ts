import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { dataUrl, data, url, userId } = req.body;
    const formData = new FormData();
    formData.append("file", dataUrl);
    formData.append("api_key", data.apikey);
    formData.append("timestamp", data.timestamp.toString());
    formData.append("signature", data.signature);
    formData.append("eager", data.eager);
    formData.append("folder", data.folder);

    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const result = await upload.json();

    const newImageUrl = result.secure_url;
    await prisma.user.update({
      where: {
        id: userId as string,
      },
      data: {
        image: newImageUrl,
      },
    });

    return res.status(200).json({
      message: "Update profile success.",
    });
  } catch (error) {
    return res.status(400).json({ message: "Unable to upload picture", error });
  }
}
