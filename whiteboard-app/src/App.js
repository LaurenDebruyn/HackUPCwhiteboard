// Main dependencies
import React from 'react';
import openSocket from 'socket.io-client';
import { serialize, deserialize } from "react-serialize"

// Own components
import Toolbar from './Toolbar.js';
import ColorBar from "./ColorBar.js";
import WhiteboardSVG from './WhiteboardSVG.js';

// CSS
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.socket = openSocket('http://hackupcwhiteboard.herokuapp.com/');
        this.state = {
            tool: 'pencil',
            color: 'black',
            paths: []
        };
        this.handleToolClick = this.handleToolClick.bind(this);
        this.handleColorClick = this.handleColorClick.bind(this);
        this.handleAddPath = this.handleAddPath.bind(this);
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
        this.socket.on('update', (serializedPath) => {
            console.log('Receive: ', deserialize(serializedPath));
            this.handleAddPath(deserialize(serializedPath));
        })
    }

    handleAddPath(path) {
        this.setState((prevState) => {
            if (path) {
                return {
                    paths: prevState.paths.concat(path)
                };
            }
        });

        const serializedPath = serialize(path);
        this.socket.emit('update', serializedPath);
        console.log('Emit');
    };

    render() {
        return (
            <div>
                <h1>Whiteboard App</h1>
                <Toolbar handleToolClick={this.handleToolClick}/>
                <ColorBar handleColorClick={this.handleColorClick}/>
                <WhiteboardSVG
                    tool={this.state.tool}
                    handleAddPath={this.handleAddPath}
                    paths={this.state.paths}
                    color={this.state.color}
                />
            </div>
    );
    }
}

export default App;
