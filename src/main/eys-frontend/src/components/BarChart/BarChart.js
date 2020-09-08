import React from 'react';
import "../../style/BarChart.css";

function BarGroup(props) {
    let barPadding = 2
    let barColour = '#348AA7'
    let widthScale = d => d * 10

    let width = widthScale(props.d.value)
    let yMid = props.barHeight * 0.5

    return <g className="bar-group">
        <text className="name-label" x="60" y={yMid} alignmentBaseline="middle" >{props.d.name}</text>
        <rect x="75" y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
        <text className="value-label" x={width + 75 - 8} y={yMid} alignmentBaseline="middle" >{props.d.value}</text>
    </g>
}

export default class BarChart extends React.Component {
    render() {
        let barHeight = 40;
        let barGroups = [];
        if(this.props.rows.length > 0) {
            barGroups = this.props.rows.map((d, i) =>
                <g transform={`translate(0, ${i * barHeight})`}>
                    <BarGroup d={d} barHeight={barHeight}/>
                </g>);
        }
        return <svg width="1000" height="500" >
            <g className="container">
                <text className="title" x="10" y="30">{this.props.title}</text>
                <g className="chart" transform="translate(100,60)">
                    {barGroups}
                </g>
            </g>
        </svg>
    }
}