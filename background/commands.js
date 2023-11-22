const VIEW_SOURCE_PREFIX = "view-source:"
const HISTORY_URL = "chrome://history"
const DOWNLOADS_URL = "chrome://downloads"

function getRecentWindow() {
  return new Promise(resolve => {
    chrome.windows.getLastFocused({ populate: true }, resolve);
  })
}

function cycleTabs(tabs, direction) {
  let currentTab = tabs.find((e) => e.active);
  if (!currentTab) return;

  let index = currentTab.index + direction;
  index = (index + tabs.length) % tabs.length // fix overflow
  chrome.tabs.update(tabs[index].id, { active: true });
}

async function onCommand(name, currentTab) {
  let recentWindow = await getRecentWindow()
  let recentTabs = recentWindow.tabs

  // exit fullscreen
  if (recentWindow && recentWindow.state === chrome.windows.WindowState.FULLSCREEN) {
    chrome.windows.update(recentWindow.id, { state: chrome.windows.WindowState.MAXIMIZED })
  }

  function openTab(url) {
    chrome.tabs.create({ windowId: recentWindow?.id, url });
  }

  switch (name) {
    case "NEW_TAB":
      openTab();
      break;

    case "ACCESS_HISTORY":
      openTab(HISTORY_URL);
      break;

    case "ACCESS_DOWNLOADS":
      openTab(DOWNLOADS_URL);
      break;

    case "VIEW_SOURCE":
      if (!currentTab) return;
      if (currentTab.url.startsWith(VIEW_SOURCE_PREFIX)) return;

      openTab(VIEW_SOURCE_PREFIX + currentTab.url);
      break;

    case "CLOSE_TAB":
      if (currentTab && currentTab.id !== chrome.tabs.TAB_ID_NONE) {
        chrome.tabs.remove(currentTab.id);
      }
      break;

    case "RESTORE_TAB":
      chrome.sessions.restore();
      break;

    case "NEW_WINDOW":
      chrome.windows.create({ state: "maximized" });
      break;

    case "NEW_INCOG_WINDOW":
      chrome.windows.create({ state: "maximized", incognito: true });
      break;

    case "CLOSE_WINDOW":
      if (recentWindow.focused) {
        chrome.windows.remove(recentWindow.id);
      }
      break;

    case "TAB_NEXT":
      cycleTabs(recentTabs, 1)
      break;

    case "TAB_BACK":
      cycleTabs(recentTabs, -1)
      break;

    case "SWITCH_WINDOWS":
      chrome.windows.getAll((windows) => {
        if (windows.length > 1) {
          chrome.windows.update(recentWindow.id, { focused: false });
        }
      })
      break;

    case "CTRL_1":
    case "CTRL_2":
    case "CTRL_3":
    case "CTRL_4":
    case "CTRL_5":
    case "CTRL_6":
    case "CTRL_7":
    case "CTRL_8":
      let num = Number(name.split("_")[1]);
      let specifiedTab = recentTabs[num - 1];
      if (!specifiedTab) return;

      chrome.tabs.update(specifiedTab.id, { active: true });
      break;

    case "CTRL_9":
      let lastTab = recentTabs[recentTabs.length - 1];
      chrome.tabs.update(lastTab.id, { active: true });
      break;
  }
}

chrome.commands.onCommand.addListener(onCommand);
