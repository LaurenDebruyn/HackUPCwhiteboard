// Main dependencies
import {Component} from "react";

// Icons
import {ReactComponent as PencilIcon} from "./pencil.svg";
import {ReactComponent as TextIcon} from "./text.svg";
import React from "react";

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

export default Toolbar;