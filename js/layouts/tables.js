async function createTable(name){
    var content = await fetch("../js/json/"+name+".json").then(responce => responce.json())
    var kana = Object.keys(content)
    var romaji = Object.values(content)
    if(name.includes("50")){
        var groups = [
            /(?<![^aiueo])[aiueo]/,
            /k[aiueo]/,
            /^s[aueo]$|shi/,
            /t[aeo]|chi|tsu/,
            /n[aiueo]/,
            /^h[aiueo]$|f[aiueo]/,
            /m[aiueo]/,
            /y[auo]/,
            /r[aiueo]/,
            /w[ao]/,
            /n(?![aiueo])/,
        ]
    } else if(name.includes("voiced")){
        var groups = [
            /g[aiueo]/,
            /^z[aiueo]$|ji1/,
            /d[aizeo]|ji2/,
            /b[aiueo]/,
            /p[aiueo]/
        ]
    } else if(name.includes("youon")){
        var groups = [
            /ky[auo]/,
            /gy[auo]/,
            /sh[auo]/,
            /j[auo]1/,
            /ch[auo]/,
            /j[auo]2/,
            /ny[auo]/,
            /hy[auo]/,
            /by[auo]/,
            /py[auo]/,
            /my[auo]/,
            /ry[auo]/
        ]
    } else {
        return
    }
    var completeList = []
    for(i=0;i<groups.length;i++){
        var currentArr = []
        for(j=0;j<romaji.length;j++){
            if(groups[i].test(romaji[j])){
                currentArr.push([kana[j],romaji[j].replace(/[0-9]/,"")])
            }
        }
        if(name.includes("50") && i == 7){
            currentArr[4] = currentArr[2]
            currentArr[2] = currentArr[1]
            currentArr[1] = null
        }
        if(name.includes("50") && i == 9){
            currentArr[4] = currentArr[1]
            currentArr[1] = null
        }
        completeList.push(currentArr)
    }
    var currentDiv = await waitForElem("#"+name+"-contents").then(responce => responce)
    var currentTable = document.createElement("table")
    if(name.includes("hiragana") && (name.includes("50") || name.includes("voiced"))){
        var collums = ["","あ段","い段","う段","え段","お段"]
    } else if(name.includes("katakana") && (name.includes("50") || name.includes("voiced"))){
        var collums = ["","ア段","イ段","ウ段","エ段","オ段"]
    } else if(name.includes("hiragana") && name.includes("youon")){
        var collums = ["","や段","ゆ段","よ段"]
    } else if(name.includes("katakana") && name.includes("youon")){
        var collums = ["","ヤ段","ユ段","ヨ段"]
    } else {
        return
    }
    var titleTR = document.createElement("tr")
    for (i=0;i<collums.length;i++){
        var titleTH = document.createElement("th")
        if (collums[i] != ""){
            titleTH.innerText = collums[i] + "{" + collums[i].replace("段","") + "だん}"
        }
        titleTH.className = "ja-text table-title"
        titleTR.appendChild(titleTH)
    }
    currentTable.appendChild(titleTR)
    for (i=0;i<completeList.length;i++){
        var currentTR = document.createElement("tr")
        for (j=-1;j<completeList[i].length;j++){
            var currentTH = document.createElement("th")
            if(j == -1){
                currentTH.innerText = completeList[i][j+1][0][0] + "行{" + completeList[i][j+1][0][0] + "ぎょう}"
                currentTH.className = "ja-text table-title"
            } else {
                if(completeList[i][j] != null){
                    currentTH.innerText = completeList[i][j][0] + "{" + completeList[i][j][1] + "}"
                    currentTH.className = "ja-text"
                }
            }
            currentTR.appendChild(currentTH)
        }
        currentTable.appendChild(currentTR)
    }

    currentDiv.appendChild(currentTable)
}


var idList = [
    "hiragana-50",
    "hiragana-voiced",
    "hiragana-youon",
    "katakana-50",
    "katakana-voiced",
    "katakana-youon",
]
for (i=0;i<idList.length;i++){
    createTable(idList[i])
}
