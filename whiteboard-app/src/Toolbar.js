// Main dependencies
import React from 'react';

// Icons
import {ReactComponent as PencilIcon} from "./pencil.svg";
import {ReactComponent as EraserIcon} from "./eraser.svg";
import {ReactComponent as TextIcon} from "./text.svg";
import {ReactComponent as DeleteIcon} from "./delete.svg";

export default class Toolbar extends React.Component {
    render () {
        return (
            <div className="bar">
                <button onClick={
                    (e) => {
                        this.props.handleToolClick('pencil');
                    }
                }><PencilIcon/></button>

                <button onClick={
                    (e) => {
                        this.props.handleToolClick('eraser');
                    }
                }><EraserIcon /></button>
                <button onClick={
                    (e) => {
                        this.props.handleToolClick('text');
                    }
                }><TextIcon /></button>

                <button onClick={
                    (e) => {
                        this.props.handleToolClick('clear');
                    }
                }><DeleteIcon /></button>

            </div>
        );
    }
}