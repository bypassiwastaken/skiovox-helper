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
       if(localStorage.getItem("dateLayout") == "m"){
       this.element.textContent = [
           date.getMonth() + 1,
           date.getDate(),
           date.getFullYear()
       ].join('/')
       }else{
           date.getDate(),
           date.getMonth() + 1,
           date.getFullYear()
       }
    }
}

export { DateDisplay }
