import React, {useEffect, useState} from "react";
import useDimensions from "react-cool-dimensions";
import './Rodent.css';
import useAnimationFrame from './useAnimationFrame'


const Rodent = () => {
    const { ref, width, height} = useDimensions();
    const [count, setCount] = React.useState(0)
    let scale = 3

    useAnimationFrame(deltaTime => {
        // Pass on a function to the setter of the state
        // to make sure we always have the latest state
        setCount(prevCount => (prevCount + deltaTime * 0.01) % 1000)
    })

    function getRandomColor() {

        return `rgba(${ ((Math.random() * 86) + 170) | 0},${ ((Math.random() * 86) + 170) | 0},${ ((Math.random() * 86) + 170) | 0},1)`
    }

    const genRodents =  (numRodents) => {
        const N = numRodents;
        const school = Array.from({length: N}, (_, index) => index + 1);

        return school.map((x) => {
            return {
                index: x,
                x: 0.1,
                y: x /numRodents,
                speed: 0,
                colour: getRandomColor(),
                direction: 0
            };
        })
    }

    const [amischief, setamischief] = useState(genRodents(25));

    console.log(amischief)

    useEffect(() => {

    }, [count])

    return <div ref={ref} className={'RodentContainer'}>
        <svg width={width} height={height}>
            {amischief.map((arodentinfo) => (<ARodent key={arodentinfo.index}>

                </>
            ))}

        </svg>
    </div>
};

export default Rodent;
