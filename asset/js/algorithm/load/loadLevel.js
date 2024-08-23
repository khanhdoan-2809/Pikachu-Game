let levelAlgorithm

async function loadLevel() {
    // dynamic import
    // let url = new URL(location.href);
    // let level = url.searchParams.get("level");
    let level = localStorage.getItem("level")
    if (level == 1) {
        document.querySelector("#level").textContent = "Level 1"
        document.querySelector(".main").style.backgroundImage = "url('/asset/img/background/back1.jpg')"
        levelAlgorithm = await import('../level/level1_none.js');
    } else if (level == 2) {
        document.querySelector("#level").textContent = "Level 2"
        document.querySelector(".main").style.backgroundImage = "url('/asset/img/background/back2.jpg')"
        levelAlgorithm = await import('../level/level2_bottom.js')
    } else if (level == 3) {
        document.querySelector("#level").textContent = "Level 3"
        document.querySelector(".main").style.backgroundImage = "url('/asset/img/background/back3.jpg')"
        levelAlgorithm = await import('../level/level3_top.js')
    } else if (level == 4) {
        document.querySelector("#level").textContent = "Level 4"
        document.querySelector(".main").style.backgroundImage = "url('/asset/img/background/back4.jpg')"
        levelAlgorithm = await import('../level/level4_left.js')
    } else if (level == 5) {
        document.querySelector("#level").textContent = "Level 5"
        document.querySelector(".main").style.backgroundImage = "url('/asset/img/background/back5.jpg')"
        levelAlgorithm = await import('../level/level5_right.js')
    } else {
        document.querySelector("#level").textContent = "Level 6"
        document.querySelector(".main").style.backgroundImage = "url('/asset/img/background/back6.jpg')"
        levelAlgorithm = await import('../level/level6_inside.js')
    }
    return levelAlgorithm.default
}

export {loadLevel}