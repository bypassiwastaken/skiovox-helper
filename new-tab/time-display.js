class TimeDisplay {
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
       if(localStorage.getItem("timeLayout") == "2"){
           this.element.textContent = date.toLocaleTimeString("en-US", {hour12: false})
       }else{
           this.element.textContent = date.toLocaleTimeString("en-US", {hour12: true})
       }
    }
}

export { TimeDisplay }
