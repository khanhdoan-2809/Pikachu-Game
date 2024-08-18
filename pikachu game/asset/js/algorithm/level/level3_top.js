import {arr, arrBlockLeft, changeArrBlockLeft, numberOfColumn, numberOfRow, objLabelHint} from "../base.js"
export default function rightChooseBlocks(blockDeparture, blockDestination) {
        let idDeparture = "block"+blockDeparture.x.toString()+blockDeparture.y.toString()
        let idDestination = "block"+blockDestination.x.toString()+blockDestination.y.toString()
        let departure=document.getElementById(idDeparture)
        departure.style.backgroundImage=null
        let destination=document.getElementById(idDestination)
        destination.style.backgroundImage=null

        let arrLine = document.querySelectorAll(".lineActive")
        let countLine = arrLine.length
        for(let line=0; line<countLine; line++) {
            arrLine[line].remove()
        }
        checkLevel3(blockDeparture, blockDestination)

}

function checkLevel3(blockDeparture, blockDestination) {
    let {xMin, xMax, yOfXMin, yOfXMax} = getMinMaxByX(blockDeparture, blockDestination)
    // set up again
    let blockTempDeparture = {x:0,y:0}
    let blockTempDestination = {x:0,y:0}
    blockTempDeparture.x = xMin
    blockTempDeparture.y = yOfXMin
    blockTempDestination.x = xMax
    blockTempDestination.y = yOfXMax

    checkColumnCurrent(blockTempDeparture)
    checkColumnCurrent(blockTempDestination)
}


function checkColumnCurrent(blockItem) {
    for (let i = blockItem.x; i >= 0; i--) {
        let blockCurrent = document.querySelector("#block"+(i).toString()+""+blockItem.y.toString())
        if (arr[i-1][blockItem.y].state==0) {
            let k = "#block"+(i).toString()+""+blockItem.y.toString()
            document.querySelector(k).classList.remove("block--background-color")
            arr[i][blockItem.y].state=0
            blockCurrent.style.backgroundImage = `none`
            document.querySelector("#block"+i+blockItem.y).classList.remove("block-border")

            let newArrBlockLeft = arrBlockLeft.filter(item=>item != i+"~"+blockItem.y)
            changeArrBlockLeft(newArrBlockLeft)
            break
        }
        arr[i][blockItem.y].label = arr[i-1][blockItem.y].label
        // document.querySelector("#block"+i+blockItem.y).textContent=arr[i][blockItem.y].label
        let newImg = arr[i-1][blockItem.y]

        let labelTmp =arr[i - 1][blockItem.y].label
        for (let k = 0; k < objLabelHint[labelTmp].length; k++) {
            if(objLabelHint[labelTmp][k].y==arr[i][blockItem.y].y&&objLabelHint[labelTmp][k].x <  arr[i][blockItem.y].x) {
                if(objLabelHint[labelTmp][k].x != 0) {
                    objLabelHint[labelTmp][k].x = parseInt(objLabelHint[labelTmp][k].x) + 1
                }
            }
        }

        if (newImg.label !== undefined) {
            blockCurrent.style.backgroundImage = document.querySelector("#block"+(i-1)+blockItem.y).style.backgroundImage
        }
        else {
            blockCurrent.style.backgroundImage = `none`
        }
    }
}

