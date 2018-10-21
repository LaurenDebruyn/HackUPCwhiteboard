// Main dependencies
import React from 'react';
// import {Layer, Image, Stage} from "react-konva";

export default class Whiteboard extends React.Component {
    render() {
        return (
            <Stage
                width={1000}
                height={1000}
            >
                <Layer>
                    <Drawing
                        tool={this.props.tool}
                    />
                </Layer>
            </Stage>
        );
    }
}

class Drawing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDrawing: false,
            canvas: undefined,
            context: undefined,
        };
    }

    componentDidMount() {
        const canvas = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = 500;
        const context = canvas.getContext("2d");

        this.setState(() => ({canvas, context}));
    }

    handleDrawStart = () => {
        this.setState(() => ({isDrawing: true}));
        const stage = this.image.getStage();
        this.lastPointerPosition = stage.getPointerPosition();
    };

    handleDrawEnd = () => {
        this.setState(() => ({isDrawing: false}));
    };

    handleDrawMove = (e) => {
        const {context, isDrawing} = this.state;

        if (isDrawing) {
            // context.strokeStyle = "#df4b26";
            context.lineJoin = "round";

            if (this.props.tool === 'pencil') {
                context.globalCompositeOperation = "source-over";
                context.lineWidth = 2;
            } else if (this.props.tool === 'eraser') {
                context.globalCompositeOperation = "destination-out";
                context.lineWidth = 10;
            }

            context.beginPath();

            const relPos = {
                x: this.lastPointerPosition.x - this.image.x(),
                y: this.lastPointerPosition.y - this.image.y()
            };
            context.moveTo(relPos.x, relPos.y);

            const stage = this.image.getStage();

            const pos = stage.getPointerPosition();

            const localPos = {
                x: pos.x - this.image.x(),
                y: pos.y - this.image.y()
            };
            context.lineTo(localPos.x, localPos.y);
            context.closePath();
            context.stroke();
            this.lastPointerPosition = pos;
            this.image.getLayer().draw();
        }
    };

    render() {
        return (
            <Image
                image={this.state.canvas}
                ref={(node) => (this.image = node)}
                width={500}
                height={500}
                onMouseDown={this.handleDrawStart}
                onTouchStart={this.handleDrawStart}
                onMouseUp={this.handleDrawEnd}
                onTouchEnd={this.handleDrawEnd}
                onMouseMove={this.handleDrawMove}
                onTouchMove={this.handleDrawMove}
            />
        );
    }
}