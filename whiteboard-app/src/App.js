// Main dependencies
import React, { Component } from 'react';
import Konva from 'konva';
import {Layer, Line, Rect, Stage, Group} from 'react-konva';

// Own components
import Toolbar from 'Toolbar';
import Whiteboard from 'Whiteboard';

// Icons
import { ReactComponent as PencilIcon } from './pencil.svg';
import { ReactComponent as TextIcon } from './text.svg';

// CSS
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

export default App;
