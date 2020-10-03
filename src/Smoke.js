import React, {useState, useEffect}  from "react";
import useDimensions from "react-cool-dimensions";
import useAnimationFrame from './useAnimationFrame'
import './Smoke.css';

export const useMousePosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const setFromEvent = e => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", setFromEvent);

        return () => {
            window.removeEventListener("mousemove", setFromEvent);
        };
    }, []);

    return position;
};

const Smoke = () => {
    const { ref, width, height} = useDimensions();
    const [count, setCount] = useState(0)
    const [delta, setDelta] = useState(0)
    const canvasRef = React.useRef();
    const [particles, setParticles] = useState(undefined)
    const [wind, setWind] = useState({x: 1, dx: 0.1, ddx: 0 })
    const [windtarget, setWindTarget] = useState(1)
    const position = useMousePosition()

    useAnimationFrame(deltaTime => {
        // Pass on a function to the setter of the state
        // to make sure we always have the latest state
        setCount(prevCount => (prevCount + deltaTime * 0.01))
    })

    useEffect(() => {
        const randbetween = (miny, maxy) => {
            return ((maxy - miny) * Math.random() + miny)
        }
        if (particles === undefined) {
            if ( Number.isFinite(width) && width > 0) {
                setParticles([{x: width / 2, y: height - 20, vx: 0, vy: -0.5}])
            }
        }
        else {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')

            const countarray = Array.from({length: 25}, (_, index) => index + 1);
            let positionx = width /2
            let positiony = height - 20
            if (position.x) {
                positionx = position.x
                positiony = position.y
            }
            countarray.map(() => {particles.push({x: positionx, y: positiony, vx: 0, vy: randbetween(3, 7) * -1})})
            particles.filter(particle => particle.height > 0 && particle.vy < -0.1)
            if (randbetween(0, 1) < 0.07) {
                let direction = 1
                if (wind.x > 0) {
                    direction = -1
                }
                setWindTarget(direction * randbetween(0, 4))
                console.log("wind changed")
            }
            let windchange = 0
            if (wind.x > windtarget) {
                windchange = wind.dx * -1
            } else {
                windchange = wind.dx
            }
            setWind({x: wind.x + windchange, dx: wind.dx, ddx: 0 })
            setParticles(particles.map((aparticle) => {
                let sidepush = (((aparticle.x - (width / 2)) * -1) / (width / 2)) * 6
                let modifier = ((aparticle.y / height) ** 2)
                sidepush *= modifier
                return {x: aparticle.x + aparticle.vx + sidepush + wind.x, y: aparticle.y + aparticle.vy, vx: randbetween(-5, 5) * (1 - modifier), vy: aparticle.vy}
            }))
            ctx.clearRect(0, 0, width, height)
            particles.map((aparticle) => {
                ctx.beginPath()
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(aparticle.x, aparticle.y, 1, 1);
                ctx.stroke()
            })
        }
    }, [count])


    return <div ref={ref} className={'Smoke'}>
            <canvas ref={canvasRef} width={width} height={height - 10}/>
    </div>
};

export default Smoke;
