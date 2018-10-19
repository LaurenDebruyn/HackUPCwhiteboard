import React, { Component } from 'react';
import Konva from 'konva';
import {Layer, Line, Rect, Stage, Group} from 'react-konva';
import { ReactComponent as PencilIcon } from './pencil.svg';
import { ReactComponent as TextIcon } from './text.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTool: 'Pencil'
        };
        this.handleToolClick = this.handleToolClick.bind(this);
    }

    handleToolClick(tool) {
            this.setState((prevState) => {
                if (prevState.currentTool !== tool) {
                    return {
                        currentTool: tool
                    };
                }
            });
        };

    render() {
        return (
            <div>
                <h1>Whiteboard App</h1>
                <Toolbar handleToolClick={this.handleToolClick}/>
                <p>{this.state.currentTool}</p>
                <Whiteboard />
            </div>
    );
    }
}

class Toolbar extends Component {
    render () {
        return (
            <div>
                <button onClick={
                    (e) => {
                        this.props.handleToolClick('Pencil');
                    }
                }><PencilIcon /></button>
                <button onClick={
                    (e) => {
                        this.props.handleToolClick('Text');
                    }
                }><TextIcon /></button>
            </div>
        );
    }
}

class Whiteboard extends Component {
    render() {
        return (
            <Stage width={1000} height={1000}>
                <Layer>
                    <Rect
                        x={10} y={10} width={50} height={50}
                        fill='green'
                        shadowBlur={10}
                    />
                </Layer>
            </Stage>
        );
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

export default App;
