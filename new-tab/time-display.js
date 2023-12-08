class TimeDisplay {
    static DEFAULT_TIME = 1 
    // 1 : 13:40:24
    // 2 : 13:40   
    // 3 : 1:40:24 PM
    // 4 : 1:40 PM

    constructor(element) {
        this.element = element
        this.setTime = this.getSavedTime()
        this.render()
        this.startInterval()
    }

    startInterval() {
        this.element.addEventListener('click', this.onClickedTime.bind(this))
        setInterval(this.render.bind(this), 50)
    }

    render() {
        let date = new Date()
        var time
        if (this.setTime <= 2) {
            time = date.getHours()
        }
        else { 
            time = date.getHours() % 12
            if (time == 0) {
                time = 12
            }
        }
        time += ":" + String(date.getMinutes()).padStart(2, '0')
        if (this.setTime % 2 == 1) {
            time += ":" + String(date.getSeconds()).padStart(2, '0')
        }
        if (this.setTime > 2) {
            time += date.getHours() > 12 ? " PM" : " AM"
        }
        this.element.textContent = time
    }

    onClickedTime() {
        console.log(this.setTime)
        if (this.setTime >= 4) {
            this.setTime = 1
        }
        else {
            this.setTime += 1
        }
        this.setSavedTime(this.setTime)
    }

    setSavedTime(value) {
        localStorage.savedTime = value
    }

    getSavedTime() {
        if (localStorage.savedTime) {
            return localStorage.savedTime
        }
        else {
            return TimeDisplay.DEFAULT_TIME
        }
    }
}

export { TimeDisplay }