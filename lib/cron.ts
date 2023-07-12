const cron = require("node-cron");

cron.schedule("0 0 * * *", () => {
  cron.schedule("0 0 * * *", () => {
    fetch("http://localhost:3010/api/run-script")
      .then((response) => {
        if (response.ok) {
          console.log("Script execution scheduled successfully");
        } else {
          console.error("Failed to schedule script execution");
        }
      })
      .catch((error) => {
        console.error(`Failed to schedule script execution: ${error}`);
      });
  });
});
