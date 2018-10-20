// Main dependencies
import React from 'react';

// Own components
import Toolbar from './Toolbar.js';
import Whiteboard from './Whiteboard.js';

// CSS
import './App.css';

class App extends React.Component {
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

    componentDidMount() {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', 'https://hackupcwhiteboard.herokuapp.com/test', false);
        xmlHttp.send(null);
        console.log(xmlHttp.responseText);
    }

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
