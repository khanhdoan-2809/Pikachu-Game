
import {Volume} from "./algorithm/algorithm/object.js";
let volumeBase
let volumeGame
let audioBase
let audioGame

window.addEventListener('load', function() {
    volumeBase =  JSON.parse(localStorage.getItem("volumeBase"))
    volumeGame =  JSON.parse(localStorage.getItem("volumeGame"))
    if (volumeBase == null) {
        volumeBase = new Volume(0.8, false)
    }
    if (volumeGame == null) {
        volumeGame = new Volume(0.8, false)
    }
    audioBase = document.querySelector('#audioBase')
    audioGame = document.querySelector('#audioGame')
    loadSound()
    muteVolume()
    editSound()
})

function loadSound() {
    let baseSound = document.querySelector("#baseSound")
    baseSound.style.width = (volumeBase.value*100)+"%"
    audioBase.volume = volumeBase.value
    let gameSound = document.querySelector("#gameSound")
    gameSound.style.width = (volumeGame.value*100)+"%"
    audioGame.volume = volumeGame.value

    if (volumeBase.isMuted) {
        audioBase.muted = true
        document.querySelector("#volumeBase").innerHTML=""
        let mute = document.createElement("i")
        mute.className = "fa-solid fa-volume-xmark"
        document.querySelector("#volumeBase").appendChild(mute)
    }
    if(volumeGame.isMuted) {
        audioGame.muted = true
        document.querySelector("#volumeGame").innerHTML=""
        let mute = document.createElement("i")
        mute.className = "fa-solid fa-volume-xmark"
        document.querySelector("#volumeGame").appendChild(mute)
    }
}

function editSound() {
    let baseSound = document.querySelector("#baseSound")
    let barBaseSound=document.querySelector("#barBaseSound")
    editDetailSound(barBaseSound, baseSound, audioBase, volumeBase)
    let gameSound = document.querySelector("#gameSound")
    let barGameSound=document.querySelector("#barGameSound")
    editDetailSound(barGameSound, gameSound, audioGame, volumeGame)

}



function editDetailSound(barSound, barValidSound, audioSound, volumeSound) {
    barSound.addEventListener("click", function(event){
        let barSoundRect=barSound.getBoundingClientRect()
        let value=Math.round((event.clientX-barSoundRect.left)/(barSoundRect.right-(barSoundRect.left))*100)
        if (value > 2 ){
            barValidSound.style.width=value+"%"
            let volume = barValidSound.dataset.volume
            document.querySelector("#"+volume).innerHTML=""
            let mute = document.createElement("i")
            mute.className = "fas fa-volume-up"
            document.querySelector("#"+volume).appendChild(mute)
            let newVolume = (parseInt(value))/100
            audioSound.volume = newVolume
            volumeSound.value = newVolume
            volumeSound.isMuted = false
        }
        else {
            barValidSound.style.width=0+"%"
            let volume = barValidSound.dataset.volume
            document.querySelector("#"+volume).innerHTML=""
            let mute = document.createElement("i")
            mute.className = "fa-solid fa-volume-xmark"
            document.querySelector("#"+volume).appendChild(mute)
            audioSound.volume = 0
            volumeSound.value=0
            volumeSound.isMuted = true
        }
        barValidSound.style.transition = "all 1s";
        localStorage.setItem("volumeBase", JSON.stringify(volumeBase))
        localStorage.setItem("volumeGame", JSON.stringify(volumeGame))
    })
}

function muteVolume() {

    document.querySelector("#volumeBase").addEventListener("click",function(){
        if (!volumeBase.isMuted) {
            this.innerHTML = ""
            let mute = document.createElement("i")
            mute.className = "fa-solid fa-volume-xmark"
            this.appendChild(mute)
            document.querySelector('#audioBase').muted = true
            volumeBase.isMuted = true
        }
        else {
            this.innerHTML = ""
            let mute = document.createElement("i")
            mute.className = "fas fa-volume-up"
            this.appendChild(mute)
            document.querySelector('#audioBase').muted = false
            volumeBase.isMuted = false
        }
        localStorage.setItem("volumeBase", JSON.stringify(volumeBase))
        localStorage.setItem("volumeGame", JSON.stringify(volumeGame))
    })
    document.querySelector("#volumeGame").addEventListener("click",function(){
        if (!volumeGame.isMuted) {
            this.innerHTML=""
            let mute = document.createElement("i")
            mute.className = "fa-solid fa-volume-xmark"
            this.appendChild(mute)
            document.querySelector('#audioGame').muted = true
            volumeGame.isMuted = true
        }
        else {
            this.innerHTML=""
            let mute = document.createElement("i")
            mute.className = "fas fa-volume-up"
            this.appendChild(mute)
            document.querySelector('#audioGame').muted = false
            volumeGame.isMuted = false
        }
        localStorage.setItem("volumeBase", JSON.stringify(volumeBase))
        localStorage.setItem("volumeGame", JSON.stringify(volumeGame))
    })

}
