// Main dependencies
import React from 'react';

// Icons
import {ReactComponent as ColorBox} from "./colorbox.svg";

export default class ColorBar extends React.Component {
    render () {
        return (
            <div>
                <button onClick={
                    (e) => {
                        this.props.handleColorClick('red');
                    }
                }><ColorBox fill="red"/></button>
                <button onClick={
                    (e) => {
                        this.props.handleColorClick('green');
                    }
                }><ColorBox fill="green"/></button>
                <button onClick={
                    (e) => {
                        this.props.handleColorClick('blue');
                    }
                }><ColorBox fill="blue"/></button>
                <button onClick={
                    (e) => {
                        this.props.handleColorClick('yellow');
                    }
                }><ColorBox fill="yellow"/></button>
                <button onClick={
                    (e) => {
                        this.props.handleColorClick('black');
                    }
                }><ColorBox fill="black"/></button>
            </div>
        );
    }
}