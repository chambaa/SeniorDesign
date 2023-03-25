import React, { useEffect, useRef } from "react";
import {
  axisBottom,
  axisLeft,
  ScaleBand,
  scaleBand,
  ScaleLinear,
  scaleLinear,
  select,
  format
} from "d3";


function AxisBottom({ scale, transform }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale)).selectAll("text").style("font-size", 20);
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
}

function AxisLeft({ scale }) {
  const ref = useRef(null);

  const yAxisTicks = scale.ticks()
    .filter(tick => Number.isInteger(tick));

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisLeft(scale).tickValues(yAxisTicks).tickFormat(format('d')));
    }
  }, [scale]);

  return <g ref={ref} />;
}

function Bars({ data, height, scaleX, scaleY }) {
  return (
    <>
      {data.map(({ value, property }) => (
        <rect
          key={`bar-${property}`}
          x={scaleX(property)}
          y={scaleY(value)}
          width={scaleX.bandwidth()}
          height={height - scaleY(value)}
          fill="teal"
        />
      ))}
    </>
  );
}

function BarChart({ data }) {
  const margin = { top: 10, right: 0, bottom: 30, left: 30 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const scaleX = scaleBand()
    .domain(data.map(({ property }) => property))
    .range([0, width])
    .padding(0.5);
  const scaleY = scaleLinear()
    .domain([0, Math.max(...data.map(({ value }) => value))])
    .range([height, 0]);

  if(data.length == 0){
    return(
      <span>No Emojis :&#40;</span>
    )
  }

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
        <AxisLeft scale={scaleY} />
        <Bars data={data} height={height} scaleX={scaleX} scaleY={scaleY} />
      </g>
    </svg>
  );
}

export default BarChart;

