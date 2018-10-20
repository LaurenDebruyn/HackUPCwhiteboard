import {Component} from "react";
import {Layer, Line, Rect, Stage} from "react-konva";
import React from "react";

class Whiteboard extends Component {
    render() {
        return (
            <Stage
                width={1000}
                height={1000}
                onMouseDown={handleMouseDown}
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

export default Whiteboard;