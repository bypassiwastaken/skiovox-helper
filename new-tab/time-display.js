class TimeDisplay {
  constructor(element) {
    this.element = element
    this.render()
    this.startInterval()
  }

  startInterval() {
    setInterval(this.render.bind(this), 50)
  }

  render() {
    let date = new Date();
    // 24 hour time, change the hour12 to true for 12 hour time
    this.element.textContent = date.toLocaleTimeString([], { hour12: false });
  }
}

export { TimeDisplay };