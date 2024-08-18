import {checkTwoBlock} from "../algorithm/checkTwoBlock.js";
import {BlockItem} from "../algorithm/object.js";
import {arr, objLabelHint, rightChooseBlocks, numberOfTypeBLock, totalBlock, changeTotalBlock} from "../base.js";
import {changeMatrix} from "../change/changeMatrix.js";
import {score, changeScore} from "../algorithm/object.js";

function loadHint() {
    let numberOfHint = 9
    let hint = document.querySelector("#hint__bulb")
    hint.addEventListener("click", function () {
        // if (numberOfHint === 0) {
        //     return
        // }

        if (!hint.hasAttribute('data-prevent-double-click')) {
            document.querySelector("#hint__bulb").disabled = true
            document.querySelector("#hint__bulb").setAttribute('data-prevent-double-click', true);

            for (let i = 1; i <= numberOfTypeBLock; i++) {
                for (let j = 0; j < objLabelHint[i].length-1;j++) {
                    for(let o = j; o < objLabelHint[i].length-1;o++) {
                        let k = parseInt(o)+1
                        let x1 = parseInt(objLabelHint[i][j].x)
                        let y1 = parseInt(objLabelHint[i][j].y)
                        let x2 = parseInt(objLabelHint[i][k].x)
                        let y2 = parseInt(objLabelHint[i][k].y)
                        if(arr[x1][y1].state!=0 && arr[x2][y2].state!=0) {
                            if (checkTwoBlock(new BlockItem(x1, y1), new BlockItem(x2, y2))) {
                                let idDeparture = "block" + x1 + y1
                                let idDestination = "block" + x2 + y2
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

                                changeScore()
                                let arrTempLabelHint = objLabelHint[i]
                                arrTempLabelHint = arrTempLabelHint.filter(
                                    (item) => (item.x.toString() + "" + item.y.toString()) != x1 + "" + y1);
                                arrTempLabelHint = arrTempLabelHint.filter(
                                    (item) => (item.x.toString() + "" + item.y.toString()) != x2 + "" + y2);
                                objLabelHint[i] = arrTempLabelHint;
                                const clickHintPromise = new Promise(function(hintResolve) {
                                    setTimeout(()=>{
                                        rightChooseBlocks(new BlockItem(x1, y1), new BlockItem(x2, y2))
                                        hintResolve("#hint__bulb")
                                    }, 1) // to change slow img block
                                });
                                clickHintPromise.then(function(value) { // wait to change img, matrix
                                    departure.innerHTML=""
                                    destination.innerHTML=""

                                    document.querySelector(value).removeAttribute('data-prevent-double-click');
                                    document.querySelector(value).disabled = false
                                    numberOfHint--
                                    document.querySelector("#numberOfHint").textContent=numberOfHint
                                });
                                changeTotalBlock()
                                return
                            }
                        }
                    }
                }
            }

            changeMatrix()
            document.querySelector("#hint__bulb").removeAttribute('data-prevent-double-click');
            document.querySelector("#hint__bulb").disabled = false

        }
    })


}

export {loadHint}