import { NextResponse } from "next/server";
import { exec } from "child_process";

export async function GET(request: Request) {
  const scriptPath = `tierlist-model.py`;

  try {
    exec(`py ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        return NextResponse.json(
          {
            msg: "Script execution failed",
          },
          { status: 500 }
        );
      }
      return NextResponse.json(
        {
          msg: "Script executed successfully",
        },
        { status: 200 }
      );
    });
  } catch (error) {
    return NextResponse.json(
      {
        msg: "An error occurred",
      },
      { status: 400 }
    );
  }
}
