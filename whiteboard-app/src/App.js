// Main dependencies
import React, { Component } from 'react';

// Own components
import Toolbar from 'Toolbar';
import Whiteboard from 'Whiteboard';

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
