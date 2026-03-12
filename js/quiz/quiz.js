

async function startQuiz(event){
    var button = document.getElementById(event.target.id)
    button.innerText = "テーブルモード（ＴＡＢＬＥ　ＭＯＤＥ）"
    button.removeEventListener("click", startQuiz)
    button.addEventListener("click", startTable)
    var type = event.target.id.replace("-quiz","")
    var content = await fetch("../js/json/"+type+".json").then(responce => responce.json())
    const permanentKana = Object.keys(content)
    var allKana = Object.keys(content)
    var allRomaji = Object.values(content)
    var tableContent = await waitForElem("#"+type+"-contents").then(responce => responce)
    var quizContent = await waitForElem("#"+type+"-quiz-contents").then(responce => responce)
    tableContent.style.display = "none"
    quizContent.style.display = "block"
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
}

var quizButtons = document.getElementsByClassName("quiz-button")
for(i=0;i<quizButtons.length;i++){
    quizButtons[i].innerText = "クイスモード（ＱＵＩＺ　ＭＯＤＥ）"
    quizButtons[i].addEventListener("click",startQuiz)
}
