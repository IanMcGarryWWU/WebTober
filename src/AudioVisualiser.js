import React, { Component } from 'react';

class AudioVisualiser extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    componentDidUpdate() {
        this.draw();
    }



    draw() {
        const { audioData } = this.props;
        const canvas = this.canvas.current;
        const height = canvas.height;
        const width = canvas.width;
        const context = canvas.getContext('2d');

        // context.strokeStyle = '#878fc9';
        // context.strokeStyle = '#FFFFFF';
        context.lineWidth = 1;
        context.fillStyle = "RGBA(0, 0, 0, 1)";
        context.fillRect(0, 0, width, height);
        context.beginPath();

        const getAngle = (index) => {
            return ((index + 11)/ 22) * Math.PI * 2
        }

        const randbetween = (miny, maxy) => {
            return ((maxy - miny) * Math.random() + miny)
        }

        const returnToBase = () => {
            context.moveTo(width / 2, height / 2);}

        const scaleY = (amount, y) => {
            let inverted = 300 / amount
            let buffer = 300 - inverted
            y -= buffer
            y *= amount
            return y
        }

        returnToBase()

        // let tempaudiodata = shuffle(audioData)

        audioData.map((item, index) => {
            let brightness = Math.floor(((index * 255) / 22))
            context.strokeStyle = "RGBA(" + brightness + ", 255, 255, 1)";
            const modifier = (2 ** (index / 20)) / 2
            let y = ((((item * modifier) / 255.0) ** 2 ) * 300)
            y = scaleY(1.2, y)
            y *= 1.2
            y = Math.max(0, y)
            y = Math.min(300, y)
            let smallestdimension = Math.min(height, width)
            y *= smallestdimension / 300
            returnToBase()
            let angle = getAngle(index)
            angle += (randbetween(0, 1) - 0.5) * 0.2
            let numsegments = Math.floor(y / 30)
            let segmentlength = y / numsegments
            let i
            for (i = 1; i <= numsegments; i++) {
                let thisdiagonallength = segmentlength * i
                let x = Math.cos(angle) * thisdiagonallength
                let y = Math.sin(angle) * thisdiagonallength
                let randomx = randbetween(0, 20) - 5
                let randomy = randbetween(0, 20) - 5
                x += randomx + (width / 2)
                y += randomy
                y = (height / 2) - y
                context.lineTo(x, y);
            }
        })
        context.stroke();
    }
    render() {
        return <canvas width={this.props.width} height={this.props.height} ref={this.canvas} />;
    }
}

export default AudioVisualiser;