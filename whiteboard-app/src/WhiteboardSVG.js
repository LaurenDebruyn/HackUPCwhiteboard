// Main dependencies
import React from 'react';
import ReactDOM from 'react-dom';


export default class WhiteboardSVG extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paths: [],
            isDrawing: false,
            top: 0,
            left: 0
        };
        this.handleDrawStart = this.handleDrawStart.bind(this);
        this.handleDrawEnd = this.handleDrawEnd.bind(this);
        this.handleDrawMove = this.handleDrawMove.bind(this);
    }

    componentDidMount() {
        const node = ReactDOM.findDOMNode(this.refs.canvas);
        const rect = node.getBoundingClientRect();
        const { left, top } = rect;
        this.setState({ top, left });
    }


    handleDrawStart(e) {
        e.preventDefault();

        this.setState((prevState) => {
            if (!prevState.isDrawing) {
                return {
                    paths: prevState.paths.concat({
                        id: Date.UTC()
                    }),
                    isDrawing: true
                }
            }
        });
    };

    handleDrawMove(e) {
        const pageX = e.pageX;
        const pageY = e.pageY;
        this.setState((prevState) => {
            if (prevState.isDrawing) {
                const x = pageX - prevState.left;
                const y = pageY - prevState.top;
                const paths = prevState.paths.slice(0);
                const activePath = paths[paths.length - 1];
                activePath.push({ x, y });
                return { paths };
            }
        });
    };

    handleDrawEnd() {
        this.setState((prevState) => {
            if (prevState.isDrawing) {
                return { isDrawing: false };
            }
        });
    };

    render() {
        const paths = this.state.paths.map(_points => {
            let path = '';
            let points = _points.slice(0);
            if (points.length > 0) {
                path = `M ${points[0].x} ${points[0].y}`;
                let p1, p2, end;
                for (let i = 1; i < points.length - 2; i += 2) {
                    p1 = points[i];
                    p2 = points[i + 1];
                    end = points[i + 2];
                    path += ` C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${end.x} ${end.y}`;
                }
            }
            return path;
        }).filter(p => p !== '');

        return (
            <div>
                <svg
                    style={{ border: '1px solid black', cursor: 'crosshair' }}
                    width={600}
                    height={480}
                    ref="canvas"
                    onMouseDown={this.handleDrawStart}
                    onMouseUp={this.handleDrawEnd}
                    onMouseMove={this.handleDrawMove}
                >
                {
                    paths.map(path => {
                        return (<path
                            key={path}
                            stroke="blue"
                            strokeWidth={10}
                            d={path}
                            fill="none"
                        />);
                    })
                }
                </svg>
            </div>
        );
    }
}