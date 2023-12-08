class DateDisplay {
    static DEFAULT_DATE = 1 // 1 is d/m/y, 2 is m/d/y

    constructor(element) {
        this.element = element
        this.setDate = this.getSavedDate()
        this.render()
        this.startInterval()
    }

    startInterval() {
        this.element.addEventListener('click', this.onClickedDate.bind(this))
        setInterval(this.render.bind(this), 50)
    }

    render() { 
        let date = new Date()
        if (this.setDate == 2) {
           this.element.textContent = [
           date.getMonth() + 1,
           date.getDate(),
           date.getFullYear()
        ].join('/')
        }
        else {
        this.element.textContent = [
            date.getDate(),
            date.getMonth() + 1,
            date.getFullYear()
        ].join('/')
        }
    }

    onClickedDate() {
        if (this.setDate == 1) {
            this.setDate = 2
        }
        else {
            this.setDate = 1
        }
        this.setSavedDate(this.setDate)
    }

    setSavedDate(value) {
        localStorage.savedDate = value
    }

    getSavedDate() {
        if (localStorage.savedDate = null) {
            return localStorage.savedDate
        }
        else {
            return DateDisplay.DEFAULT_DATE
        }
    }
}

export { DateDisplay }
