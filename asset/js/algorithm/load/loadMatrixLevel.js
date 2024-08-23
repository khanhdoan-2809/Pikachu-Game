import {BlockItem} from "../algorithm/object.js";
import {time} from "../../manage.js";
import {checkTwoBlock} from "../algorithm/checkTwoBlock.js";
import {
    arrBlockLeft,
    numberOfColumn,
    numberOfRow,
    numberOfTypeBLock,
    objLabelHint,
    rightChooseBlocks,
    arr,
    changeArr,
    changeTotalBlock,
    totalBlock
} from "../base.js";
import {score, changeScore} from "../algorithm/object.js";

let arrChild = []
let arrImg = []
let blockDeparture = null
let blockDestination = null

function loadMatrixLevel() {

    changeArr([])
    arrChild = []
    arrImg = []
    blockDeparture = null
    blockDestination = null
    let matrix = document.querySelector(".matrix")
    matrix.innerHTML = ""

    addIndexToArrImg()

    for (let x = 0; x < numberOfRow + 2; x++) {
        for (let y = 0; y < numberOfColumn + 2; y++) {
            let blockItem = new BlockItem(parseInt(x.toString()), parseInt(y.toString()), 1)
            if (x == 0 || y == 0 || x == numberOfRow + 1 || y == numberOfColumn + 1) {
                blockItem.state = 0
                arrChild.push(blockItem)
                let block = document.createElement("div")
                let img = Math.floor(Math.random() * (numberOfTypeBLock - 1)) + 1;
                let id = "block" + x.toString() + "" + y.toString()
                block.setAttribute("id", id)
                block.classList.add("block")
                block.classList.add("block--position")
                block.classList.add("block--hidden")
                matrix.appendChild(block)
                continue
            }
            let img = Math.floor(Math.random() * (arrImg.length) - 1) + 1;
            blockItem.label = arrImg[img]
            arrChild.push(blockItem)
            arrBlockLeft.push(blockItem.x + "~" + blockItem.y)

            let arrType = objLabelHint[blockItem.label] === undefined ? [] : objLabelHint[blockItem.label]
            let blockItemHint = new BlockItem(blockItem.x, blockItem.y, blockItem.state, blockItem.label)
            arrType.push(blockItemHint)
            objLabelHint[blockItemHint.label] = arrType


            let block = document.createElement("div")
            let id = "block" + x.toString() + "" + y.toString()
            block.setAttribute("id", id)
            block.classList.add("block")
            block.classList.add("block--position")
            block.classList.add("block--background-image")
            block.classList.add("block--background-color")
            block.classList.add("block-border")
            block.style.backgroundImage = `url('/asset/img/block/${arrImg[img]}.png')`;
            matrix.appendChild(block)

            arrImg.splice(img, 1);

            document.getElementById(id).addEventListener("click", () => {
                if (!time.isEndGame) {
                    let blockCurrent = document.getElementById(id)
                    if (arr[x][y].state == 0) {
                        // click block is removed
                        let arrBlockClicked = document.querySelectorAll(".clicked")
                        arrBlockClicked[0].classList.remove("clicked")
                        blockDeparture = null
                        blockDestination = null
                        return
                    }
                    if (blockCurrent.classList.contains("clicked")) {
                        blockCurrent.classList.remove("clicked")
                        blockDeparture = null
                        blockDestination = null
                    } else {
                        document.getElementById(id).classList.add("clicked")
                        if (blockDeparture == null && blockDestination == null) {
                            blockDeparture = arr[x][y]
                        } else if (blockDeparture != null && blockDestination == null) {
                            blockDestination = arr[x][y]
                        }
                        if (blockDeparture != null && blockDestination != null) {
                            if (checkTwoBlock(blockDeparture, blockDestination)) {
                                let blockDepartureTmp =blockDeparture
                                let blockDestinationTmp = blockDestination

                                let idDeparture = "block" + blockDeparture.x.toString() + blockDeparture.y.toString()
                                let idDestination = "block" + blockDestination.x.toString() + blockDestination.y.toString()
                                let departure = document.getElementById(idDeparture)
                                let destination = document.getElementById(idDestination)
                                let fire1 = document.createElement("img")
                                fire1.src = "/asset/img/background/fire.gif"
                                fire1.style.width="100%"
                                fire1.style.height="100%"
                                let fire2 = document.createElement("img")
                                fire2.src = "/asset/img/background/fire.gif"
                                fire2.style.width="100%"
                                fire2.style.height="100%"
                                departure.append(fire1)
                                destination.append(fire2)

                                setTimeout(()=>{
                                    rightChooseBlocks(blockDepartureTmp, blockDestinationTmp)
                                        departure.innerHTML=""
                                        destination.innerHTML=""
                                }, 600)


                                    changeScore()
                                    changeTotalBlock()


                                    let arrTempLabelHint = objLabelHint[blockDeparture.label]
                                    let t = objLabelHint[blockDeparture.label][blockDeparture.x]
                                    arrTempLabelHint = arrTempLabelHint.filter(
                                        (item) => (item.x.toString() + "" + item.y.toString()) != blockDeparture.x.toString() + "" + blockDeparture.y.toString())
                                    arrTempLabelHint = arrTempLabelHint.filter(
                                        (item) => (item.x.toString() + "" + item.y.toString()) != blockDestination.x.toString() + "" + blockDestination.y.toString())
                                    objLabelHint[blockDeparture.label] = arrTempLabelHint
                                    removeRedBorder()
                            }
                            else {
                                let gameSound = document.querySelector("#audioGame")
                                gameSound.play()

                                setTimeout(() => {
                                    document.querySelector("#audio").pause();
                                    document.querySelector("#audio").currentTime = 0;
                                }, 500)
                                removeRedBorder()
                            }
                            blockDeparture = null
                            blockDestination = null
                        }
                    }
                }
            })
        }
        arr.push(arrChild)
        arrChild = [] //reset
    }
}

function removeRedBorder() {
    let arrBlockClicked = document.querySelectorAll(".clicked")
    arrBlockClicked[0].classList.remove("clicked")
    arrBlockClicked[1].classList.remove("clicked")
}


function addIndexToArrImg() {
    // 144 block, 24 type, 6 pair
    for (let i = 1; i <= numberOfTypeBLock; i++) {
        for (let j = 0; j < 6; j++) {
            arrImg.push(i)
        }
    }
}


export {loadMatrixLevel}