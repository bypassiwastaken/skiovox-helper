class BatteryDisplay {
    eventNames = ['chargingchange', 'chargingtimechange', 'dischargingtimechange', 'levelchange'];

    constructor(element) {
        this.element = element;
        this.render();
        this.listenForUpdates()
    }

    getBattery() {
        return navigator.getBattery().catch(() => reportError("Error reading battery."));
    }

    async render() {
        let battery = await this.getBattery()
        let secsLeft = Math.min(battery.chargingTime, battery.dischargingTime)

        this.element.textContent = [
            this.getPercentMessage(battery, secsLeft),
            this.getChargingMessage(battery, secsLeft),
            this.getTimeMessage(battery, secsLeft)
        ].filter(v => typeof v != "undefined").join(" ~ ");
    }

    getPercentMessage(battery, secsLeft) {
        if (battery.charging && secsLeft == Infinity) return "Battery full";
        return `Battery: ${Math.round(battery.level * 100)}%`
    }

    getChargingMessage(battery, secsLeft) {
        if (battery.charging && secsLeft == Infinity) return;
        return battery.charging ? "Charging" : "Not charging"
    }

    getTimeMessage(battery, secsLeft) {
        let direction = battery.charging ? "full" : "empty"

        if (secsLeft == Infinity) return;

        let hoursLeft = Math.floor(secsLeft / 3600)
        let minsLeft = Math.floor(secsLeft % 3600 / 60);
        minsLeft = String(minsLeft).padStart(2, 0) // 8:9 to 8:09 etc

        return `Around ${hoursLeft}:${minsLeft} until ${direction}`
    }

    async listenForUpdates() {
        let battery = await this.getBattery();

        for (let eventName of this.eventNames) {
            battery.addEventListener(eventName, this.render.bind(this))
        }
    }
}

export { BatteryDisplay }