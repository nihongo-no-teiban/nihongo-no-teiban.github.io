setInterval(function(){
    
    waitForElem("#computer-zoom").then(function(zoom){
        if(window.matchMedia("(pointer: coarse)").matches){
            zoom.style.display = "none"
        } else {
            zoom.style.display = "block"
        }
    })

    waitForElemAll(".control-key").then(function(control){
        if(window.navigator.platform.toUpperCase().indexOf('MAC')){
            control.innerText = "⌘"
        } else {
            control.innerText = "ＣＴＲＬ"
        }
    })
},1)

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