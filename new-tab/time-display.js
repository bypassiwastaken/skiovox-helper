class TimeDisplay {
  constructor(element) {
    this.element = element;
    this.render();
    this.startInterval();
  }

  startInterval() {
    setInterval(this.render.bind(this), 50);
  }

  render() {
    let date = new Date();
    // Use the toLocaleTimeString method with options to display in 24-hour format
    this.element.textContent = date.toLocaleTimeString([], { hour12: false });
  }
}

export { TimeDisplay };