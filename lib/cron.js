const cron = require("node-cron");

cron.schedule("0 0 * * *", () => {
  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tier-script`)
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
