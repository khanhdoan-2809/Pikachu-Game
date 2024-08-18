
function getMinMaxByX(blockDeparture, blockDestination) {
    let xMin
    let xMax
    let yOfXMin
    let yOfXMax

    if (blockDeparture.x <= blockDestination.x) {
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

    return {xMin, xMax, yOfXMin, yOfXMax}
}

function getMinMaxByY(blockDeparture, blockDestination) {
    let yMin
    let yMax
    let xOfYMin
    let xOfYMax
    let yLabelMin
    let yLabelMax
    if (blockDeparture.y <= blockDestination.y) {
        yMin=blockDeparture.y
        xOfYMin = blockDeparture.x
        yMax = blockDestination.y
        xOfYMax=blockDestination.x
        yLabelMin = blockDeparture.label
        yLabelMax = blockDestination.label
    }
    else {
        yMax=blockDeparture.y
        xOfYMax = blockDeparture.x
        yMin = blockDestination.y
        xOfYMin=blockDestination.x
        yLabelMin = blockDestination.label
        yLabelMax = blockDeparture.label
    }
    return {yMin, yMax, xOfYMin, xOfYMax, yLabelMax, yLabelMin}
}