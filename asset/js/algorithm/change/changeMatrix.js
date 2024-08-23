import {arr, arrBlockLeft, objLabelHint, numberImgBlock, numberOfTypeBLock} from "../base.js";

function changeMatrix() {
    let cloneArrBlockLeft = [...arrBlockLeft]
    let len=0
    for (let i = 1; i <=numberOfTypeBLock; i++) {
        let tmpArr = objLabelHint[i]
        console.log(i+":"+tmpArr.length)
        len+=tmpArr.length
    }
    console.log(objLabelHint)
    for (let i = 1; i <=numberOfTypeBLock; i++) {
        let tmpArr = objLabelHint[i]
        console.log(i+":"+tmpArr.length)
        for (let j = 0; j < tmpArr.length; j++) {
            let newPoint=[]
            newPoint = cloneArrBlockLeft[Math.floor(Math.random() * (cloneArrBlockLeft.length))].split('~')
            cloneArrBlockLeft = cloneArrBlockLeft.filter(item=>item != newPoint[0]+"~"+newPoint[1])
            document.querySelector("#block"+newPoint[0]+newPoint[1]).style.backgroundImage=`url('/asset/img/block/${i}.png')`;
            arr[newPoint[0]][newPoint[1]].label=i
            tmpArr[j].x=newPoint[0]
            tmpArr[j].y=newPoint[1]
        }
    }

    console.log(objLabelHint)
    console.log(arr)
}

export {changeMatrix}