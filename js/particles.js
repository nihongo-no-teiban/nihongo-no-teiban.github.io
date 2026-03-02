// padding ajustments for ヴ
waitForElem("#group-234-screen").then(function(elem){
    elem.style.paddingLeft = "25px"
    elem.style.paddingRight = "25px"
})

window.localStorage.removeItem("PARTICLE-TEXT-DATA")

async function setParticles() {
    const response = await fetch('js/json/particles.json')
    const data = await response.json();
    async function addParticleBox(particle, text, container){
        var containers = document.querySelectorAll(".particle-container")
        var main = document.createElement("main")
        var particleArea = document.createElement("div")
        particleArea.className = "particle-area"
        var table = document.createElement("table")
        var tableInner = document.createElement("th")
        tableInner.id = "particle"
        tableInner.className = "ja-text"
        tableInner.innerText = particle
        table.appendChild(tableInner)
        particleArea.appendChild(table)
        main.appendChild(particleArea)
        for(var k=0;k<text.length;k++){
            var textBox = document.createElement("p")
            textBox.innerHTML = text[k]
            main.appendChild(textBox)
        }
        containers[container].appendChild(main)
    }

    for(var i=0;i<Object.values(data).length;i++){
        // i = container
        for(var j=0;j<Object.entries(Object.values(data)[i]).length;j++){
            var currentParticle = Object.entries(Object.values(data)[i])[j][0]
            // currentParticle = particle
            var currentText = Object.values(Object.entries(Object.values(data)[i])[j][1])
            // currentText = text
            addParticleBox(currentParticle,currentText,i)
        }
    }
}
setParticles()



