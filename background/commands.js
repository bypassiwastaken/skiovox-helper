function getRecent(callback) {
  chrome.windows.getLastFocused({ populate: true }, (window) => {
    callback({window, tabs: window.tabs})
  });
}

function cycleTabs(direction) {
  getRecent(({tabs}) => {
    let currentTab = tabs.find((e) => e.active);
    if (!currentTab) return;

    let index = currentTab.index + direction;
    index = (index + tabs.length) % tabs.length // fix overflow
    chrome.tabs.update(tabs[index].id, { active: true });
  });
}

function onCommand(name, tab) {
  switch (name) {
    case "NEW_TAB":
      getRecent(({window}) => {
        chrome.tabs.create({ windowId: window?.id });

        if (window && window.state === chrome.windows.WindowState.FULLSCREEN) {
          chrome.windows.update(window.id, { state: chrome.windows.WindowState.MAXIMIZED })
        }
      });
      break;

    case "CLOSE_TAB":
      if (tab && tab.id !== chrome.tabs.TAB_ID_NONE) {
        chrome.tabs.remove(tab.id);
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
      getRecent(({window}) => {
        if (window.focused) {
          chrome.windows.remove(window.id);
        }
      });
      break;

    case "TAB_NEXT":
      cycleTabs(1)
      break;

    case "TAB_BACK":
      cycleTabs(-1)
      break;

    case "SWITCH_WINDOWS":
      chrome.windows.getAll((windows) => {
        if (windows.length === 1) return;
        getRecent(({window}) => {
          chrome.windows.update(window.id, { focused: false });
        });
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
      getRecent(({tabs}) => {
        let specifiedTab = tabs[num - 1];
        if (!specifiedTab) return;

        chrome.tabs.update(specifiedTab.id, { active: true });
      });
      break;

    case "CTRL_9":
      getRecent(({tabs}) => {
        let lastTab = tabs[tabs.length - 1];
        chrome.tabs.update(lastTab.id, { active: true });
      });
      break;
  }
}

chrome.commands.onCommand.addListener(onCommand);
