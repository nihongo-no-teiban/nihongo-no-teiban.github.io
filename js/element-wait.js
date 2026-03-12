// https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists

function waitForElem(name){
    return new Promise(resolve => {
        if(document.querySelector(name)){
            return resolve(document.querySelector(name))
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(name)) {
                observer.disconnect();
                resolve(document.querySelector(name));
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });

    })
}

function waitForElemAll(name, num){
    return new Promise(resolve => {
        const check = () => {
            const elements = document.querySelectorAll(name);
            if (elements.length >= num) {
                try{observer.disconnect()}catch{}
                resolve(elements);
                return true;
            }
            return false;
        };

        if (check()) return;

        const observer = new MutationObserver(check);
        observer.observe(document.documentElement, { childList: true, subtree: true });
    });
}