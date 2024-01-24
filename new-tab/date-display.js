const DateStyles = ["DEFAULT", "SWAP_MD", "YMD"]
class DateDisplay {
    constructor(element) {
        this.element = element
        this.dateStyle = this.getSavedStyle()
        this.validityCheck()
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
        if (parseInt(this.dateStyle) > DateStyles.length) {
            this.dateStyle = 1
        }
        this.setSavedStyle(this.dateStyle)
    }

    setSavedStyle(value) {
        localStorage.dateStyle = value
    }

    getSavedStyle() {
        if (localStorage.dateStyle == null) {
            autoDetect(chrome.i18n.getUILanguage())
        }
        return localStorage.dateStyle || "1"
    }
    
    validityCheck() {
        if (parseInt(this.dateStyle) < 1) {
            //this.autoDetect(chrome.i18n.getUILanguage())
            this.dateStyle = "1";
        }
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
    }
}

export { DateDisplay }
/*const dmyLangs = ["el", "ml", "en-GB", "en-AU", "ca", "es", "es-419", "pt-BR", "pt-PT", "ro", "ru", "th", "kn", "mr", "uk", "pl", "ar", "fil", "he"]
const mdyLangs = ["en-US"]
const ymdLangs = ["ko", "vi", "zh-CN", "zh-TW", "sv", "sw"]*/
    /*autoDetect(lang) {
        if (this.dmyLangs.find(lang) > 0) {
            this.dateStyle = "1"
        } else if (this.mdyLangs.find(lang) > 0) {
            this.dateStyle = "2"
        } else if (this.ymdLangs.find(lang) > 0) {
            this.dateStyle = "3"
        } else {
            this.dateStyle = "1"
        }
        this.setSavedStyle(this.dateStyle)
        this.getSavedStyle()
        this.render()
    }
}*/
