import {Time} from "./time-bar.js"
let time = new Time()
let isClickManage=true
function loadTime() {
    time = new Time()
    time.activeTime()
}

window.addEventListener('load', function() {
    document.querySelector(".option").addEventListener("click", function() {
        if(isClickManage) {
        document.querySelector(".contain__manage").style.display="block"
            // document.querySelector("#audioBase").pause()
        clearInterval(time.intervalBar)
            isClickManage=false
        }
        else {
            document.querySelector(".contain__manage").style.display="none"
            // document.querySelector("#audioBase").play()
            time.activeTime()
            isClickManage=true
        }
    })

    document.querySelector("#manage__resume").addEventListener("click", ()=>{
        document.querySelector(".contain__manage").style.display="none"
        time.activeTime()
    })
    document.querySelector("#manage__restart").addEventListener("click", ()=>{
        window.location.reload();

    })
    document.querySelector("#manage__sound").addEventListener("click", ()=>{
        document.querySelector(".contain__bar-sound").style.display="flex"
    })
    document.querySelector("#manage__exit").addEventListener("click", ()=>{
        localStorage.clear()
        window.location.href = "intro.html"
    })

    document.querySelector(".contain__bar-close").addEventListener("click", ()=>{
        document.querySelector(".contain__bar-sound").style.display="none"
    })
})



export {time, loadTime}