import {time} from "../../manage.js";
let level = localStorage.getItem("level")

class BlockItem {
    constructor(x, y, state, label) {
        this.x = x
        this.y = y
        this.state = state
        this.label = label
    }
}

class Volume {
    constructor(value, isMuted) {
        this.value = value
        this.isMuted = isMuted
    }
}

let score = 0

function changeScore() {
    if (score == 355) {
        loadBoardScore()
        nextLevel()
    }
    else {
        console.log(score)
        score += 5
    }
    document.querySelector("#item__score").textContent =  score
}

function loadBoardScore() {
    if (level == 6) {
        document.querySelector(".img__board-score img").src="asset/img/background/cup.gif"
        document.querySelector(".button__next-level").style.display="none"
        document.querySelector(".board-level").textContent="victory"
    }
    else {
        document.querySelector(".board-level").textContent="level"+localStorage.getItem("level")
    }

    let promise = new Promise(function(resolve) {
        setTimeout(()=>{
            document.querySelector(".main").style.opacity=0.5
            document.querySelector(".contain__board-score").style.display="flex"
            resolve()
        }, 600)
    })
    promise.then(function() {
        setTimeout(()=>{
            document.querySelector(".img__board-score img").style.width="100%"
            document.querySelector(".img__board-score img").style.height="350px"
            clearInterval(time.intervalBar)
        }, 500)
    }).then(function() {
        return new Promise(function(resolve){
            setTimeout(resolve, 2000)
        })
    }).then(function() {
        let i = 0
        let interval= setInterval(()=>{
            i+=1
            document.querySelector("#board-hint").textContent = i
            if (i == 8) {
                clearInterval(interval)
            }
        }, 10)
    }).then(function() {
        return new Promise(function(resolve){
            setTimeout(resolve, 2000)
        })
    }).then(function() {
        let i = 0
        let interval= setInterval(()=>{
            i+=1
            document.querySelector("#board-time").textContent = i+"s"
            if (i == time.valueBar) {
                clearInterval(interval)
            }
        }, 10)
    }).then(function() {
        return new Promise(function(resolve){
            setTimeout(resolve, 2000)
        })
    }).then(function(){
        let i=0
        let interval= setInterval(()=>{
            i+=5
            document.querySelector("#board-score").textContent=i
            if (i == score) {
                clearInterval(interval)
                return
            }
        }, 10)
    })
}

function nextLevel() {
    document.querySelector("#nextLevel").addEventListener("click", ()=>{
        if (level != 6) {
            level = parseInt(level) + 1
            location.href = `play.html`;
            localStorage.setItem("level", level)
            location.href = `play.html`;
        }
    })
}

export {score, changeScore, Volume, BlockItem}
