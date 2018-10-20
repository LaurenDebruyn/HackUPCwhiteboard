// Main dependencies
import React from 'react';
import openSocket from 'socket.io-client';
import { serialize, deserialize } from "react-serialize"

// Own components
import Toolbar from './Toolbar.js';
import ColorBar from "./ColorBar.js";
import WhiteboardSVG from './WhiteboardSVG.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.socket = openSocket('http://hackupcwhiteboard.herokuapp.com/');
        this.state = {
            tool: 'pencil',
            color: 'black',
            paths: [],
            textFields: []
        };
        this.handleToolClick = this.handleToolClick.bind(this);
        this.handleColorClick = this.handleColorClick.bind(this);
        this.handleAddPath = this.handleAddPath.bind(this);
        this.handleAddTextField = this.handleAddTextField.bind(this);
    }

    handleToolClick(tool) {
        if (tool === 'eraser'){
            this.handleColorClick('white');
        }
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
            this.handleAddPath(deserialize(serializedPath), false);
        })
    }

    handleAddPath(path, emit) {
        if (path) {
            this.setState((prevState) => ({paths: prevState.paths.concat(path)}));

            if (emit) {
                const serializedPath = serialize(path);
                this.socket.emit('update', serializedPath);
                console.log('Emit');
            }
        }
    };

    handleAddTextField(text, emit) {
        if (text) {
            this.setState((prevState) => ({textFields: prevState.textFields.concat(text)}));

            if (emit) {
                const serializedText = serialize(text);
                this.socket.emit('update', serializedText);
                console.log('Emit');
            }
        }
    }

    render() {
        return (
            <div className="app">
                <Toolbar handleToolClick={this.handleToolClick}/>
                <ColorBar handleColorClick={this.handleColorClick}/>
                <WhiteboardSVG
                    tool={this.state.tool}
                    handleAddPath={this.handleAddPath}
                    paths={this.state.paths}
                    handleAddTextField={this.handleAddTextField}
                    textFields={this.state.textFields}
                    color={this.state.color}
                >
                </WhiteboardSVG>
            </div>
    );
    }
}

export default App;
