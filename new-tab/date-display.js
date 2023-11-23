class DateDisplay {
    constructor(element) {
        this.element = element
        this.render()
        this.startInterval()
    }

    startInterval() {
        setInterval(this.render.bind(this), 50)
    }

    render() { 
       let date = new Date()
       this.element.textContent = [
           date.getMonth() + 1,
           date.getDate(),
           date.getFullYear()
       ].join('/')
    }
}

export { DateDisplay }
