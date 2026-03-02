waitForElem("#hiragana-quiz").then(function(hiraganaButton){
    var hiraganaQuizMode = false
    hiraganaButton.innerText = "クイズ・モード・オフ（ＱＵＩＺ　ＭＯＤＥ　ＯＦＦ）"
    hiraganaButton.addEventListener("click", function(){
        if(hiraganaQuizMode == false){
            hiraganaButton.innerText = "クイズ・モード・オン（ＱＵＩＺ　ＭＯＤＥ　ＯＮ）"
            waitForElem("#hiragana-contents").then(function(hiraganaContainer){
                hiraganaContainer.style.display = "none"
            })
            hiraganaQuizMode = true
        } else {
            hiraganaButton.innerText = "クイズ・モード・オフ（ＱＵＩＺ　ＭＯＤＥ　ＯＦＦ）"
            waitForElem("#hiragana-contents").then(function(hiraganaContainer){
                hiraganaContainer.style.display = "block"
            })
            hiraganaQuizMode = false
        }
    })
})



