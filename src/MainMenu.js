import React, {useEffect, useState, useRef} from "react";
import './MainMenu.css';
import Radio from './Radio'
import Bulky from './Bulky'
import FishTank from './FishTank'
import Rodent from './Rodent'
import Smoke from './Smoke'
import useDimensions from "react-cool-dimensions";
import Fish from "./Fish";
import Blade from "./Blade";


const MainMenu = () => {

    const [currentPage, setCurrentPage] = useState("Radio");
    const { ref, width, height} = useDimensions();
    const [innerDimensions, setInnerDimensions] = useState({width: 0, height: 0})
    const days = [
        {
            index: 1,
            daynum: 28,
            prompt: " ",
            opacity: "45%"
        },
        {
            index: 2,
            daynum: 29,
            prompt: " ",
            opacity: "45%"
        },
        {
            index: 3,
            daynum: 30,
            prompt: " ",
            opacity: "45%"
        },
        {
            index: 4,
            daynum: 1,
            prompt: "Fish",
            opacity: "100%"
        },
        {
            index: 5,
            daynum: 2,
            prompt: "Wisp",
            opacity: "100%"
        },
        {
            index: 6,
            daynum: 3,
            prompt: "Bulky",
            opacity: "100%"
        },
        {
            index: 7,
            daynum: 4,
            prompt: "Radio",
            opacity: "100%"
        },
        {
            index: 8,
            daynum: 5,
            prompt: "Blade",
            opacity: "100%"
        },
        {
            index: 9,
            daynum: 6,
            prompt: "Rodent",
            opacity: "100%"
        }
    ]

    useEffect(() => {
        const setInnerDimensionsFunc = () => {
            let newwidth = width
            if (width > 800) {
                newwidth = 800
            }
            let newheight = height * 0.85
            if (newheight > newwidth) {
                newheight = newwidth
            }
            setInnerDimensions({width: newwidth, height: newheight})
        }
        setInnerDimensionsFunc()
    }, [width, currentPage, ref])




    return <>
    {currentPage === "Menu" && <div ref={ref} className='menuContainer'>
        { innerDimensions.width !== 0  && <div style={{width: innerDimensions.width, height: "100%"}} className={"InnerMenu"}>
                <div className={"MenuHeader"} style={{width: "100%", height: (height - innerDimensions.height) / 2}}>
                    <div className={"HeaderText"}> A web page for each one of the Inktober prompts - so WebTober </div>
                </div>
                <div className={"InnerInnerMenu"} style={{width: innerDimensions.width - 20, height: innerDimensions.height -20}}>
                    {days.map((aday) => {
                        return <div className={"DateCardOuter"} key={aday.index} style={{opacity: aday.opacity}} onClick={() => setCurrentPage(aday.prompt)}>
                            <div className={"DateCardInner"}>
                                <div className={"DateCardInnerInner"}>
                                    <div className={"DateItem"}> {aday.daynum} </div>
                                </div>
                                <div className={"DateCardInnerInner"}>
                                    <div className={"PromptItem"}> {aday.prompt} </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        }
        </div> }
        {currentPage === "Fish" && <>
            <FishTank />

            </>}
        {currentPage === "Wisp" && <>
            <Smoke />

        </>}
        {currentPage === "Bulky" && <>
            <Bulky />
                    </>}
        {currentPage === "Radio" && <>
            <Radio />

        </>}
        {currentPage === "Blade" && <>
            <Blade />

        </>}
        </>
};

export default MainMenu;