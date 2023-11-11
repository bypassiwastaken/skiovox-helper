class FullscreenController {
  constructor(element) {
    element.addEventListener('click', this.onClicked.bind(this));

    this.icons = Array.from(element.children);
    this.showProperIcon()
  }

  async onClicked() {
    if (await this.getFullscreen()) {
      this.showIcon(0)
      this.setFullscreen(false);
    } else {
      this.showIcon(1)
      this.setFullscreen(true);
    }
  }

  async showProperIcon() {
    let index = await this.getFullscreen() ? 1 : 0
    this.showIcon(index) // a bit repetitive
  }

  showIcon(index) {
    this.icons.forEach(e => e.style.display = "none")
    this.icons[index].style.display = "block"
  }

  setFullscreen(bool) {
    chrome.windows.getLastFocused((window) => {
      let state = bool
        ? chrome.windows.WindowState.MAXIMIZED
        : chrome.windows.WindowState.NORMAL
      chrome.windows.update(window.id, { state })
    })
  }

  getFullscreen() {
    return new Promise((resolve) => {
      chrome.windows.getLastFocused((window) => {
        let bool = window.state === chrome.windows.WindowState.MAXIMIZED
        resolve(bool)
      })
    })
  }
}

export { FullscreenController }