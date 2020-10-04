import React, {useEffect, useState, useRef} from "react";
import './Radio.css';
import useAnimationFrame from './useAnimationFrame'
import AudioVisualiser from './AudioVisualiser';
import useDimensions from "react-cool-dimensions";


const Radio = () => {
    const audioref = useRef()
    const [count, setCount] = useState(0)
    const context = useRef()
    const analyser = useRef()
    const dataArray = useRef()
    const { ref, width, height} = useDimensions();
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        context.current = new AudioContext();
        let audioelement = audioref.current
        let source = context.current.createMediaElementSource(audioelement);
        source.connect(context.current.destination);
        analyser.current = context.current.createAnalyser();
        analyser.current.fftSize = 64
        dataArray.current = new Uint8Array(analyser.current.frequencyBinCount)
        source.connect(analyser.current);
    },[audioref])

    useAnimationFrame(deltaTime => {
        // Pass on a function to the setter of the state
        // to make sure we always have the latest state
        setCount(prevCount => (prevCount + deltaTime * 0.01))
    })

    const clicktochoose = () => {
        setClicked(true)
        let audioelement = audioref.current
        audioelement.play()
        context.current.resume()
    }

    useEffect(() => {
        console.log(height)
    }, [height])

    useEffect(() => {
      if (context.current) {
          analyser.current.getByteFrequencyData(dataArray.current)
      }
    }, [count])

    return <div ref={ref} className={"Centerer"}>
        <div className={"RadioContainer"}>
            {
                !clicked && <div onClick={clicktochoose} className={"RadioButton"}> PLAY </div>
            }
        </div>

            {
                dataArray.current && height > 0 && <AudioVisualiser className={"Visualiser"} audioData={dataArray.current} height={height} width={width}/>
            }
            <audio ref={audioref} src="https://s1.citrus3.com:8236/stream" crossOrigin="anonymous"/>
    </div>
};

export default Radio;