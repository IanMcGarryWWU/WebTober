import React, {useEffect, useState, useRef} from "react";
import './Radio.css';
import useAnimationFrame from './useAnimationFrame'
import AudioVisualiser from './AudioVisualiser';


const Radio = () => {
    const ref = useRef()
    const audioref = useRef()
    const [currentState, setCurrentState] = useState('Closed')
    const [count, setCount] = useState(0)
    const context = useRef()
    const analyser = useRef()
    const dataArray = useRef()

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
        let audioelement = audioref.current
        audioelement.play()
        context.current.resume()
    }

    useEffect(() => {
      if (context.current) {
          analyser.current.getByteFrequencyData(dataArray.current)
      }
    }, [count])

    return <div className={"Centerer"}>
        <div className={"TopHalf"}>
            {
                dataArray.current && <AudioVisualiser audioData={dataArray.current} />
            }
            <audio ref={audioref} src="https://s1.citrus3.com:8236/stream" crossOrigin="anonymous"/>
        </div>
        <div className={"RadioContainer"}>
            <div ref={ref} onClick={clicktochoose} className={"RadioButton"}> PLAY </div>
        </div>
    </div>
};

export default Radio;