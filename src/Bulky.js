import React, {useEffect, useState} from "react";
import './Bulky.css';
import useAnimationFrame from './useAnimationFrame'

const Bulky = () => {
    const [count, setCount] = useState(0)
    const [letterstyles, setLetterStyles] = useState([])

    useAnimationFrame(deltaTime => {
        // Pass on a function to the setter of the state
        // to make sure we always have the latest state
        setCount(prevCount => (prevCount + deltaTime * 0.01))
    })



    useEffect(() => {
        let period = 10
        const getSinCycleMod = (period, offset) => {
            // ofset from 0 to 1
            return Math.sin((((count + (offset * period)) % period) / period) * 2 * Math.PI)
        }
        const spreadCycleMod = (cycleMod, lowerlimit, upperlimit) => {
            return (cycleMod *  (upperlimit - lowerlimit)) + lowerlimit
        }
        const lettermod = (offset) => {
            return spreadCycleMod(getSinCycleMod(period, offset), 0.99, 1.01)
        }
        let modifiers = [1, 1, 1, 1, 1]

        if (count) {
            modifiers = [0, 0.2, 0.4, 0.6, 0.8].map((offset) => {
                return lettermod(offset)
            })
        }
        let tempstyles = [
            {
                color: "white",
                transform: "translateX(15vw) scale(" + modifiers[0] + "," + modifiers[1] * 2.2 + ") translateY(-10px)",
                zIndex: 1
            },
            {
                color: "black",
                transform: "translateX(7vw) scale(" + modifiers[1] + "," + modifiers[2] * 2.2 + ") translateY(-10px)",
                zIndex: 2
            },
            {
                color: "white",
                zIndex: 3,
                transform: "scale(" + modifiers[2] + "," + modifiers[3] * 2.2 + ") translateY(-10px)"
            },
            {
                color: "black",
                transform: "translateX(-7vw) scale(" + modifiers[3] + "," + modifiers[4] * 2.2 + ") translateY(-10px)",
                zIndex: 2
            },
            {
                color: "white",
                transform: "translateX(-15vw) scale(" + modifiers[4] + "," + modifiers[0] * 2.2 + ") translateY(-10px)",
                zIndex: 1
            }
        ]
        setLetterStyles(tempstyles)
    }, [count])

    return <div className={'bulky'}>
        <div style={letterstyles[0]} className={'bulkyletter'}>B</div>
        <div style={letterstyles[1]} className={'bulkyletter'}>U</div>
        <div style={letterstyles[2]} className={'bulkyletter'}>L</div>
        <div style={letterstyles[3]} className={'bulkyletter'}>K</div>
        <div style={letterstyles[4]} className={'bulkyletter'}>Y</div>
    </div>
};

export default Bulky;