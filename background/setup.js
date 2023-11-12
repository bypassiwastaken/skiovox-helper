const SHORTCUTS_URL = "chrome://extensions/shortcuts"
function hasSetup() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get("setup", (items) => {
            if (items) resolve(true);
            else resolve(false);
        });
    });
}
function setStatus() {
    chrome.storage.sync.set({ setup: true });
}

async function setup() {
    let setupStatus = await hasSetup();
    if (!setupStatus) {
        chrome.windows.getLastFocused((window) => {
         chrome.tabs.create({ windowId: window.id, url: SHORTCUTS_URL });
         setStatus();
    });
  }
} 
setup();
