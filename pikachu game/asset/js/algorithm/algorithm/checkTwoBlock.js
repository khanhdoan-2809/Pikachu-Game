import {drawHorizontalBar, drawVerticalBar, drawX, drawY} from "./line.js";
import {BlockItem} from "./object.js";
import {arr, numberOfColumn, numberOfRow} from "../base.js";

function checkTwoBlock(blockDeparture, blockDestination) {

    if (arr[blockDeparture.x][blockDeparture.y].label != arr[blockDestination.x][blockDestination.y].label) {
        return false
    }
    if (checkInLine(blockDeparture, blockDestination)) {
        return true
    }
    else {
        if (!checkAroundState(blockDeparture)) {
            return false
        }
        if (!checkAroundState(blockDestination)) {
            return false
        }
        else if (checkOutSide(blockDeparture, blockDestination)) {
            return true
        } else if (checkInSide(blockDeparture, blockDestination)) {
            return true;
        } else {
            return false
        }
    }

}

function checkInLine(blockDeparture, blockDestination) {
    if (blockDeparture.x == blockDestination.x) {
        if (checkYLine(blockDeparture, blockDestination)) {
            drawY(blockDeparture, blockDestination)
            return true
        }
    }
    else if (blockDeparture.y == blockDestination.y) {
        if (checkXLine(blockDeparture, blockDestination)) {
            drawX(blockDeparture, blockDestination)
            return true
        }
    }
    else {
        return false
    }
}

function checkOutSide(blockDeparture, blockDestination) {
    if(checkOutSideAbove(blockDeparture, blockDestination)){
        // document.querySelector("#al").textContent="outside above"
        return true
    }
    else if(checkOutSideUnder(blockDeparture, blockDestination)){
        // document.querySelector("#al").textContent="outside under"
        return true
    }
    else if (checkOutSideLeft(blockDeparture, blockDestination)) {
        // document.querySelector("#al").textContent="outside left"
        return true
    }
    else if(checkOutSideRight(blockDeparture, blockDestination)) {
        // document.querySelector("#al").textContent="outside right"
        return true
    }
    else {
        return false
    }
}

function checkInSide(blockDeparture, blockDestination) {
    if(checkInsideTwoBar(blockDeparture, blockDestination)) {
        return true
    }
    else if(checkFlowHorizon(blockDeparture, blockDestination)) {
        // document.querySelector("#al").textContent="inside horizon"
        return true
    }
    else if(checkFlowVertical(blockDeparture, blockDestination)) {
        // document.querySelector("#al").textContent="inside vertical"
        return true
    }
    else {
        return false
    }
}


function checkYLine(blockDeparture, blockDestination) {
    let {yMin, yMax, xOfYMin, xOfYMax} = getMinMaxByY(blockDeparture, blockDestination)

    if (yMax-yMin==1){
        return true
    }
    for (let i = yMin+1; i < yMax; i++) {
        if(arr[xOfYMin][i].state == 1) {
            return false
        }
    }


    return true
}

function checkXLine(blockDeparture, blockDestination) {
    let  {xMin, xMax, yOfXMin, yOfXMax} = getMinMaxByX(blockDeparture, blockDestination)

    if (xMax-xMin==1){
        return true
    }
    for (let i = xMin+1; i < xMax; i++) {
        if(arr[i][yOfXMin].state == 1) {
            return false
        }
    }

    return true
}

function checkOutSideAbove(blockDeparture, blockDestination) {
    let  {xMin, xMax, yOfXMin, yOfXMax} = getMinMaxByX(blockDeparture, blockDestination)

    if (arr[xMax-1][yOfXMax].state==1 || arr[xMin-1][yOfXMin].state==1) {
        return false
    }
    for (let i=xMin-1; i >=0; i--) {
        if (arr[i][yOfXMin].state == 1 || arr[i][yOfXMax].state == 1) {
            return false
        }
        if(checkYLine(new BlockItem(i, yOfXMin), new BlockItem(i, yOfXMax))) {
            if(checkXLine(new BlockItem(i, yOfXMax), new BlockItem(xMax, yOfXMax))) {
                for (let j = xMin-1; j >= i; j--) {
                    drawVerticalBar(new BlockItem(j, yOfXMin), new BlockItem(j+1, yOfXMax))
                }
                drawY(new BlockItem(i, yOfXMin), new BlockItem(i, yOfXMax))
                drawX(new BlockItem(i, yOfXMax), new BlockItem(xMax, yOfXMax))
                return true
            }
        }
    }
    return false
}

function checkOutSideUnder(blockDeparture, blockDestination) {
    let  {xMin, xMax, yOfXMin, yOfXMax} = getMinMaxByX(blockDeparture, blockDestination)

    if (arr[xMax+1][yOfXMax].state==1 || arr[xMin+1][yOfXMin].state==1) {
        return false
    }
    for (let i=xMax+1; i <= numberOfRow+1; i++) {
        if (arr[i][yOfXMax].state==1 || arr[i][yOfXMin].state==1) {
            return false
        }
        if(checkYLine(new BlockItem(i, yOfXMin), new BlockItem(i, yOfXMax))) {
            if(checkXLine(new BlockItem(i, yOfXMin), new BlockItem(xMin, yOfXMin))) {
                for (let j = xMax+1; j <= i; j++) {
                    drawVerticalBar(new BlockItem(j, yOfXMin), new BlockItem(j-1, yOfXMax))
                }
                drawY(new BlockItem(i, yOfXMin), new BlockItem(i, yOfXMax))
                drawX(new BlockItem(i, yOfXMin), new BlockItem(xMin, yOfXMin))
                return true
            }
        }
    }
    return false
}

function checkOutSideLeft(blockDeparture, blockDestination) {
    let {yMin, yMax, xOfYMin, xOfYMax} = getMinMaxByY(blockDeparture, blockDestination)

    if (arr[xOfYMin][yMin-1].state==1 || arr[xOfYMax][yMax-1].state==1) {
        return false
    }
    for (let i=yMin-1; i >= 0; i--) {
        if (arr[xOfYMin][i].state==1 || arr[xOfYMax][i].state==1) {
            return false
        }
        if(checkXLine(new BlockItem(xOfYMin, i), new BlockItem(xOfYMax, i))) {
            if(checkYLine(new BlockItem(xOfYMax, i), new BlockItem(xOfYMax, yMax))) {
                for (let j = yMin-1; j >= i; j--) {
                    drawHorizontalBar(new BlockItem(xOfYMin, j), new BlockItem(xOfYMax, j+1))
                }
                drawY(new BlockItem(xOfYMax, i), new BlockItem(xOfYMax, yMax))
                drawX(new BlockItem(xOfYMin, i), new BlockItem(xOfYMax, i))
                return true
            }
        }
    }
    return false
}

function checkOutSideRight(blockDeparture, blockDestination) {
    let {yMin, yMax, xOfYMin, xOfYMax} = getMinMaxByY(blockDeparture, blockDestination)
    if (arr[xOfYMin][yMin+1].state==1 || arr[xOfYMax][yMax+1].state==1) {
        return false
    }
    for (let i=yMax+1; i <= numberOfColumn+1; i++) {
        if (arr[xOfYMin][i].state==1 || arr[xOfYMax][i].state==1) {
            return false
        }

        if(checkXLine(new BlockItem(xOfYMin, i), new BlockItem(xOfYMax, i))) {
            if(checkYLine(new BlockItem(xOfYMin, i), new BlockItem(xOfYMin, yMin))) {
                for (let j = yMax+1; j <= i; j++) {
                    drawHorizontalBar(new BlockItem(xOfYMin, j), new BlockItem(xOfYMax, j-1))
                }
                drawX(new BlockItem(xOfYMin, i), new BlockItem(xOfYMax, i))
                drawY(new BlockItem(xOfYMin, i), new BlockItem(xOfYMin, yMin))
                return true
            }
        }
    }
    return false
}

function checkInsideTwoBar(blockDeparture, blockDestination) {
    if (!checkAroundState(blockDeparture)) {
        return false
    }
    if (!checkAroundState(blockDestination)) {
        return false
    }
    let xMin
    let xMax
    let yOfXMin
    let yOfXMax
    if (blockDeparture.x < blockDestination.x) {
        xMin=blockDeparture.x
        yOfXMin = blockDeparture.y
        xMax = blockDestination.x
        yOfXMax=blockDestination.y
    }
    else {
        xMax=blockDeparture.x
        yOfXMax = blockDeparture.y
        xMin = blockDestination.x
        yOfXMin=blockDestination.y
    }
    if(checkXLine(new BlockItem(xMin, yOfXMin), new BlockItem(xMax, yOfXMin)) && arr[xMax][yOfXMin].state!=1) {
        if(checkYLine(new BlockItem(xMax, yOfXMin), new BlockItem(xMax, yOfXMax))) {
            drawX(new BlockItem(xMin, yOfXMin), new BlockItem(xMax, yOfXMin))
            drawY(new BlockItem(xMax, yOfXMin), new BlockItem(xMax, yOfXMax))
            return true
        }
    }
    else if(checkXLine(new BlockItem(xMin, yOfXMax), new BlockItem(xMax, yOfXMax)) && arr[xMin][yOfXMax].state!=1) {
        if(checkYLine(new BlockItem(xMin, yOfXMin), new BlockItem(xMin, yOfXMax))) {
            drawX(new BlockItem(xMin, yOfXMax), new BlockItem(xMax, yOfXMax))
            drawY(new BlockItem(xMin, yOfXMin), new BlockItem(xMin, yOfXMax))
            return true
        }
    }
    else {
        return false
    }
}
function checkFlowHorizon(blockDeparture, blockDestination) {
    // if (!checkAroundState(blockDeparture)) {
    //     return false
    // }
    // if (!checkAroundState(blockDestination)) {
    //     return false
    // }


    let {yMin, yMax, xOfYMin, xOfYMax} = getMinMaxByY(blockDeparture, blockDestination)


    if (arr[xOfYMax][yMax-1].state==1){
        return false
    }
    for (let i=yMin+1; i <= numberOfColumn+1; i++) {
        if (arr[xOfYMin][i].state==1) {
            return false
        }
        if (arr[xOfYMax][i].state==1) {
            continue
        }
        if(checkXLine(new BlockItem(xOfYMin, i), new BlockItem(xOfYMax, i))) {
            if(checkYLine(new BlockItem(xOfYMax, i), new BlockItem(xOfYMax, yMax))) {
                for (let j = yMin+1; j <= i; j++) {
                    drawHorizontalBar(new BlockItem(xOfYMin, j-1), new BlockItem(xOfYMax, j))
                }
                drawX(new BlockItem(xOfYMin, i), new BlockItem(xOfYMax, i))
                drawY(new BlockItem(xOfYMax, i), new BlockItem(xOfYMax, yMax))
                drawHorizontalBar(new BlockItem(xOfYMin, yMin), new BlockItem(xOfYMax, yMax))
                return true
            }
        }
    }

    return false
}
function checkFlowVertical(blockDeparture, blockDestination) {
    // if (!checkAroundState(blockDeparture)) {
    //     return false
    // }
    // if (!checkAroundState(blockDestination)) {
    //     return false
    // }

    let {xMin, xMax, yOfXMin, yOfXMax} = getMinMaxByX(blockDeparture, blockDestination)
    if (arr[xMax-1][yOfXMax].state==1) {
        return false
    }
    for (let i=xMin+1; i <= numberOfRow+1; i++) {
        if (arr[i][yOfXMin].state==1){
            return false
        }
        if (arr[i][yOfXMax].state==1){
            continue
        }
        if(checkYLine(new BlockItem(i, yOfXMin), new BlockItem(i, yOfXMax))) {
            if(checkXLine(new BlockItem(i, yOfXMax), new BlockItem(xMax, yOfXMax))) {
                for (let j = xMin+1; j <= i; j++) {
                    drawVerticalBar(new BlockItem(j-1, yOfXMin), new BlockItem(j, yOfXMax))
                }
                drawX(new BlockItem(i, yOfXMax), new BlockItem(xMax, yOfXMax))
                drawY(new BlockItem(i, yOfXMin), new BlockItem(i, yOfXMax))
                drawVerticalBar(new BlockItem(xMin, yOfXMin), new BlockItem(xMax, yOfXMax))
                return true
            }
        }
    }

    return false
}

function checkAroundState(block) {
    if (arr[block.x+1][block.y].state==1&&arr[block.x-1][block.y].state==1&&arr[block.x][block.y+1].state==1&&arr[block.x][block.y-1].state==1) {
        return false
    }
    else {
        return true
    }
}

export {checkTwoBlock}