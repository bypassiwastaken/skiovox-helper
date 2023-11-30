/*export const NEW_TAB_URL = "chrome://new-tab-page";
export const FILES_URL = "chrome://file-manager";
export const HELP_URL = "https://github.com/bypassiwastaken/skiovox-helper";
export const WEBSTORE_URL = "https://chromewebstore.google.com";
export const ADDSESSION_URL = "https://accounts.google.com/signin/v2/identifier?hl=en&continue=https%3A%2F%2Fwww.google.com%2F&ec=GAlAmgQ&flowName=GlifWebSignIn&flowEntry=AddSession";*/
let urltopush = {
    "NEW_WEBSTORE_HOST": "chromewebstore.google.com",
    "OLD_WEBSTORE_HOST": "chrome.google.com",
    "OLD_WEBSTORE_PATH": "/webstore",
    "VIEW_SOURCE_PREFIX": "view-source:",
    "HISTORY_URL": "chrome://history",
    "DOWNLOADS_URL": "chrome://downloads",
    "NEW_TAB_URL": "chrome://new-tab-page",
    "FILES_URL": "chrome://file-manager",
    "HELP_URL": "https://github.com/bypassiwastaken/skiovox-helper",
    "WEBSTORE_URL": "https://chromewebstore.google.com",
    "ADDSESSION_URL": "https://accounts.google.com/signin/v2/identifier?hl=en&continue=https%3A%2F%2Fwww.google.com%2F&ec=GAlAmgQ&flowName=GlifWebSignIn&flowEntry=AddSession"
}
export const url = urltopush
export const urls = Object.keys(urltopush);