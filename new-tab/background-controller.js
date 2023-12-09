const TextColors = {
    BLACK: 0,
    WHITE: 1
}

class BackgroundController {
    static DEFAULT_COLOR = "#212121";

    constructor(colorChange, backgroundChange) {
        this.colorChange = colorChange
        this.backgroundChange = backgroundChange
        this.makeInputs()
        this.startListeners()
        this.displaySavedProperties()
    }

    makeInputs() {
        this.colorInput = document.createElement('input')
        this.colorInput.type = "color"

        let style = this.colorInput.style
        style.position = "fixed"
        style.display = "block"
        style.bottom = "30px"
        style.left = "0px"
        this.colorInput.value = this.getSavedColor()
        style.visibility = "hidden"
        document.body.appendChild(this.colorInput)

        this.fileInput = document.createElement('input')
        this.fileInput.type = "file"
        this.fileInput.accept = "image/png, image/jpeg, image/gif, image/webp"
        this.fileInput.style.visibility = "hidden"
        document.body.appendChild(this.fileInput)
    }

    startListeners() {
        this.colorChange.addEventListener('click', this.onClickedColor.bind(this))
        this.colorInput.addEventListener('input', this.onInputColor.bind(this))
        this.backgroundChange.addEventListener('click', this.onClickedBackground.bind(this))
        this.fileInput.addEventListener('change', this.onInputFile.bind(this))
    }

    onClickedColor() {
        this.colorInput.click()
    }

    onClickedBackground() {
        this.fileInput.click()
    }

    onInputColor() {
        let value = this.colorInput.value
        this.setSavedColor(value)
        this.displayColor(value)
    }

    onInputFile() {
        if (!this.fileInput.files) {return}
        let reader = new FileReader()
        reader.readAsDataURL(this.fileInput.files[0])
        let controller = this
        reader.addEventListener('load', async function() {
            controller.displayBackground(reader.result)
            controller.setSavedFile(reader.result)
        })
    }

    getSavedColor() {
        return localStorage.savedColor ?? BackgroundController.DEFAULT_COLOR
    }

    getSavedBackground() {
        return localStorage.savedBackground
    }

    setSavedColor(value) {
        localStorage.savedColor = value
    }

    setSavedFile (file) {
        try {
            localStorage.savedBackground = file
        }
        catch {
            // It will still be displayed, just not saved
            alert("This image is larger then 5mb and cannot be saved.")
        }
    }

    hasSavedColor() {
        return Boolean(localStorage.savedColor)
    }

    hasSavedBackground() {
        return Boolean(localStorage.savedBackground)
    }

    displayColor(color) {
        let red = parseInt(color.substring(1,3), 16)
        let green = parseInt(color.substring(3,5), 16)
        let blue = parseInt(color.substring(5,7), 16)
        let rgba = `rgba(${red}, ${green}, ${blue}, 0.65)`

        let background = document.querySelectorAll('.background')
        document.body.style.backgroundColor = color
        background.forEach(obj => obj.style.backgroundColor = rgba)

        if (BackgroundController.getTextColor(color) === TextColors.BLACK) {
            this.colorInput.style.colorScheme = "light"
            document.body.classList.add("black-text")
        } else {
            document.body.classList.remove("black-text")
            this.colorInput.style.colorScheme = "dark"
        }
    }

    displayBackground(background) {
        document.body.style.backgroundImage = `url(${background})`
    }

    displaySavedProperties() {
        if (this.hasSavedColor()) {
            this.displayColor(this.getSavedColor())
        }
        if (this.hasSavedBackground()) {
            this.displayBackground(this.getSavedBackground())
        }
    }

    static getTextColor(color) {
        let [r, g, b] = [1, 3, 5].map(n => parseInt(color.substr(n, 2), 16));
        let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? TextColors.BLACK : TextColors.WHITE;
    }
}

export { BackgroundController }