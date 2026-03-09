const synth = new SpeechSynthesisUtterance()
speechSynthesis.addEventListener("voiceschanged", () => {
    var voices = window.speechSynthesis.getVoices();
    //console.log(voices)
    synth.voice = voices[28]
});




//update with new ja-screen elements
waitForElemAll("ja-screen", 291).then(function(ja_screen){
    // use for debugging
    //console.log(document.getElementsByClassName("ja-screen").length)
    elems = ja_screen
    if(window.matchMedia("(pointer: coarse)").matches){
        var clicker = "dblclick"
    } else {
        var clicker = "click"
    }
    for(i=0;i<elems.length;i++){
        elems[i].addEventListener(clicker,function(event){
            if(window.localStorage.getItem("AUDIO") == "1"){
                window.speechSynthesis.cancel()
                if(event.srcElement.parentElement.id == "particle"){
                    if(event.srcElement.innerHTML.split("<")[0] == "は"){
                        synth.text = "わ"
                    } else if (event.srcElement.innerHTML.split("<")[0] == "へ"){
                        synth.text = "え"
                    } else if (event.srcElement.innerHTML.split("<")[0] == "を"){
                        synth.text = "お"
                    } else {
                        synth.text = event.srcElement.innerHTML.split("<")[0]
                    }
                } else {
                    synth.text = event.srcElement.innerHTML.split("<")[0]
                }
                synth.lang = "ja"
                window.speechSynthesis.speak(synth) 
            }
        })
    }
})