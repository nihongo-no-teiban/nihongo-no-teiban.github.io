setInterval(function(){
    waitForElem(".intro-audio").then(function(intro){
        waitForElem("#pwa-text").then(function(textElem){
            if(window.matchMedia('(display-mode: standalone)').matches){
                intro.style.display = "block"
                textElem.style.display = "block"

            } else {
                intro.style.display = "none"
                textElem.style.display = "none"
            }
        })
    })
},1)

