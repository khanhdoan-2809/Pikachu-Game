import {arr, arrBlockLeft, changeArrBlockLeft, numberOfColumn, numberOfRow, objLabelHint} from "../base.js"
export default function rightChooseBlocks(blockDeparture, blockDestination) {
        let idDeparture = "block"+blockDeparture.x.toString()+blockDeparture.y.toString()
        let idDestination = "block"+blockDestination.x.toString()+blockDestination.y.toString()
        let departure=document.getElementById(idDeparture)
        let destination=document.getElementById(idDestination)

        let arrLine = document.querySelectorAll(".lineActive")
        let countLine = arrLine.length
        for(let line=0; line<countLine; line++) {
            arrLine[line].remove()
        }

        departure.style.backgroundImage=null
        destination.style.backgroundImage=null
        checkLevel6(blockDeparture, blockDestination)

}

function checkLevel6(blockDeparture, blockDestination) {
    let {yMin, yMax, xOfYMin, xOfYMax} = getMinMaxByY(blockDeparture, blockDestination)
    // set up again
    let blockTempDeparture = {x:0,y:0}
    let blockTempDestination = {x:0,y:0}
    blockTempDeparture.x = xOfYMax
    blockTempDeparture.y = yMax
    blockTempDestination.x = xOfYMin
    blockTempDestination.y = yMin

    if (blockTempDeparture.y > 8 && blockTempDestination.y > 8) {
        checkRowCurrent(blockTempDeparture)
        checkRowCurrent(blockTempDestination)
    }

    else {
        checkRowCurrent(blockTempDestination)
        checkRowCurrent(blockTempDeparture)

    }
}

function checkRowCurrent(blockItem) {
    if (blockItem.y > 8) {
        for (let i = blockItem.y; i < numberOfColumn + 1; i++) {
            let blockCurrent = document.querySelector("#block" + blockItem.x.toString() + "" + i.toString())
            if (arr[blockItem.x][i + 1].state == 0) {
                let k = "#block" + blockItem.x.toString() + "" + i.toString()
                document.querySelector(k).classList.remove("block--background-color")
                arr[blockItem.x][i].state = 0
                blockCurrent.style.backgroundImage = `none`

                document.querySelector("#block"+blockItem.x+i).classList.remove("block-border")


                let newArrBlockLeft = arrBlockLeft.filter(item=>item != blockItem.x+"~"+i)
                changeArrBlockLeft(newArrBlockLeft)
                break
            }
            arr[blockItem.x][i].label = arr[blockItem.x][i + 1].label
            // document.querySelector("#block" + blockItem.x + i).textContent = arr[blockItem.x][i].label
            let newImg = arr[blockItem.x][i + 1]

            let labelTmp = arr[blockItem.x][i + 1].label
            for (let k = 0; k < objLabelHint[labelTmp].length; k++) {
                if (objLabelHint[labelTmp][k].x == arr[blockItem.x][i].x && objLabelHint[labelTmp][k].y > arr[blockItem.x][i].y) {
                    if (objLabelHint[labelTmp][k].y != 0) {
                        objLabelHint[labelTmp][k].y = parseInt(objLabelHint[labelTmp][k].y) - 1
                    }
                }
            }

            if (newImg.label !== undefined) {
                blockCurrent.style.backgroundImage = document.querySelector("#block"+blockItem.x+(i+1)).style.backgroundImage
            } else {
                blockCurrent.style.backgroundImage = `none`
            }
        }
    }
    else if (blockItem.y < 8) {
        for (let i = blockItem.y; i >= 0; i--) {
            let blockCurrent = document.querySelector("#block"+blockItem.x.toString()+""+i.toString())
            if (arr[blockItem.x][i-1].state==0) {
                let k = "#block"+blockItem.x.toString()+""+i.toString()
                document.querySelector(k).classList.remove("block--background-color")
                arr[blockItem.x][i].state=0
                blockCurrent.style.backgroundImage = `none`

                document.querySelector("#block"+blockItem.x+i).classList.remove("block-border")


                let newArrBlockLeft = arrBlockLeft.filter(item=>item != blockItem.x+"~"+i)
                changeArrBlockLeft(newArrBlockLeft)
                break
            }
            arr[blockItem.x][i].label = arr[blockItem.x][i-1].label
            // document.querySelector("#block"+blockItem.x+i).textContent=arr[blockItem.x][i].label
            let newImg = arr[blockItem.x][i-1]

            let labelTmp =arr[blockItem.x][i - 1].label
            for (let k = 0; k < objLabelHint[labelTmp].length; k++) {
                if(objLabelHint[labelTmp][k].x==arr[blockItem.x][i].x&&objLabelHint[labelTmp][k].y <  arr[blockItem.x][i].y) {
                    if(objLabelHint[labelTmp][k].y != 0) {
                        objLabelHint[labelTmp][k].y = parseInt(objLabelHint[labelTmp][k].y) + 1
                    }
                }
            }

            if (newImg.label !== undefined) {
                blockCurrent.style.backgroundImage = document.querySelector("#block"+blockItem.x+(i-1)).style.backgroundImage
            }
            else {
                blockCurrent.style.backgroundImage = `none`
            }
        }
    }
    else {
        let blockCurrent = document.querySelector("#block"+blockItem.x.toString()+""+blockItem.y.toString())
        blockCurrent.classList.remove("block--background-color")
        arr[blockItem.x][blockItem.y].state=0
        blockCurrent.style.backgroundImage = `none`

        document.querySelector("#block"+blockItem.x+8).classList.remove("block-border")

        let newArrBlockLeft = arrBlockLeft.filter(item=>item != blockItem.x+"~"+8)
        changeArrBlockLeft(newArrBlockLeft)

    }
}


