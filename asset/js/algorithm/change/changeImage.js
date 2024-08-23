import {objLabelHint, numberImgBlock, numberOfTypeBLock, arr} from "../base.js";

function changeImage() {
    let arrImgChosen = []
    for (let i = 1; i <= numberOfTypeBLock; i++) {
        let arrTmp = objLabelHint[i]
        let newImg = -1;
        while (true) {
            newImg = Math.floor(Math.random() * (numberImgBlock - 1)) + 1;
            if (newImg == i) {
                continue
            }
            if (arrImgChosen.includes(newImg)) {
                continue
            }
            arrImgChosen.push(newImg)
            break
        }

        for (let j = 0; j < arrTmp.length; j++) {
            let xTmp = arrTmp[j].x
            let yTmp = arrTmp[j].y
            document.querySelector("#block" + xTmp.toString() + yTmp.toString()).style.backgroundImage = `url('/asset/img/block/${newImg}.png')`;
            // arr[xTmp][yTmp].label=newImg

        }
    }
}

export {changeImage}