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
       }else if (localStorage.getItem("dateLayout") == "m"){
           date.getDate(),
           date.getMonth() + 1,
           date.getFullYear()
       }else{
           date.getMonth() + 1,
           date.getDate(),
           date.getFullYear()
       }
    }
}

export { DateDisplay }
