import { DragController } from "./drag-controller.js";
import { FullscreenController } from "./fullscreen-controller.js";

const THEME_URL_1 = "chrome://customize-chrome-side-panel.top-chrome";
const THEME_URL_2 = "chrome://personalization";
const FILES_URL = "chrome://file-manager";
const HELP_URL = "https://github.com/bypassiwastaken/skiovox-helper";
const WEBSTORE_URL = "https://chromewebstore.google.com";
const ADDSESSION_URL = "https://accounts.google.com/signin/v2/identifier?hl=en&continue=https%3A%2F%2Fwww.google.com%2F&ec=GAlAmgQ&flowName=GlifWebSignIn&flowEntry=AddSession";

let [
    theme,
    files,
    help,
    webStore,
    addAccount,
    move,
    fullscreen
] = document.querySelectorAll('svg')

theme.addEventListener('click', () => {
    chrome.tabs.create({ url: THEME_URL_1 })
    chrome.tabs.create({ url: THEME_URL_2 })
})

files.addEventListener('click', () => {
    chrome.tabs.create({}, (tab) => {
        chrome.tabs.update(tab.id, { url: FILES_URL })
    })
})

help.addEventListener('click', () => {
    chrome.tabs.create({ url: HELP_URL })
})

webStore.addEventListener('click', () => {
    let version = Number(navigator.appVersion.match(/Chrom(e|ium)\/([0-9]+)/)[2]);
    if (version < 114) { // not sure if this is actually the version
        alert("This web store may not supported by your version");
    }

    chrome.tabs.create({ url: WEBSTORE_URL })
})

addAccount.addEventListener('click', () => {
    chrome.tabs.create({ url: ADDSESSION_URL })
})

new DragController(move);
new FullscreenController(fullscreen);

// Code for searching from new tab
document.getElementById("searchInput").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    var query = document.getElementById("searchInput").value;

    window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(query);
  }
});