var muteText = "ミュート（ＭＵＴＥ）"
var unmuteText = "ミュート解除（ＵＮＭＵＴＥ）"

function clearItems(){
    window.localStorage.removeItem("AUDIO")
}

if(window.localStorage.getItem("AUDIO") == null){
    window.localStorage.setItem("AUDIO", "1")
}
waitForElem(".audio-button").then(function(elem){
    if(window.localStorage.getItem("AUDIO") == "1") {
        elem.innerText = muteText
    } else {
        
        elem.innerText = unmuteText
    }
})

function toggleAudio(){
    waitForElem(".audio-button").then(function(audio){
        if(window.localStorage.getItem("AUDIO") == "1") {
            window.localStorage.setItem("AUDIO", "0")
            audio.innerText = muteText
        } else {
            window.localStorage.setItem("AUDIO", "1")
            audio.innerText = unmuteText
        }
    })
}


