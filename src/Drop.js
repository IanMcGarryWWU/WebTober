import React, {useEffect, useState, useRef} from "react";
import './Radio.css';
import useAnimationFrame from './useAnimationFrame'
import AudioVisualiser from './AudioVisualiser';


const Radio = () => {
    const [currentState, setCurrentState] = useState('Closed')
    const [count, setCount] = useState(0)
    // these could be moved to props
    const [itemList, setitemList] = useState([])
    const [menuItems, setMenuItems] = useState([])
    const [boundingBox, setBoundingBox] = useState(undefined)
    const [startingTime, setStartingTime] = useState(0)
    const delay = 1

    useAnimationFrame(deltaTime => {
        // Pass on a function to the setter of the state
        // to make sure we always have the latest state
        setCount(prevCount => (prevCount + deltaTime * 0.01))
    })

    useEffect(() => {
        setBoundingBox(ref.current.getBoundingClientRect())
        setitemList(["Item A", "Item B"])
    },[ref])

    const clicktochoose = () => {
        if (currentState === 'Closed') {
            setCurrentState('Opening')
            setStartingTime(count)
        } else {
            setCurrentState("Closed")
            console.log("Closed")
        }
    }

    useEffect(() => {
        if (currentState === 'Opening') {
            let tempmenulist = []
            itemList.map((anitem, index) => {
                if ((count - startingTime) > (index * delay)) {
                    let percentshiftup = 0
                    if ((count - startingTime) < ((index + 1) * delay)) {
                        percentshiftup = 1 - (((count - startingTime) - (index * delay)) / delay)
                    }
                    let shiftupamount = (percentshiftup * boundingBox.height) * -1
                    let thistem = {index: index,
                        text: anitem,
                        style: {transform: "translateY("  + shiftupamount +  "px)" ,
                            zIndex: ((index + 1) * -1) + 1000,
                            width: boundingBox.width}
                    }
                    tempmenulist.push(thistem)
                }
            })
            setMenuItems(tempmenulist)
        } else {
            setMenuItems([])
        }
    }, [count])

    return <>
            <div ref={ref} onClick={clicktochoose} className={"RadioButton"}> Click Here to Choose </div>

            {menuItems.map((anitem) => (
                <div key={anitem.index} style={anitem.style} className={"AnItem"} > {anitem.text} </div>
            ))}
    </>

};

export default Radio;