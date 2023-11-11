const SHORTCUTS_URL = "chrome://extensions/shortcuts"

if (!localStorage.setUpYet) {
    chrome.tabs.create({ url: SHORTCUTS_URL })
    localStorage.setUpYet = true
}