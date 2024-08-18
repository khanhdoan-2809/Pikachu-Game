import {arr, numberOfColumn, numberOfRow, arrBlockLeft, changeArrBlockLeft} from "../base.js"

export default function rightChooseBlocks(blockDeparture, blockDestination) {

        let idDeparture = "block" + blockDeparture.x.toString() + blockDeparture.y.toString()
        let idDestination = "block" + blockDestination.x.toString() + blockDestination.y.toString()


        let departure = document.getElementById(idDeparture)
        departure.style.backgroundImage = null
        departure.classList.remove("block--background-color")
        departure.classList.remove("block-border")


        let destination = document.getElementById(idDestination)
        destination.style.backgroundImage = null
        destination.classList.remove("block--background-color")
        destination.classList.remove("block-border")

        let newArrBlockLeft = arrBlockLeft.filter(item => item != blockDeparture.x + "~" + blockDeparture.y)
        changeArrBlockLeft(newArrBlockLeft)
        newArrBlockLeft = arrBlockLeft.filter(item => item != blockDestination.x + "~" + blockDestination.y)
        changeArrBlockLeft(newArrBlockLeft)


        arr[blockDeparture.x][blockDeparture.y].state = 0
        arr[blockDestination.x][blockDestination.y].state = 0

        let arrLine = document.querySelectorAll(".lineActive")
        let countLine = arrLine.length
        for (let line = 0; line < countLine; line++) {
            arrLine[line].remove()
        }


}