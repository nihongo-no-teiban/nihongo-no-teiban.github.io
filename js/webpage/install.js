var installPrompt
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault()
    installPrompt = event;
});

async function installApp(){
    if (!installPrompt) {
        return;
    }
    installPrompt.prompt();
}
setInterval(function(){
    waitForElem(".install-button").then(function(installButton){
        if (!installPrompt) {
            installButton.style.display = "none"
        } else {
            if(window.matchMedia('(display-mode: standalone)').matches){
                installButton.style.display = "none"
            } else {
                installButton.style.display = "block"
            }
        }
    })
},1)


