function loadingAnimation(){
    var duration = 1000
    var delay = 500
    waitForElem("#loading-cover").then(function(elem){
        setTimeout(function(){
            elem.style.opacity = 0;
            elem.style.transition = "opacity 1s"
            setTimeout(function(){
                elem.style.display = "none";
            },duration)
        },delay)
        
    })
}

if(window.sessionStorage.getItem("playAnimation") == null){
    waitForElem("#loading-cover").then(function(elem){
        elem.style.opacity = 1;
        if(window.matchMedia('(display-mode: standalone)').matches){
            if(window.localStorage.getItem("AUDIO-INTRO") == "1"){
                var konbini = new Audio("audio/family-mart.mp3")
                konbini.play()
            }
        }
        loadingAnimation()
        window.sessionStorage.setItem("playAnimation", true)
    })
}
