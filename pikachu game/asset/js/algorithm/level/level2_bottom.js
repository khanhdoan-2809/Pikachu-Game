import {arr, numberOfRow, objLabelHint, arrBlockLeft, changeArrBlockLeft } from "../base.js"
export default function (blockDeparture, blockDestination) {
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
        checkLevel2(blockDeparture, blockDestination)

}

function checkLevel2(blockDeparture, blockDestination) {
        let {xMin, xMax, yOfXMin, yOfXMax} = getMinMaxByX(blockDeparture, blockDestination)
        // set up again
        let blockTempDeparture = {x:0,y:0}
        let blockTempDestination = {x:0,y:0}
        blockTempDeparture.x = xMax
        blockTempDeparture.y = yOfXMax
        blockTempDestination.x = xMin
        blockTempDestination.y = yOfXMin


        checkColumnCurrent(blockTempDeparture)
        checkColumnCurrent(blockTempDestination)




}

function checkColumnCurrent(blockItem) {
    for (let i = blockItem.x; i < numberOfRow +1; i++) {
        let blockCurrent = document.querySelector("#block"+(i).toString()+""+blockItem.y.toString())
        if (arr[i+1][blockItem.y].state==0) {
            let k = "#block"+(i).toString()+""+blockItem.y.toString()
            document.querySelector(k).classList.remove("block--background-color")
            arr[i][blockItem.y].state=0
            blockCurrent.style.backgroundImage = `none`

            let newArrBlockLeft = arrBlockLeft.filter(item=>item != i+"~"+blockItem.y)
            changeArrBlockLeft(newArrBlockLeft)

            document.querySelector("#block"+i+blockItem.y).classList.remove("block-border")
            break
        }
        arr[i][blockItem.y].label = arr[i+1][blockItem.y].label
        // document.querySelector("#block"+i+blockItem.y).textContent=arr[i][blockItem.y].label
        let newImg = arr[i+1][blockItem.y]
        let labelTmp =arr[i + 1][blockItem.y].label
        for (let k = 0; k < objLabelHint[labelTmp].length; k++) {
            if(objLabelHint[labelTmp][k].y==arr[i][blockItem.y].y&&objLabelHint[labelTmp][k].x >  arr[i][blockItem.y].x) {
                if(objLabelHint[labelTmp][k].x != 0) {
                    objLabelHint[labelTmp][k].x = parseInt(objLabelHint[labelTmp][k].x) - 1
                    // objLabelHint[arr[i + 1][blockItem.y].label][k].label=arr[i + 1][blockItem.y].label
                }
            }
        }

        if (newImg.label !== undefined) {
            blockCurrent.style.backgroundImage = document.querySelector("#block"+(i+1)+blockItem.y).style.backgroundImage
        }
        else {
            blockCurrent.style.backgroundImage = `none`
        }

    }
}

