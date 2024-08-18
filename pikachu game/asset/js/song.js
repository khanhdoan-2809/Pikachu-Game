let songs = ["/asset/audio/Plastic%20Love.mp3",
"/asset/audio/Ocean%20Eyes.mp3",
"/asset/audio/No%20Time%20To%20Die.mp3",
]

window.addEventListener('load', function () {
    let song = new Audio()
    song.setAttribute("id", "audioBase")

    document.querySelector(".main").append(song)
    let currentSong = Math.floor(Math.random() * songs.length);

    song.src=songs[currentSong]
    song.play()
    song.addEventListener("ended", ()=>{
        currentSong++
        if (currentSong == songs.length) {
            currentSong=0
        }
        song.src=songs[currentSong]
        song.play()
    })
})