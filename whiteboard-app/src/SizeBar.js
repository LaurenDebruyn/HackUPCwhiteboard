// Main dependencies
import React from 'react';

// Icon
import {ReactComponent as ColorBox} from "./colorbox.svg";

export default class SizeBar extends React.Component {
    render () {
        return (
            <div className="bar">
                <button onClick={
                    (e) => {
                        this.props.handleSizeClick('extraSmall');
                    }
                }><ColorBox width="8" height="8"/></button>

                <button onClick={
                    (e) => {
                        this.props.handleSizeClick('small');
                    }
                }><ColorBox width="12" height="12" /></button>

                <button onClick={
                    (e) => {
                        this.props.handleSizeClick('medium');
                    }
                }><ColorBox width="16" height="16" /></button>

                <button onClick={
                    (e) => {
                        this.props.handleSizeClick('big');
                    }
                }><ColorBox width="20" height="20" /></button>

                <button onClick={
                    (e) => {
                        this.props.handleSizeClick('extraBig');
                    }
                }><ColorBox width="24" height="24" /></button>

            </div>
        );
    }
}