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

        context.lineWidth = 2;
        // context.strokeStyle = '#878fc9';
        context.strokeStyle = '#FFFFFF';
        context.lineWidth = 1;
        context.fillStyle = "RGBA(53, 61, 117, 0.5)";
        context.fillRect(0, 0, width, height);
        context.beginPath();

        const getAngle = (index) => {
            return ((index + 1)/ 22) * Math.PI * 2
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

        function shuffle(a) {
            let j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        }

        returnToBase()

        // let tempaudiodata = shuffle(audioData)

        audioData.map((item, index) => {
            const modifier = (2 ** (index / 20)) / 2
            let y = (((item * modifier) / 255.0) * 300)
            y = scaleY(1.2, y)
            y *= 1.2
            y = Math.max(0, y)
            y = Math.min(300, y)
            returnToBase()
            let angle = getAngle(index)
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
        return <canvas width="350" height="600" ref={this.canvas} />;
    }
}

export default AudioVisualiser;