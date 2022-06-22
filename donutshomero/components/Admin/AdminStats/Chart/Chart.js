import { scaleBand, scaleLinear, max } from "d3";

import s from "./Chart.module.scss";

const width = 900;
const height = 300;
const margin = { top: 20, right: 20, bottom: 20, left: 200 };
const xAxisLabelOffset = 50;

export default function Chart({ data }) {
  console.log("data", data);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yValue = (d) => d.name;
  const xValue = (d) => d.totalSold;

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.15);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* axis bottom */}
        {xScale.ticks().map((tickValue) => (
          <g
            className={s.tick}
            key={tickValue}
            transform={`translate(${xScale(tickValue)},0)`}
          >
            <line y2={innerHeight} stroke="black" />
            <text
              style={{ textAnchor: "middle" }}
              dy=".71em"
              y={innerHeight + 3}
            >
              {tickValue}
            </text>
          </g>
        ))}
        {/* axis left */}
        {yScale.domain().map((tickValue) => (
          <g className={s.tick} key={tickValue}>
            <text
              style={{ textAnchor: "end" }}
              x={-3}
              dy=".32em"
              y={yScale(tickValue) + yScale.bandwidth() / 2}
            >
              {tickValue}
            </text>
          </g>
        ))}
        {data.map((d, i) => (
          <rect
            className={s.mark}
            key={i}
            x={0}
            y={yScale(yValue(d))}
            width={xScale(xValue(d))}
            height={yScale.bandwidth()}
          />
        ))}
      </g>
    </svg>
  );
}
