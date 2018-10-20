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
                        this.props.handleToolClick('colorRed');
                    }
                }><ColorBox fill="red"/></button>
                <button onClick={
                    (e) => {
                        this.props.handleToolClick('colorGreen');
                    }
                }><ColorBox fill="green"/></button>
                <button onClick={
                    (e) => {
                        this.props.handleToolClick('colorBlue');
                    }
                }><ColorBox fill="blue"/></button>
                <button onClick={
                    (e) => {
                        this.props.handleToolClick('colorYellow');
                    }
                }><ColorBox fill="yellow"/></button>
                <button onClick={
                    (e) => {
                        this.props.handleToolClick('colorBlack');
                    }
                }><ColorBox fill="black"/></button>
            </div>
        );
    }
}