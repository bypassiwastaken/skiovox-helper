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
        let battery = await this.getBattery();
        let arr = [
            this.getPercentMessage(battery),
            this.getChargingMessage(battery),
            this.getTimeMessage(battery)
        ]
        this.element.textContent = arr.filter((v) => v !== null).join(" ~ ");
    }

    isBatteryFull(batt) {
        return (batt.charging && Math.min(batt.chargingTime, batt.dischargingTime)) == Infinity;
    }
    getPercentMessage(battery) {
        if (this.isBatteryFull(battery)) return "Battery Full"
        return `Battery: ${Math.round(battery.level * 100)}%`
    }

    getChargingMessage(battery) {
        if (this.isBatteryFull(battery)) return null;
        return battery.charging ? "Charging" : "Not charging"
    }

    batteryRunoutTime(hours, mins) {
        // make hours and minutes plural when needed (e.g. '55 minute' becomes '55 minutes', '3 hour' becomes '3 hours', etc.)
        // also default the values to null if they are 0
        hours = !(hours === null || hours === NaN || hours == 0) ? `${(hours > 1) ? `${hours} hours` : `${hours} hour`}` : null;
        mins = !(mins === null || mins == 0) ? `${(mins > 1) ? `${mins} minutes` : `${mins} minute`}` : null;

        let numbTxt = "";

        // add the actuall numbers
        numbTxt += !(hours === null) ? hours : "";
        numbTxt += !(mins === null) ? `${!(numbTxt.length == 0) ? ` and ${mins}`: mins}` : "";

        numbTxt = (hours === null) && (mins === null) ? "Waiting on battery info..." : numbTxt;

        return numbTxt;
    }
    getTimeMessage(battery) {
        let secsLeft = Math.min(battery.chargingTime, battery.dischargingTime)
        let direction = battery.charging ? "full" : "empty"

        if (this.isBatteryFull(battery)) return null;

        let hoursLeft = Math.floor(secsLeft / 3600)
        let minsLeft = Math.floor(secsLeft % 3600 / 60);

        // default values to null if they are not defined
        hoursLeft = (hoursLeft === Infinity || hoursLeft === "NaN") ? null : hoursLeft;
        minsLeft = (minsLeft === Infinity || minsLeft === "NaN") ? null : minsLeft;

        let numbText = this.batteryRunoutTime(hoursLeft, minsLeft);

        let displayText = null;
        displayText = `Around ${numbText} left until battery is ${direction}`;
        return displayText;
    }

    async listenForUpdates() {
        let battery = await this.getBattery();

        for (let eventName of this.eventNames) {
            battery.addEventListener(eventName, this.render.bind(this))
        }
    }
}

export default BatteryDisplay