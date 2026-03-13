function scrollById(event,Name){
    var menuA = event.srcElement.getBoundingClientRect()
    var elem = document.getElementById(Name)
    var elemRect = elem.getBoundingClientRect()
    var topPadding = Number(window.getComputedStyle(elem, null).getPropertyValue('padding-top').replace("px",""))
    if(window.matchMedia("(pointer: coarse)").matches) {
        window.scrollTo(0,elemRect.top + window.scrollY - menuA.top + topPadding + menuA.height - 25)
    } else {
        window.scrollTo(0,elemRect.top + window.scrollY - menuA.y + (topPadding * window.devicePixelRatio) + menuA.height + 10 * window.devicePixelRatio - 10)
    }
}

var sideToggle = false
waitForElem("#side-menu-button").then(function(button){
    waitForElem("#side-menu").then(function(menu){
        button.addEventListener("click",function(){
            if(sideToggle){
                button.innerText = "☰"
                button.style.fontWeight = "400"
                menu.style.transform = "translateX(-100%)"
                sideToggle = false
            } else {
                button.innerText = "✕"
                button.style.fontWeight = "600"
                menu.style.transform = "translateX(0px)"
                sideToggle = true
            }
        })
    })
})

    

document.addEventListener("click",function(event){
    var counter = 0
    waitForElem("#side-menu-button").then(function(button){
        waitForElem("#side-menu").then(function(menu){
            waitForElem("#menu-button-area").then(function(banner){
                if(!button.contains(event.target)){
                    counter++
                }
                if(!menu.contains(event.target)){
                    counter++
                }
                if(!banner.contains(event.target)){
                    counter++
                }
                if(counter == 3){
                    button.innerText = "☰"
                    button.style.fontWeight = "400"
                    menu.style.transform = "translateX(-100%)"
                    sideToggle = false
                }
            })
        })
    })
})

function openForm() {
    window.open("https://rune-spatula-bbb.notion.site/ebd//31cf990f08338050bd3bd481851d9d32", '_blank').focus();
}

async function createList(){
    var list = [
        ["インストール（ＩＮＳＴＡＬＬ）","installApp()", "-function install-button"],
        ["ご意見用紙（ＦＥＥＤＢＡＣＫ　ＦＯＲＭ）","openForm()", "-function"],
        ["","toggleAudio()", "-function audio-button"],
        ["","toggleColors(event)", "-function dark-mode"],
        ["","", 0],
        ["日本語の定番チートシート","window.scrollTo(0,0)", 1]
    ]
    //this is to ensure all headings exist
    await waitForElem("#counter-title").then(response => response)
    var firstHeading = await waitForElem("#kana-title").then(response => response)
    var titleList = []
    var currentElem = firstHeading
    var maxTitles = 100
    for(i=0;i<maxTitles;i++){
        try {
            if(currentElem.tagName == "H2" || currentElem.tagName == "H3"|| currentElem.tagName == "H4"){
                titleList.push(currentElem)
                currentElem = currentElem.nextElementSibling
            } else {
                currentElem = currentElem.nextElementSibling
            }
        } catch{
            break
        }
    }
    for(i=0;i<titleList.length;i++){
        if(titleList[i].tagName == "H2") {
            list.push([titleList[i].innerText,"scrollById(event,'"+titleList[i].id+"')",1])
        } else if(titleList[i].tagName == "H3"){
            list.push([titleList[i].innerText,"scrollById(event,'"+titleList[i].id+"')",2])
        } else {
            list.push([titleList[i].innerText,"scrollById(event,'"+titleList[i].id+"')",3])
        }
    }
    return list
}


//

function addContents(array){
    waitForElem("#side-menu-text").then(function(container){
        for(i=0;i<array.length;i++){
            var current = document.createElement("a")
            current.className = "menu-option " +"type" + array[i][2]
            current.setAttribute("onclick",array[i][1])
            current.innerText = array[i][0]
            container.appendChild(current)
        }
    })
}
var sideMenuList = createList().then(response => 
    addContents(response)
)

