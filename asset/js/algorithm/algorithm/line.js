import {BlockItem} from "./object.js";

function drawHorizontalBar(blockDeparture, blockDestination) {
    let line = document.createElement("div")
    line.classList.add("lineActive")
    line.classList.add("lineActiveRight")
    let {yMin, yMax, xOfYMin, xOfYMax}=getMinMaxByY(blockDeparture, blockDestination)
    let idDeparture = xOfYMin.toString()+""+yMin.toString()
    let lineDeparture = document.querySelector("#block"+idDeparture)
    lineDeparture.appendChild(line)
}

function drawVerticalBar(blockDeparture, blockDestination) {
    let line = document.createElement("div")
    line.classList.add("lineActiveBottom")
    line.classList.add("lineActive")

    let {xMin, xMax, yOfXMin, yOfXMax} = getMinMaxByX(blockDeparture, blockDestination)
    let idDeparture = xMin.toString()+""+yOfXMin.toString()
    let idDestination = xMax.toString()+""+yOfXMax.toString()
    let lineDeparture = document.querySelector("#block"+idDeparture)
    lineDeparture.appendChild(line)
}


function drawY(blockDeparture, blockDestination) {
    let {yMin, yMax, xOfYMin, xOfYMax}=getMinMaxByY(blockDeparture, blockDestination)
    drawHorizontalBar(blockDeparture, blockDestination)
    for (let i = yMin+1; i < yMax; i++) {
        drawHorizontalBar( new BlockItem(xOfYMin, i), new BlockItem(xOfYMax, i+1))
    }
}

function drawX(blockDeparture, blockDestination) {
    let {xMin, xMax, yOfXMin, yOfXMax} = getMinMaxByX(blockDeparture, blockDestination)
    drawVerticalBar(blockDeparture, blockDestination)
    for (let i = xMin+1; i < xMax; i++) {
        drawVerticalBar( new BlockItem(i, yOfXMin), new BlockItem(i+1, yOfXMax))
    }
}

export {drawY, drawX, drawVerticalBar, drawHorizontalBar}