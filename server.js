const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const port = 3010;

app.get("/api/run-script", (req, res) => {
  const scriptPath = path.join(__dirname, "tierlist-model.py");

  exec(`py ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ message: "Script execution failed" });
    } else {
      res.status(200).json({ message: "Script executed successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
