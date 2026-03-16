// use if changing color scheme
function clearColors(){
    window.localStorage.removeItem("PRIMARY")
    window.localStorage.removeItem("SECONDARY")
}

// light, dark
const COLORS = ["#F1F1F1","#BC002D"]
if(window.localStorage.getItem("PRIMARY") == null || window.localStorage.getItem("SECONDARY") == null || 
COLORS.includes(window.localStorage.getItem("PRIMARY")) == false || COLORS.includes(window.localStorage.getItem("SECONDARY")) == false){
    window.localStorage.setItem("PRIMARY", COLORS[0])
    window.localStorage.setItem("SECONDARY", COLORS[1])
}

function changeFavicon(dark){
    if(dark){
        var darkText = "dark"
    } else {
        var darkText = ""
    }
    try{document.getElementById("icon32").remove()}catch{}
    var current = document.createElement("link")
    current.id = "icon32"
    current.rel = "icon"
    current.type = "image/x-icon"
    current.href = "icons/icon32" + darkText + ".ico" + "?v=" + Date.now()
    document.head.appendChild(current)
}

if(window.localStorage.getItem("PRIMARY") == COLORS[0]){
    waitForElem(".dark-mode").then(function(darkmode){
        darkmode.innerText = "ダークモード（ＤＡＲＫ　ＭＯＤＥ）"
        changeFavicon(false)
    })
} else {
    waitForElem(".dark-mode").then(function(darkmode){
        darkmode.innerText = "ライトモード（ＬＩＧＨＴ　ＭＯＤＥ）"
        changeFavicon(true)
    })
}



function setColors(array){
    var r = document.querySelector(':root');
    r.style.setProperty("--PRIMARY",array[0])
    r.style.setProperty("--PRIMARYalpha",array[0]+"DF")
    r.style.setProperty("--SECONDARY",array[1])
}

function toggleColors(event){
    var temp = window.localStorage.getItem("PRIMARY")
    window.localStorage.setItem("PRIMARY", window.localStorage.getItem("SECONDARY"))
    window.localStorage.setItem("SECONDARY", temp)
    setColors([window.localStorage.getItem("PRIMARY"), window.localStorage.getItem("SECONDARY")])
    if(window.localStorage.getItem("PRIMARY") == COLORS[0]){
        event.srcElement.innerText = "ダークモード（ＤＡＲＫ　ＭＯＤＥ）"
        changeFavicon(false)
    } else {
        event.srcElement.innerText = "ライトモード（ＬＩＧＨＴ　ＭＯＤＥ）"
        changeFavicon(true)
    }
}

setColors([window.localStorage.getItem("PRIMARY"),window.localStorage.getItem("SECONDARY")])