import React, {useEffect, useState, useRef} from "react";
import './MainMenu.css';
import Radio from './Radio'
import useDimensions from "react-cool-dimensions";


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
        {currentPage === "Radio" && <>
            <Radio />

        </>}
        </>
};

export default MainMenu;