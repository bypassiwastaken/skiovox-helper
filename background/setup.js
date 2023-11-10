const SHORTCUTS_URL = "chrome://extensions/shortcuts"

if (!localStorage.setUpYet) {
    chrome.windows.create({ url: SHORTCUTS_URL })
    localStorage.setUpYet = true
}