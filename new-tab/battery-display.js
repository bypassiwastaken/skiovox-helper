class BatteryDisplay {
    eventNames = ['chargingchange', 'chargingtimechange', 'dischargingtimechange', 'levelchange'];

    constructor(batteryPercent, batteryBar, batteryTime) {
        this.batteryPercent = batteryPercent
        this.batteryBar = batteryBar
        this.batteryTime = batteryTime
        this.render();
        this.listenForUpdates()
    }

    async getBattery() {
        let battery = await navigator.getBattery()
            .catch(() => reportError("Error reading battery."));

        battery.secsLeft = Math.min(battery.chargingTime, battery.dischargingTime)
        battery.isFull = battery.level === 1

        return battery
    }

    async render() {
        let battery = await this.getBattery()

        this.batteryPercent.textContent = this.getPercentMessage(battery)
        this.batteryBar.textContent = this.getChargingMessage(battery)
        this.batteryTime.textContent = this.getTimeMessage(battery)
    }

    getPercentMessage(battery) {
        if (battery.level == 1 && battery.charging) {
            return "Fully charged"
        }
        else { 
        return `Battery: ${Math.round(battery.level * 100)}%`
        }
    }

    getChargingMessage(battery) {
        if (battery.level == 1 && battery.charging) {
            return ""
        }
        if (battery.level == .69) {
            this.batteryBar.style.color = "cyan"
        }
        else {
            this.batteryBar.style.color = `rgb(${Math.min(2 - (battery.level * 2), 1) * 255}, ${Math.min((battery.level * 2), 1) * 255}, 0)`
        }
        const batteryLevels = ["", "▌"]
        return "█".repeat(Math.floor(1 * 25)) + batteryLevels[Math.floor(1 * 50) % 2]
    }

    getTimeMessage(battery) {
        let direction = battery.charging ? "full" : "empty"

        let hoursLeft = Math.floor(battery.secsLeft / 3600)
        let minsLeft = Math.floor(battery.secsLeft % 3600 / 60);
        let minsLeft2 = String(minsLeft).padStart(2, 0) // 8:9 to 8:09 etc
        if (battery.level == 1 && battery.charging) {
            return ""
        }
        if (hoursLeft == Infinity) {
            return "Calculating..."
        }
        if (hoursLeft >= 1) {
            return `Around ${hoursLeft}:${minsLeft2} until ${direction}`
        }
        if (minsLeft >= 2) {
            return `Around ${minsLeft} minutes until ${direction}`
        }
        if (minsLeft == 1) {
            return `Around 1 minute until ${direction}`
        }
        else {
            return `Around ${Math.floor(battery.secsLeft)} seconds until ${direction}`
        }
    }

    async listenForUpdates() {
        let battery = await this.getBattery();

        for (let eventName of this.eventNames) {
            battery.addEventListener(eventName, this.render.bind(this))
        }
    }
}

export { BatteryDisplay }