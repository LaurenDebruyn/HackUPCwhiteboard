// Main dependencies
import React from 'react';
import openSocket from 'socket.io-client';
import { serialize, deserialize } from "react-serialize"

// Own components
import Toolbar from './Toolbar.js';
import ColorBar from "./ColorBar.js";
import SizeBar from "./SizeBar.js";
import WhiteboardSVG from './WhiteboardSVG.js';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.socket = openSocket('http://hackupcwhiteboard.herokuapp.com/');
        this.state = {
            tool: 'pencil',
            color: 'black',
            size: 'extraSmall',
            paths: [],
            textFields: [],
            brainstorm: false
        };

        this.svgElements = [
            <line x1={700} y1={0} x2={700} y2={240} strokeWidth={10} stroke="grey"/>,
                <line x1={700} y1={420} x2={700} y2={2000} strokeWidth={10} stroke="grey"/>,
                <line x1={0} y1={350} x2={560} y2={350} strokeWidth={10} stroke="grey"/>,
                <line x1={880} y1={350} x2={2000} y2={350} strokeWidth={10} stroke="grey"/>
        ];

        this.handleToolClick = this.handleToolClick.bind(this);
        this.handleColorClick = this.handleColorClick.bind(this);
        this.handleSizeClick = this.handleSizeClick.bind(this);
        this.handleAddPath = this.handleAddPath.bind(this);
        this.handleAddTextField = this.handleAddTextField.bind(this);
        this.brainstorm = this.brainstorm.bind(this);
    }

    handleToolClick(tool) {
        if (tool === 'eraser') {
            this.handleColorClick('white');
        }
        else if (tool === 'clear') {
            this.clear();
            this.socket.emit('clear', '');
            console.log('Emit clear');
            return;
        }
        else {
            if (this.state.color === 'white') {
                this.handleColorClick('black');
            }
        }

        this.setState(() => ({tool}));
    };

    handleColorClick(color) {
        this.setState((prevState) => {
            if (prevState.color !== color) {
                return {color};
            }
        });
    };

    handleSizeClick(size) {
        this.setState((prevState) => {
            if (prevState.size !== size) {
                return {size};
            }
        });
    };

    componentDidMount() {
        this.socket.on('init', (data) => {
            if (data) {
                const paths = data.map((path) => {
                    return deserialize(path.data);
                });
                this.setState(() => ({paths}))
            }
        });
        this.socket.on('update', (serializedPath) => {
            console.log('Receive new path');
            this.handleAddPath(deserialize(serializedPath), false);
        });
        this.socket.on('brainstorm', (bool) => {
            console.log('Brainstorm (de)activated');
            this.setState(() => ({brainstorm: bool}))
        });
        this.socket.on('clear', () => {
            this.clear();
        });
    }

    handleAddPath(path, emit) {
        if (path) {
            this.setState((prevState) => ({paths: prevState.paths.concat(path)}));

            if (emit) {
                const serializedPath = serialize(path);
                this.socket.emit('update', serializedPath);
                console.log('Emit new path');
            }
        }
    };

    handleAddTextField(text, emit) {
        if (text) {
            this.setState((prevState) => ({textFields: prevState.textFields.concat(text)}));

            if (emit) {
                const serializedText = serialize(text);
                this.socket.emit('update', serializedText);
                console.log('Emit new text');
            }
        }
    }

    clear(){
        this.setState(() => ({
            tool: 'pencil',
            textFields: [],
            paths: [],
            brainstorm: false
        }));
    }

    brainstorm(){
        this.clear();
        this.socket.emit('clear', '');
        console.log('Emit clear');
        const Subject = prompt("Please enter your Subject","");
        const Category1 = prompt("Please enter your first Category","");
        const Category2 = prompt("Please enter your second Category","");
        const Category3 = prompt("Please enter your third Category","");
        const Category4 = prompt("Please enter your fourth Category","");
        this.handleAddTextField(WhiteboardSVG.textToSVG(Subject, 580, 360, 'black', 35), true); //font-size
        this.handleAddTextField(WhiteboardSVG.textToSVG(Category1, 240, 150,  'black', 25), true);
        this.handleAddTextField(WhiteboardSVG.textToSVG(Category2, 1000, 150,  'black', 25), true);
        this.handleAddTextField(WhiteboardSVG.textToSVG(Category3, 240, 600,  'black', 25), true);
        this.handleAddTextField(WhiteboardSVG.textToSVG(Category4, 1000, 600,  'black', 25), true);
        this.setState(() => ({brainstorm: true}));
        this.socket.emit('brainstorm', true);
    }

    render() {
        return (
            <div className="app">
                <button id="title" onClick={this.brainstorm}>Brainstorm!</button>
                <div className="bars">
                    <Toolbar handleToolClick={this.handleToolClick}/>
                    <ColorBar handleColorClick={this.handleColorClick}/>
                    <SizeBar handleSizeClick={this.handleSizeClick}/>
                </div>

                <WhiteboardSVG
                    tool={this.state.tool}
                    handleAddPath={this.handleAddPath}
                    paths={this.state.paths}
                    handleAddTextField={this.handleAddTextField}
                    textFields={this.state.textFields}
                    color={this.state.color}
                    size={this.state.size}
                    brainstorm={this.state.brainstorm}
                    svgElements={this.svgElements}
                />
            </div>
    );
    }
}

export default App;
