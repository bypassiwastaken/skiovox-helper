class UpdateChecker {
  constructor() {
    this.checkUpdate();
  }
  checkUpdate() {
    const lastUpdateCheck = localStorage.getItem("lastUpdateCheck");

    // Check if 24 hours have passed since the last update check; When it isnt set, because of first download, this will automatically pass.
    if (
      !lastUpdateCheck ||
      Date.now() - lastUpdateCheck >= 24 * 60 * 60 * 1000 // hours * minutes * seconds * milliseconds
    ) {
      fetch(
        "https://api.github.com/repos/bypassiwastaken/skiovox-helper/releases/latest"
      )
        .then((response) => response.json())
        .then((data) => {
          // Checks the repo's releases vs the chrome manifest version.
          const latestVersion = data.tag_name;
          const currentVersion = chrome.runtime.getManifest().version;

          if (latestVersion !== currentVersion) {
            // pop up a notification or update UI
            if (
              window.confirm(
                "An update is available. Would you like to download it?"
              )
            ) {
              window.open(
                "https://github.com/bypassiwastaken/skiovox-helper/releases/latest"
                // We could use use data.assets[0].browser_download_url, but with the file manager not opening, I
                // think most people will be dumb and think it auto updated, not knowing they'd have to extract and unpack.
              );
            }
          } else {
            console.info("No update available.");
          }

          // Update the epoch timestamp
          localStorage.setItem("lastUpdateCheck", Date.now());
        })
        .catch((error) =>
          console.error(
            "There was an error checking for updates. Error log:",
            error
          )
        );
    }
  }
}

export { UpdateChecker };
