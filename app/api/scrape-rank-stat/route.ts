import { promisify } from "util";
import { NextResponse } from "next/server";
import { exec } from "child_process";

const execPromise = promisify(exec);

export async function GET(request: Request) {
  const scriptPath = `rankstat-scrapper.py`;

  try {
    const { stdout, stderr } = await execPromise(`py ${scriptPath}`);
    
    if (stderr) {
      return NextResponse.json({ message: stderr }, { status: 200 });
    }

    return NextResponse.json(
      {
        message: "Script executed successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred",
      },
      { status: 400 }
    );
  }
}
