const TextColors = {
    BLACK: 0,
    WHITE: 1
}

class BackgroundController {
    static DEFAULT_COLOR = "#212121";

    constructor(element) {
        this.element = element
        this.makeColorInput()
        this.startListeners()
        this.displaySavedColor()
    }

    makeColorInput() {
        this.colorInput = document.createElement('input')
        this.colorInput.type = "color"
        this.colorInput.value = this.getSavedColor()
        this.colorInput.style.visibility = "hidden"
        this.element.parentElement.appendChild(this.colorInput)
    }

    startListeners() {
        this.element.addEventListener('click', this.onClicked.bind(this))
        this.colorInput.addEventListener('input', this.onInput.bind(this))
    }

    onClicked() {
        this.colorInput.click()
    }

    onInput() {
        let value = this.colorInput.value
        this.setSavedColor(value)
        this.displayColor(value)
    }

    getSavedColor() {
        return localStorage.savedColor ?? BackgroundController.DEFAULT_COLOR
    }

    setSavedColor(value) {
        localStorage.savedColor = value
    }

    hasSavedColor() {
        return Boolean(localStorage.savedColor)
    }

    displayColor(color) {
        document.body.style.backgroundColor = color;
        if (BackgroundController.getTextColor(color) === TextColors.BLACK) {
            document.body.classList.add("black-text")
        } else {
            document.body.classList.remove("black-text")
        }
    }

    displaySavedColor() {
        if (this.hasSavedColor()) {
            this.displayColor(this.getSavedColor())
        }
    }

    static getTextColor(color) {
        let [r, g, b] = [1, 3, 5].map(n => parseInt(color.substr(n, 2), 16));
        let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? TextColors.BLACK : TextColors.WHITE;
    }
}

export { BackgroundController }