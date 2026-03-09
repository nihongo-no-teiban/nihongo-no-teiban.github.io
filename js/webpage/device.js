function adjustZoom(){
    var devicePixelRatio = window.devicePixelRatio || 1
    var zoom =  120 + (100 - Math.round(devicePixelRatio* 100))  + "%"
    waitForElem("#side-menu-button").then(function(button){
        button.style.zoom = zoom
    })
    waitForElem("#side-menu").then(function(menu){
        menu.style.zoom = zoom
    })
}

if(window.matchMedia("(pointer: coarse)").matches == false){
    adjustZoom()
    window.addEventListener("resize",function(){
        adjustZoom()
    })
} else {}

setInterval(function(){
    
    waitForElem("#computer-zoom1").then(function(zoom1){
    waitForElem("#computer-zoom2").then(function(zoom2){
        if(window.matchMedia("(pointer: coarse)").matches){
            zoom1.style.display = "none"
            zoom2.style.display = "none"
        } else {
            zoom1.style.display = "block"
            zoom2.style.display = "block"
        }
    })
    })

    waitForElemAll(".control-key").then(function(control){
        if(window.navigator.platform.toUpperCase().indexOf('MAC')){
            control.innerText = "⌘"
        } else {
            control.innerText = "ＣＴＲＬ"
        }
    })

},1)

