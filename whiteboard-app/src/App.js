import React, { Component } from 'react';
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
            <div>
                <canvas></canvas>
            </div>
        );
    }
}

export default App;
