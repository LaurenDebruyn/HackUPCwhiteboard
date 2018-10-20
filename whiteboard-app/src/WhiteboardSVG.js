// Main dependencies
import React from 'react';
import ReactDOM from 'react-dom';



export default class WhiteboardSVG extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPath: [],
            isDrawing: false,
            top: 0,
            left: 0
        };
        this.handleDrawStart = this.handleDrawStart.bind(this);
        this.handleDrawMove = this.handleDrawMove.bind(this);
        this.handleDrawEnd = this.handleDrawEnd.bind(this);
    }

    componentDidMount() {
        const node = ReactDOM.findDOMNode(this.refs.canvas);
        const rect = node.getBoundingClientRect();
        const { left, top } = rect;
        this.setState({ top, left });
    }

    handleDrawStart(e) {
        e.preventDefault();
        let pageX = e.pageX;
        let pageY = e.pageY;
        if (!pageX) {
            pageX = e.touches[0].pageX;
            pageY = e.touches[0].pageY;
        }

        if (this.props.tool === 'text') {
            const x = pageX - this.state.left;
            const y = pageY - this.state.top;
            const text = prompt("Please enter your text","");
            this.props.handleAddTextField(WhiteboardSVG.textToSVG(text, x, y, this.props.color), true);
        }
        else {
            this.setState((prevState) => {
                if (!prevState.isDrawing) {
                    return {
                        isDrawing: true,
                        activePath: []
                    }
                }
            });
        }
    };

    handleDrawMove(e) {
        if (this.props.tool === 'pencil' || this.props.tool === 'eraser') {
            let pageX = e.pageX;
            let pageY = e.pageY;
            if (!pageX) {
                pageX = e.touches[0].pageX;
                pageY = e.touches[0].pageY;
            }
            this.setState((prevState) => {
                if (prevState.isDrawing) {
                    const x = pageX - prevState.left;
                    const y = pageY - prevState.top;
                    const activePath = prevState.activePath.concat({x, y});
                    return {activePath};
                }
            });
        }
    };

    handleDrawEnd() {
        if (this.props.tool === 'pencil' || this.props.tool === 'eraser') {
            const path = WhiteboardSVG.parsePoints(this.state.activePath, this.props.color);
            this.props.handleAddPath(path, true);
            this.setState((prevState) => {
                if (prevState.isDrawing) {
                    return {
                        isDrawing: false,
                        activePath: []
                    };
                }
            });
        }
    };

    static textToSVG(text, x, y, color) {
        return <text x={x} y={y} fill={color}>{text}</text>;
    }

    static parsePoints(points, color) {
        let path;
        if (points && points.length > 0) {
            path = `M ${points[0].x} ${points[0].y}`;
            let p1, p2, end;
            for (let i = 1; i < points.length - 2; i += 2) {
                p1 = points[i];
                p2 = points[i + 1];
                end = points[i + 2];
                path += ` C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${end.x} ${end.y}`;
            }
            let width;
            if (color === 'white') {
                width = 15;
            } else {
                width = 3;
            }
            return (<path
                key={path}
                stroke={color}
                strokeWidth={width}
                d={path}
                fill="none"
            />);
        }
    }

    render() {
        return (
            <div className="whiteboard">
                <svg
                    ref="canvas"
                    onMouseDown={this.handleDrawStart}
                    onTouchStart={this.handleDrawStart}
                    onMouseUp={this.handleDrawEnd}
                    onTouchEnd={this.handleDrawEnd}
                    onMouseMove={this.handleDrawMove}
                    onTouchMove={this.handleDrawMove}
                    className="canvas"
                >
                    {[this.props.paths]}
                    {WhiteboardSVG.parsePoints(this.state.activePath, this.props.color)}
                    {[this.props.textFields]}
                </svg>
            </div>
        );
    }
}