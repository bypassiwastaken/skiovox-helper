const DateStyles = {
    DEFAULT: 1,
    SWAP_MD: 2
}

class DateDisplay {
    constructor(element) {
        this.element = element
        this.dateStyle = this.getSavedStyle()
        this.render()
        this.startInterval()
    }

    startInterval() {
        this.element.addEventListener('click', this.onClickedDate.bind(this))
        setInterval(this.render.bind(this), 100)
    }

    render() {
        let date = new Date()

        let parts = {
            month: date.getMonth() + 1,
            day: date.getDate(),
            year: date.getFullYear()
        }

        if (this.dateStyle == 2) {
            this.element.textContent = [
                parts.month, parts.day, parts.year
            ].join('/')
        } else {
            this.element.textContent = [
                parts.day, parts.month, parts.year
            ].join('/')
        }
    }

    onClickedDate() {
        if (this.dateStyle === DateStyles.DEFAULT) {
            this.dateStyle = DateStyles.SWAP_MD
        } else {
            this.dateStyle = DateStyles.DEFAULT
        } // TODO: fix this middery

        this.setSavedStyle(this.dateStyle)
    }

    setSavedStyle(value) {
        localStorage.dateStyle = value
    }

    getSavedStyle() {
        return Number(localStorage.dateStyle) || DateStyles.DEFAULT
    }
}

export { DateDisplay }
