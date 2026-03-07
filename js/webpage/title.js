var activeFrames = [
    "　(^０^)ノ",
    "　(^０^)／"
]
var inactiveFrames = [
    "　(－-－) zZ",
    "　(－o－) Zz"
]


var speed = 300
var counter = 0
setInterval(function(){
    if(document.visibilityState === 'visible'){
        speed = 300
        document.title = activeFrames[counter]
        if(counter > activeFrames.length - 2){
            counter = 0
        } else {
            counter += 1
        }
    } else {
        speed = 1000
        document.title = inactiveFrames[counter]
        if(counter > inactiveFrames.length - 2){
            counter = 0
        } else {
            counter += 1
        }
    }
    
},speed)