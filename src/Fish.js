import React from "react";
import './Fish.css';

const Fish = (props) => {
    let height = props.fishinfo.height
    let xoffset = props.fishinfo.xoffset;
    let scale = props.fishinfo.scale
    let colour = props.fishinfo.colour
    let animpercent = props.animpercent
    let speed = props.fishinfo.speed

    let fishx = (props.width *  (((animpercent * speed) + xoffset) % (1000)) * (1/500)) - (props.width / 2)
    if (props.width < 900) {
        scale *= props.width / 900
    }
    return <g>
        <path d="M327.1 96c-89.97 0-168.54 54.77-212.27 101.63L27.5 131.58c-12.13-9.18-30.24.6-27.14 14.66L24.54 256 .35 365.77c-3.1 14.06 15.01 23.83 27.14 14.66l87.33-66.05C158.55 361.23 237.13 416 327.1 416 464.56 416 576 288 576 256S464.56 96 327.1 96zm87.43 184c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24 13.26 0 24 10.74 24 24 0 13.25-10.75 24-24 24z"
                transform = {'translate('  + fishx + ', ' + height + ') scale(' + scale + ', ' + scale + ')'}
              fill = {colour}
        />
    </g>

};

export default Fish;