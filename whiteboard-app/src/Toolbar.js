// Main dependencies
import React from 'react';

// Icons
import {ReactComponent as PencilIcon} from "./pencil.svg";
import {ReactComponent as EraserIcon} from "./eraser.svg";
import {ReactComponent as TextIcon} from "./text.svg";

export default class Toolbar extends React.Component {
    render () {
        return (
            <div>
                <button onClick={
                    (e) => {
                        this.props.handleToolClick('pencil');
                    }
                }><PencilIcon /></button>
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
            </div>
        );
    }
}