import { exec } from "child_process";
import { NextApiRequest, NextApiResponse } from "next";

export default function runScriptHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    exec("py ../tierlist-model.py", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error.message}`);
        return res.status(500).json({
          error: "An error occurred while executing the script.",
        });
      }

      if (stderr) {
        console.error(`Script execution error: ${stderr}`);
        return res.status(500).json({
          error: "An error occurred while executing the script.",
        });
      }

      // Parse the JSON output
      let scriptOutput;
      try {
        scriptOutput = JSON.parse(stdout);
      } catch (parseError) {
        console.error("Error parsing script output:", parseError);
        return res.status(500).json({
          error: "An error occurred while parsing the script output.",
        });
      }

      return res.status(200).json(scriptOutput);
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while executing the script." });
  }
}
