(async() => {
    let battery = await navigator.getBattery()
    .catch(() => reportError("Error reading battery."));
    let showedWarning = false


    setInterval(() => {
        percentage = Math.round(battery.level * 100)
        if(percentage <= 15){
            if(showedWarning == false){
                alert("Battery has less than 15% remaining! Charge your device!")
                showedWarning = true
            }
        }else if(percentage <= 5){
            if(showedWarning == false){
                alert("Battery has less than 5% remaining! Charge your device!")
                showedWarning = true
            }
        }else{
            showedWarning = false
        }
    }, 5000);
})();