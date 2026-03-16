

async function startQuiz(event){
    var button = document.getElementById(event.target.id)
    button.innerText = "テーブルモード（ＴＡＢＬＥ　ＭＯＤＥ）"
    button.removeEventListener("click", startQuiz)
    button.addEventListener("click", startTable)
    var type = event.target.id.replace("-quiz","")
    var content = await fetch("../js/json/"+type+".json").then(responce => responce.json())
    var permanentKana = Object.keys(content)
    var allKana = Object.keys(content)
    var allRomaji = Object.values(content)
    var tableContent = await waitForElem("#"+type+"-contents").then(responce => responce)
    var quizContent = await waitForElem("#"+type+"-quiz-contents").then(responce => responce)
    tableContent.style.display = "none"
    quizContent.style.display = "block"
    var letterDisplay = await waitForElem("#"+type+"-display").then(responce => responce)
    var inputBox = await waitForElem("#"+type+"-input").then(responce => responce)
    var submitButton = await waitForElem("#"+type+"-submit").then(responce => responce)
    var resultDisplay = await waitForElem("#"+type+"-results").then(responce => responce)
    var questionDisplay = await waitForElem("#"+type+"-center").then(responce => responce)
    var correctCounter = 0
    var questionCounter = await waitForElem("#"+type+"-counter").then(responce => responce)
    function setQuestion(){
        if(allKana.length == 0){
            setTimeout(quizComplete,100)
        } else{
            questionCounter.innerText = (1+(permanentKana.length-allKana.length)) + "/" + permanentKana.length
            questionDisplay.style.display = "block"
            resultDisplay.style.display = "none"
            var currentIndex = Math.floor(Math.random()*allKana.length)
            var currentQuestion = allKana[currentIndex]
            var currentAnswer = allRomaji[currentIndex].replace(/[0-9]/,"")
            allKana.splice(currentIndex, 1)
            allRomaji.splice(currentIndex, 1)
            letterDisplay.innerText = currentQuestion
            inputBox.focus()
            return [currentQuestion,currentAnswer]
        }
    }
    var currentInfo = setQuestion()
    function inputOptions(){
        if(inputBox.value != ""){
            inputBox.value = inputBox.value.replace(/[^a-zA-Z]/g, "")
        }
    }
    inputBox.addEventListener("keyup",inputOptions)
    function submit(event){
        if((event.type == "click" || event.key == "Enter") && inputBox.value != ""){
            var submittedAnswer = inputBox.value.toUpperCase()
            inputBox.value = ""
            if(submittedAnswer == currentInfo[1].toUpperCase()){
                result(true)
            } else {
                result(false)
            }
        }
    }
    inputBox.addEventListener("keydown",submit)
    submitButton.addEventListener("click",submit)
    var resultTitle = await waitForElem("#"+type+"-result-title").then(responce => responce)
    var resultInfo = await waitForElem("#"+type+"-result-info").then(responce => responce)
    function result(correctValue){
        questionDisplay.style.display = "none"
        resultDisplay.style.display = "block"
        if(correctValue){
            correctCounter += 1
            resultTitle.innerText = "CORRECT"
            resultInfo.innerText = "頑張れ　(Keep it Up)　(^０^)ノ"
            setTimeout(function(){
                currentInfo = setQuestion()
            },750)
        } else {
            
            resultTitle.innerText = "INCORRECT"
            resultInfo.innerText = "The correct Rōmaji for " + currentInfo[0] + ' is "' + currentInfo[1] + '"'
            setTimeout(function(){
                currentInfo = setQuestion()
            },0)
        }
    }
    function quizComplete(){
        questionDisplay.style.display = "none"
        resultDisplay.style.display = "block"
        resultTitle.innerText = "COMPLETE"
        var percentage = (correctCounter/permanentKana.length)*100
        var bonusText
        if (percentage == 100) {
            bonusText = "Perfect Score　ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧"
        } else if (100 > percentage || percentage > 66){
            bonusText = "Great Score　(•̀ᴗ•́ )و"
        } else if (66 > percentage > 33){
            bonusText = "Good Score　(˶ᵔ ᵕ ᵔ˶ )"
        } else {
            bonusText = "There's some work to be done　(ᴗ_ᴗ。)"
        }
        resultInfo.innerText = "Your Score: " + percentage + "% (" + correctCounter + "/" + permanentKana.length + ")\n\n" + bonusText
    }
}

async function startTable(event){
    var button = document.getElementById(event.target.id)
    button.innerText = "クイスモード（ＱＵＩＺ　ＭＯＤＥ）"
    button.removeEventListener("click", startTable)
    button.addEventListener("click", startQuiz)
    var type = event.target.id.replace("-quiz","")
    var tableContent = await waitForElem("#"+type+"-contents").then(responce => responce)
    var quizContent = await waitForElem("#"+type+"-quiz-contents").then(responce => responce)
    tableContent.style.display = "block"
    quizContent.style.display = "none"
    var inputBox = await waitForElem("#"+type+"-input").then(responce => responce)
    var submitButton = await waitForElem("#"+type+"-submit").then(responce => responce)
    inputBox.outerHTML = inputBox.outerHTML
    submitButton.outerHTML = submitButton.outerHTML

}

var quizButtons = document.getElementsByClassName("quiz-button")
for(i=0;i<quizButtons.length;i++){
    quizButtons[i].innerText = "クイスモード（ＱＵＩＺ　ＭＯＤＥ）"
    quizButtons[i].addEventListener("click",startQuiz)
}
