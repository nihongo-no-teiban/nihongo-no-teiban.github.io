var katakanaContent
katakanaContent = await fetch("../js/json/katakana.json")
.then(responce => responce.json())
var allKatakanaKana = Object.keys(katakanaContent)
var allKatakanaAnswers = Object.values(katakanaContent)
var katakanaTotalNum = allKatakanaKana.length
var katakanaTotalCorrect = 0

var katakanaInput, katakanaSubmitButton, katakanaDisplay,
katakanaQuizElems, katakanaResultsElem, katakanaResultTitle, katakanaResultInfo
katakanaInput = await waitForElem("#katakana-input").then(responce => responce)
katakanaSubmitButton = await waitForElem("#katakana-submit").then(responce => responce)
katakanaDisplay = await waitForElem("#katakana-display").then(responce => responce)
katakanaQuizElems = await waitForElem("#katakana-center").then(responce => responce)
katakanaResultsElem = await waitForElem("#katakana-results").then(responce => responce)
katakanaResultTitle = await waitForElem("#katakana-result-title").then(responce => responce)
katakanaResultInfo = await waitForElem("#katakana-result-info").then(responce => responce)

function kataReset(){
    allKatakanaKana = Object.keys(katakanaContent)
    allKatakanaAnswers = Object.values(katakanaContent)
    katakanaInput.value = ""
    katakanaResultTitle.innerText = ""
    katakanaResultInfo.innerText = ""
    katakanaTotalCorrect = 0
    katakanaResultsElem.style.display = "none"
    katakanaQuizElems.style.display = "block"
    kataSetQuestion()
}

function kataSubmit(){
    if((event.key == "Enter" || event.type == "click") && katakanaInput.value != ""){
        console.log(allKatakanaKana.length)
        if(katakanaInput.value.toUpperCase() == katakanaCurrentAnswer){
            katakanaInput.blur()
            katakanaInput.value = ""
            kataResult(true)
        } else {
            katakanaInput.blur()
            katakanaInput.value = ""
            kataResult(false)
        }
    } else {
        return
    }
}

function kataResult(correct){
    var delay = 750
    if(correct){
        var extra = 0
        katakanaTotalCorrect += 1
        katakanaResultTitle.innerText = "ＣＯＲＲＥＣＴ"
        katakanaResultInfo.innerText = "おつかれ！ (good job!)　ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧\n\n\n"
        if(allKatakanaKana.length == 1){
            katakanaQuizElems.style.display = "none"
            katakanaResultsElem.style.display = "block"
            setTimeout(function(){
                kataQuizComplete()
            },delay+200)
            return null
        }
    } else {
        var extra = 1750
        katakanaResultTitle.innerText = "ＩＮＣＯＲＲＥＣＴ"
        katakanaResultInfo.innerText = katakanaCurrentQuestion + ` is "` + katakanaCurrentAnswer.toLowerCase() + `" in romaji\n Don't worry, you got it next time\n\n(ﾉ^ヮ^)ﾉ　頑張って！`
        if(allKatakanaKana.length == 1){
            katakanaQuizElems.style.display = "none"
            katakanaResultsElem.style.display = "block"
            setTimeout(function(){
                kataQuizComplete()
            },delay+extra+200)
            return null
        }
    }
    katakanaQuizElems.style.display = "none"
    katakanaResultsElem.style.display = "block"
    var index = allKatakanaKana.indexOf(katakanaCurrentQuestion)
    allKatakanaKana.splice(index, 1)
    allKatakanaAnswers.splice(index, 1)
    kataSetQuestion()
    setTimeout(function(){
        katakanaResultsElem.style.display = "none"
        katakanaQuizElems.style.display = "block"
        katakanaInput.focus()
    },delay+extra)
}

function kataQuizComplete(){
    katakanaQuizElems.style.display = "none"
    katakanaResultTitle.innerText = "ＣＯＭＰＬＥＴＥ"
    var katakanaPercentage = (katakanaTotalCorrect/katakanaTotalNum)*100
    if(katakanaPercentage == 100){
        var extraText = "\n\nPerfect Score　ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧\n\n"
    } else if ((katakanaPercentage < 100 && katakanaPercentage >= 66)){
        var extraText = "\n\nGood Score　<(￣︶￣)>\n\n"
    } else if ((katakanaPercentage < 66 && katakanaPercentage >= 33)){
        var extraText = "\n\nNot Bad　(ﾉ^ヮ^)ﾉ\n\n"
    } else {
        var extraText = "\n\nThere's room for improvement　(´-ω-`( _ _ )\n\n"
    }
    katakanaResultInfo.innerText = "You Got " + Math.round(katakanaPercentage*100)/100 + "% " + "("+ katakanaTotalCorrect +"/"+ katakanaTotalNum +")" + extraText
    katakanaResultsElem.style.display = "block"
}

var katakanaCurrentQuestion
var katakanaCurrentAnswer
function kataSetQuestion(){
    var currentIndex = Math.floor(Math.random()*allKatakanaKana.length)
    katakanaCurrentQuestion = allKatakanaKana[currentIndex]
    katakanaCurrentAnswer = allKatakanaAnswers[currentIndex].toUpperCase()
    katakanaDisplay.innerText = katakanaCurrentQuestion
}
kataSetQuestion()

function kataClearSpaces(){
    if(event.key == "Enter" || event.key == " "){
        event.preventDefault();
    }
}



waitForElem("#katakana-quiz").then(function(katakanaButton){
var katakanaQuizMode = false
katakanaButton.innerText = "クイズ・モード・オフ（ＱＵＩＺ　ＭＯＤＥ　ＯＦＦ）"
katakanaButton.addEventListener("click", function(){
    if(katakanaQuizMode == false){
        katakanaButton.innerText = "クイズ・モード・オン（ＱＵＩＺ　ＭＯＤＥ　ＯＮ）"
        waitForElem("#katakana-contents").then(function(katakanaContainer){
            waitForElem("#katakana-quiz-contents").then(function(katakanaQuizContainer){
                katakanaContainer.style.display = "none"
                katakanaQuizContainer.style.display = "block"
            })
        })
        katakanaQuizMode = true
    } else {
        katakanaButton.innerText = "クイズ・モード・オフ（ＱＵＩＺ　ＭＯＤＥ　ＯＦＦ）"
        waitForElem("#katakana-contents").then(function(katakanaContainer){
            waitForElem("#katakana-quiz-contents").then(function(katakanaQuizContainer){
                katakanaContainer.style.display = "block"
                katakanaQuizContainer.style.display = "none"
                kataReset()
            })
        })
        katakanaQuizMode = false
    }
})
})

katakanaInput.addEventListener("keyup",kataSubmit)
katakanaInput.addEventListener("keydown",kataClearSpaces)
katakanaSubmitButton.addEventListener("click",kataSubmit)
