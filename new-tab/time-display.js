const TimeStyles = {
    DEFAULT: 1,
    NO_SECONDS: 2,
    AM_PM: 3,
    AM_PM_NO_SECONDS: 4
}

class TimeDisplay {
    constructor(element) {
        this.element = element
        this.timeStyle = this.getSavedStyle()
        this.render()
        this.startInterval()
    }

    startInterval() {
        this.element.addEventListener('click', this.onClickedTime.bind(this))
        setInterval(this.render.bind(this), 50)
    }

    render() {
        let date = new Date()

        let time = {
            hours: String(date.getHours()),
            hoursAmerican: String((date.getHours() - 1) % 12 + 1),
            amPm: date.getHours() > 12 ? "PM" : "AM",
            minutes: String(date.getMinutes()).padStart(2, '0'),
            seconds: String(date.getSeconds()).padStart(2, '0'),
        }

        switch (this.timeStyle) {
            case TimeStyles.DEFAULT:
                this.element.textContent = `${time.hours}:${time.minutes}:${time.seconds}`
                break;
            case TimeStyles.NO_SECONDS:
                this.element.textContent = `${time.hours}:${time.minutes}`
                break;
            case TimeStyles.AM_PM:
                this.element.textContent = `${time.hoursAmerican}:${time.minutes}:${time.seconds} ${time.amPm}`
                break;
            case TimeStyles.AM_PM_NO_SECONDS:
                this.element.textContent = `${time.hoursAmerican}:${time.minutes} ${time.amPm}`
                break;
        }
    }

    onClickedTime() {
        if (this.timeStyle >= 4) {
            this.timeStyle = 1
        } else {
            this.timeStyle += 1
        }

        this.setSavedStyle(this.timeStyle)
    }

    setSavedStyle(value) {
        localStorage.timeStyle = value
    }

    getSavedStyle() {
        return Number(localStorage.timeStyle) || TimeStyles.DEFAULT
    }
}

export { TimeDisplay }