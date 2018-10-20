// Main dependencies
import React from 'react';

// Main dependencies
import {Layer, Line, Rect, Stage} from "react-konva";

export default class Whiteboard extends React.Component {
    render() {
        return (
            <Stage
                width={1000}
                height={1000}
                onMouseDown={this.handleMouseDown}
            >
                <Layer>
                    <Line />
                    <Rect
                        x={10} y={10} width={50} height={50}
                        fill='green'
                        shadowBlur={10}
                    />
                </Layer>
            </Stage>
        );
    }

    handleMouseDown() {
        console.log('Mousedown')
    }
}

// class MyRect extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             color: 'green'
//         };
//         this.handleClick = this.handleClick.bind(this);
//     }
//     handleClick() {
//         this.setState({
//             color: Konva.Util.getRandomColor()
//         });
//     }
//     render() {
//         return (
//             <Rect
//                 x={10} y={10} width={50} height={50}
//                 fill={this.state.color}
//                 shadowBlur={10}
//                 onClick={this.handleClick}
//             />
//         );
//     }
// }