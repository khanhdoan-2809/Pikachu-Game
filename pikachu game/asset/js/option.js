let level = document.querySelector("#level")
let activeSound = false
let activeGuide = false

window.addEventListener('load', function() {
    loadButtonLevel()
    loadEditSound()
    loadGuide()
    document.querySelector("#exit").addEventListener("click", ()=>{
        window.location.href="intro.html"
    })
})

function loadButtonLevel() {
    level.addEventListener('click', function(){
        if (!level.hasAttribute('data-prevent-double-click')) {
            displayLevel()
        }
        else {
            noneDisplayLevel()
        }
    })
}

function displayLevel() {
    noneDisplayEditSound()
    noneDisplayGuide()

    document.querySelector(".contain__level").style.display = "block"
    level.disabled=true
    displayButton(level)
    document.querySelector("#level").style.backgroundColor="#000066"
}

function displayButton(level) {
    let levels = new Promise(function(resolve, reject){
        setTimeout(resolve, 100)
    })
    levels.then(function(){
        document.querySelector("#level1").style.display="block"
    })
        .then(function(){
            return new Promise(function(resolve, reject){
                setTimeout(resolve, 100)
            })
        })
        .then(function(){
            document.querySelector("#level2").style.display="block"
        })
        .then(function(){
            return new Promise(function(resolve, reject){
                setTimeout(resolve, 100)
            })
        })
        .then(function(){
            document.querySelector("#level3").style.display="block"
        })
        .then(function(){
            return new Promise(function(resolve, reject){
                setTimeout(resolve, 100)
            })
        })
        .then(function(){
            document.querySelector("#level4").style.display="block"
        })
        .then(function() {
            return new Promise(function(resolve, reject){
                setTimeout(resolve, 100)
            })
        })
        .then(function(){
            document.querySelector("#level5").style.display="block"
        })
        .then(function(){
            return new Promise(function(resolve, reject){
                setTimeout(resolve, 100)
            })        })
        .then(function(){
            document.querySelector("#level6").style.display="block"
            level.setAttribute('data-prevent-double-click', true);
            level.disabled=false
        })

}
function noneDisplayLevel() {
    level.disabled=true
    unDisplayButton(level)
    document.querySelector("#level").style.backgroundColor="#006699"
}

function unDisplayButton(level) {
    let levels = new Promise(function(resolve, reject){
        setTimeout(resolve, 100)
    })
    levels.then(function(){
        document.querySelector("#level6").style.display="none"
    })
        .then(function(){
            return new Promise(function(resolve, reject){
                setTimeout(resolve, 100)
            })
        })
        .then(function(){
            document.querySelector("#level5").style.display="none"
        })
        .then(function(){
            return new Promise(function(resolve, reject){
                setTimeout(resolve, 100)
            })
        })
        .then(function(){
            document.querySelector("#level4").style.display="none"
        })
        .then(function(){
            return new Promise(function(resolve, reject){
                setTimeout(resolve, 100)
            })
        })
        .then(function(){
            document.querySelector("#level3").style.display="none"
        })
        .then(function() {
            return new Promise(function(resolve, reject){
                setTimeout(resolve, 100)
            })
        })
        .then(function(){
            document.querySelector("#level2").style.display="none"
        })
        .then(function(){
            return new Promise(function(resolve, reject){
                setTimeout(resolve, 100)
            })
        })
        .then(function(){
            document.querySelector("#level1").style.display="none"
            level.disabled=false
            level.removeAttribute('data-prevent-double-click');
        })
}


function loadEditSound() {
    document.querySelector("#sound").addEventListener('click', ()=>{
        if(!activeSound){
            displayEditSound()
        }
        else {
            noneDisplayEditSound()
        }
    })
}
function displayEditSound() {
    noneDisplayLevel()
    noneDisplayGuide()
    document.querySelector(".contain__level").style.display = "none"

    activeSound=true
    document.querySelector("#sound").style.backgroundColor="#000066"
    document.querySelector(".contain__bar-sound").classList.remove("contain--hidden")
    document.querySelector(".contain__bar-sound").classList.add("contain--visible")
}

function noneDisplayEditSound() {
    activeSound=false
    document.querySelector(".contain__bar-sound").classList.remove("contain--visible")
    document.querySelector(".contain__bar-sound").classList.add("contain--hidden")
    document.querySelector("#sound").style.backgroundColor="#006699"
}

function loadGuide() {
    document.querySelector("#guide").addEventListener("click", ()=>{
        if (!activeGuide) {
            displayGuide()
        }else {
            noneDisplayGuide()
        }
    })
}

function displayGuide() {
    noneDisplayLevel()
    noneDisplayEditSound()
    document.querySelector(".contain__level").style.display = "none"

    document.querySelector(".contain__guide").classList.remove("contain--hidden")
    document.querySelector(".contain__guide").classList.add("contain--visible")
    activeGuide = true
}

function noneDisplayGuide() {
    document.querySelector(".contain__guide").classList.remove("contai--visible")
    document.querySelector(".contain__guide").classList.add("contain--hidden")
    activeGuide = false
}
