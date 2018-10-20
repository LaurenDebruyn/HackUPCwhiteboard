// Main dependencies
import React from 'react';
import openSocket from 'socket.io-client';

// Own components
import Toolbar from './Toolbar.js';
import WhiteboardSVG from './WhiteboardSVG.js';

// CSS
import './App.css';
import ColorBar from "./ColorBar";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tool: 'pencil',
            color: 'black'
        };
        this.handleToolClick = this.handleToolClick.bind(this);
    }

    handleToolClick(tool) {
        this.setState((prevState) => {
            if (prevState.tool !== tool) {
                return {tool};
            }
        });
    };

    handleColorClick(color) {
        this.setState((prevState) => {
            if (prevState.color !== color) {
                return {color};
            }
        });
    };

    componentDidMount() {
        const socket = openSocket('http://hackupcwhiteboard.herokuapp.com');
        socket.emit('coordinates', [1,2,3,4,5]);
    }

    render() {
        return (
            <div>
                <h1>Whiteboard App</h1>
                <Toolbar handleToolClick={this.handleToolClick}/>
                <ColorBar handleColorClick={this.handleColorClick}/>
                <WhiteboardSVG
                    tool={this.state.tool}
                />
            </div>
    );
    }
}

export default App;
