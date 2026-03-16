//update with new ja-text elements
setTimeout(function(){
waitForElemAll(".ja-text", 460).then(function(elem){
    // use for debugging
    console.log(document.getElementsByClassName("ja-text").length)
    var JAelems = elem
    for (i=0;i<JAelems.length;i++) {
        var currentElem = JAelems[i]
        var currentList = currentElem.innerText.split(/{|}/)
        currentList = currentList.filter(function(e){return e})
        for(j=0;j<currentList.length;j++){
            if(j%2==0){
                currentElem.innerText = ""
                var screenSpan = document.createElement("span")
                var tableChecker = currentElem.parentElement.tagName
                if(tableChecker == "TR" && currentList[j].length == 1 && currentElem.id != "particle"){
                    screenSpan.className = "ja-screen singleKana"
                } else if(currentElem.className.includes("table-title") == false && 
                tableChecker == "TR" && currentList[j].length == 2 && currentElem.id != "particle"){
                    screenSpan.className = "ja-screen doubleKana"
                } else if(currentElem.className.includes("table-title") && 
                tableChecker == "TR" && currentList[j].length == 2 && currentElem.id != "particle"){
                    screenSpan.className = "ja-screen doubleKana ja-table-title"
                } else if(currentElem.className.includes("table-title") == false && 
                tableChecker == "TR" && currentList[j].length >= 2 && currentElem.id == "particle"){
                    screenSpan.className = "ja-screen moreParticle"
                }
                else {
                    screenSpan.className = "ja-screen"
                }
                screenSpan.innerText = currentList[j]
                screenSpan.id = "group-" + i + "-screen"
                currentElem.appendChild(screenSpan)
            } else {
                var popupSpan = document.createElement("span")
                popupSpan.id = "group-" + i + "-popup"
                if(tableChecker == "TR"){
                    popupSpan.className = "ja-popup hirakata"
                } else if(tableChecker == "TABLE"){
                    popupSpan.className = "ja-popup particle"
                } else{
                    popupSpan.className = "ja-popup"
                }
                popupSpan.innerText = currentList[j]
                screenSpan.appendChild(popupSpan)
                popupSpan.style.display = "none"

            }
        }

        for(j=0;j<currentList.length;j++){
            if(currentList[j][1] == false){
                var remainingText = document.createElement("span")
                remainingText.id = "group" + i + "-non-ja"
                remainingText.className = "ja-nontext"
                remainingText.innerText = currentList[j]
                currentElem.appendChild(remainingText)
            } 
        }

    }

    
    
    var popupElems = document.getElementsByClassName("ja-popup")
    var screenElems = document.getElementsByClassName("ja-screen")
    for(j=0;j<screenElems.length;j++){
        screenElems[j].addEventListener("mouseenter",function(event){
            var popupElement = document.getElementById(event.target.id.replace("screen","popup"))
            popupElement.style.display = "block"
        })
        screenElems[j].addEventListener("mouseleave",function(event){
            var popupElement = document.getElementById(event.target.id.replace("screen","popup"))
            popupElement.style.display = "none"
        })
    }
})
},100) //wait for elements to be created
