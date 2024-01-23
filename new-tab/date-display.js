const DateStyles = ["1", "2", "3"]
// DEFAULT, SWAP_MD, YMD
class DateDisplay {
    constructor(element) {
        this.element = element
        this.dateStyle = this.getSavedStyle()
        if (typeof this.dateStyle === 'string' || this.dateStyle instanceof String) {
            // ok cool
        } else {
            if (this.dateStyle = DateStyles.DEFAULT) {
            this.dateStyle = "1" 
        }
        else if (this.dateStyle = DateStyles.SWAP_MD) {
            this.dateStyle = "2"
        }
        else if (this.dateStyle = DateStyles.YMD) {
            this.dateStyle = "3"
        }
        }
        this.setSavedStyle(this.dateStyle)
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

        if (this.dateStyle == "1") {
            this.element.textContent = [
                parts.day, parts.month, parts.year
            ].join('/')
        } 
        else if (this.dateStyle == "2") {
            this.element.textContent = [
                parts.month, parts.day, parts.year
            ].join('/')
        } 
        else if (this.dateStyle == "3") {
            this.element.textContent = [
                parts.year, parts.month, parts.day
            ].join('/')
        }
    }

    onClickedDate() {
        this.dateStyle = parseInt(this.dateStyle)+1
        if (parseInt(this.dateStyle) > 3) {
            this.dateStyle = 1
        }
        this.setSavedStyle(this.dateStyle)
    }

    setSavedStyle(value) {
        localStorage.dateStyle = value
    }

    getSavedStyle() {
        return localStorage.dateStyle || "1"
    }
}

export { DateDisplay }
