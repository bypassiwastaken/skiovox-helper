const NEW_WEBSTORE_HOST = "chromewebstore.google.com"
const OLD_WEBSTORE_HOST = "chrome.google.com"
const OLD_WEBSTORE_PATH = "/webstore"

function onTabUpdate(tabId, _, tab) {
    if (!tab.url) return

    let url = new URL(tab.url)

    if (url.hostname !== OLD_WEBSTORE_HOST) return
    if (!url.pathname.startsWith(OLD_WEBSTORE_PATH)) return

    url.hostname = NEW_WEBSTORE_HOST
    url.pathname = url.pathname.replace(OLD_WEBSTORE_PATH, "")
    chrome.tabs.update(tabId, {
        url: url.toString()
    })
}

chrome.tabs.onUpdated.addListener(onTabUpdate)