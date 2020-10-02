import React, {useState}  from "react";
import useDimensions from "react-cool-dimensions";
import './FishTank.css';
import Fish from './Fish';
import useAnimationFrame from './useAnimationFrame'


const FishTank = () => {
    const { ref, width, height} = useDimensions();
    const [count, setCount] = React.useState(0)

    useAnimationFrame(deltaTime => {
        // Pass on a function to the setter of the state
        // to make sure we always have the latest state
        setCount(prevCount => (prevCount + deltaTime * 0.01) % 1000)
    })

    const randbetween = (miny, maxy) => {
        return ((maxy - miny) * Math.random() + miny)
    }

    function getRandomColor() {

        return `rgba(${ ((Math.random() * 86) + 170) | 0},${ ((Math.random() * 86) + 170) | 0},${ ((Math.random() * 86) + 170) | 0},1)`
    }

    const genSchool =  (miny, maxy, minspeed, maxspeed, numfish) => {
        const N = numfish;
        const school = Array.from({length: N}, (_, index) => index + 1);

        return school.map((x) => {
            return {
                index: x,
                height: randbetween(miny, maxy),
                xoffset: randbetween(0, 1000),
                scale: randbetween(0.2, 0.9),
                speed: randbetween(minspeed, maxspeed),
                colour: getRandomColor()
            };
        })
    }

    const [aschool, setaschool] = useState(genSchool(-100, 1000, 1, 6, 50));

    return <div ref={ref} className={'FishTank'}>
        <svg width={width} height={height}>
            {aschool.map((afishinfo) => (
                <Fish key={afishinfo.index} fishinfo={afishinfo} animpercent={count} width={width}/>
                ))}
        </svg>
    </div>
};

export default FishTank;
