import { NextResponse } from "next/server";
import { exec } from "child_process";

export async function GET(request: Request) {
  const scriptPath = `rankstat-scrapper.py`;

  try {
    exec(`py ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return NextResponse.json(error, { status: 200 });
      }
      return NextResponse.json(
        {
          message: "Script executed successfully",
        },
        { status: 200 }
      );
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "An error occurred",
      },
      { status: 400 }
    );
  }
}
