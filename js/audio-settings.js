function clearItems(){
    window.localStorage.removeItem("AUDIO")
    window.localStorage.removeItem("AUDIO-INTRO")
}



if(window.localStorage.getItem("AUDIO") == null || window.localStorage.getItem("AUDIO-INTRO") == null){
    window.localStorage.setItem("AUDIO", "1")
    window.localStorage.setItem("AUDIO-INTRO", "1")
}
waitForElem(".audio-button").then(function(elem){
    if(window.localStorage.getItem("AUDIO") == "1") {
        elem.innerText = "ミュート（ＭＵＴＥ）"
    } else {
        elem.innerText = "ミュート解除（ＵＮＭＵＴＥ）"
    }
})

waitForElem(".intro-audio").then(function(elem){
    if(window.localStorage.getItem("AUDIO-INTRO") == "1"){
        elem.innerText = "コンビニの音オン　（ＩＮＴＲＯ　ＯＮ）"
    } else {
        elem.innerText = "コンビニの音オフ（ＩＮＴＲＯ　ＯＦＦ）"
    }
})

function toggleAudio(){
    waitForElem(".audio-button").then(function(audio){
        waitForElem(".intro-audio").then(function(intro){
            if(window.localStorage.getItem("AUDIO") == "1") {
                window.localStorage.setItem("AUDIO", "0")
                window.localStorage.setItem("AUDIO-INTRO", "0")
                audio.innerText = "ミュート解除（ＵＮＭＵＴＥ）"
                intro.innerText = "コンビニの音オフ（ＩＮＴＲＯ　ＯＦＦ）"
            } else {
                window.localStorage.setItem("AUDIO", "1")
                window.localStorage.setItem("AUDIO-INTRO", "1")
                audio.innerText = "ミュート（ＭＵＴＥ）"
                intro.innerText = "コンビニの音オン　（ＩＮＴＲＯ　ＯＮ）"
            }
            console.log("audio = " + window.localStorage.getItem("AUDIO"))
            console.log("intro = " + window.localStorage.getItem("AUDIO-INTRO"))
         })
    })
}

function toggleIntro(){
    waitForElem(".intro-audio").then(function(intro){
        if(window.localStorage.getItem("AUDIO-INTRO") == "1") {
            window.localStorage.setItem("AUDIO-INTRO", "0")
            intro.innerText = "コンビニの音オフ（ＩＮＴＲＯ　ＯＦＦ）"
        } else {
            window.localStorage.setItem("AUDIO-INTRO", "1")
            intro.innerText = "コンビニの音オン　（ＩＮＴＲＯ　ＯＮ）"
        }
        console.log("intro = " + window.localStorage.getItem("AUDIO-INTRO"))
    })
}


