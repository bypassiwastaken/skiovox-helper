class Coords {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static fromEvent(event) {
    return new Coords(event.screenX, event.screenY);
  }

  static fromChrome(window) {
    return new Coords(window.left, window.top);
  }

  static fromDifference(c1, c2) {
    return new Coords(c1.x - c2.x, c1.y - c2.y);
  }
}

class DragController {
  isMouseDown = false;
  clickOffset;
  currentWindow;

  constructor(element) {
    element.addEventListener("mousedown", this.onMouseDown.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("mouseup", this.invalidateMouseDown.bind(this));
    window.addEventListener("blur", this.invalidateMouseDown.bind(this));
  }

  onMouseDown(event) {
    chrome.windows.getCurrent((window) => {
      let windowCoords = Coords.fromChrome(window);
      let clickCoords = Coords.fromEvent(event);
      this.clickOffset = Coords.fromDifference(clickCoords, windowCoords);

      this.isMouseDown = true;
      this.currentWindow = window;
    });
  }

  onMouseMove(event) {
    if (!this.isMouseDown) return;
    if (!this.clickOffset) return;
    if (!this.currentWindow) return;

    let mouseCoords = Coords.fromEvent(event);
    let deltaCoords = Coords.fromDifference(mouseCoords, this.clickOffset);

    let updateInfo = {
      left: deltaCoords.x,
      top: deltaCoords.y,
      height: this.currentWindow.height,
      width: this.currentWindow.width
    }

    chrome.windows.update(this.currentWindow.id, updateInfo, () => {
      if (chrome.runtime.lastError) {
        // TODO: change some visual thing
      }
    });
  }

  invalidateMouseDown(event) {
    this.isMouseDown = false;
  }
}

export { DragController };
