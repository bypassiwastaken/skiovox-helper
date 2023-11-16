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
       this.element.textContent = [date.getMonth(),'/',date.getDate(),'/',date.getFullYear()].join('')
    }
}

export { DateDisplay }