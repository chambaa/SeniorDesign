import React, { useEffect, useRef } from "react";
import {
  axisBottom,
  axisLeft,
  ScaleBand,
  scaleBand,
  ScaleLinear,
  scaleLinear,
  select
} from "d3";


function AxisBottom({ scale, transform }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
}

function AxisLeft({ scale }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisLeft(scale));
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
  const margin = { top: 10, right: 0, bottom: 20, left: 30 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const scaleX = scaleBand()
    .domain(data.map(({ property }) => property))
    .range([0, width])
    .padding(0.5);
  const scaleY = scaleLinear()
    .domain([0, Math.max(...data.map(({ value }) => value))])
    .range([height, 0]);

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




// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";

// const EmojiChart = props => {
//     const ref = useRef(null);

//     useEffect(
//         () => {
//             const group = d3.select(ref.current);
//             const data = props.data;
//             const height = props.height;
//             const width = props.width;

//             const xScale = d3.scaleBand()
//                 .domain(data.map(d => d.country));

//             const yScale = d3.scaleLinear()
//                 .domain([0, d3.max(data, d => d.value)])
//                 .range([height, 0]);

//             const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

//             group.selectAll('.bar')
//                 .data(data)
//                 .enter()
//                 .append('rect')
//                 .classed('bar', true)
//                 .attr('x', d => xScale(d.country))
//                 .attr('y', d => yScale(d.value))
//                 .attr('height', d => (height - yScale(d.value)))
//                 .attr('width', d => xScale.bandwidth())
//                 .style('fill', (d, i) => colorScale(i));

//             group.selectAll('.bar-label')
//                 .data(data)
//                 .enter()
//                 .append('text')
//                 .classed('bar-label', true)
//                 .attr('x', d => xScale(d.country) + xScale.bandwidth()/2)
//                 .attr('dx', 0)
//                 .attr('y', d => yScale(d.value))
//                 .attr('dy', -6)
//                 .text(d => d.value);

//             const xAxis = d3.axisBottom()
//                 .scale(xScale);
                
//             group.append('g')
//                 .classed('x axis', true)
//                 .attr('transform', `translate(0,${height})`)
//                 .call(xAxis);

//             const yAxis = d3.axisLeft()
//                 .ticks(5)
//                 .scale(yScale);

//             group.append('g')
//                 .classed('y axis', true)
//                 .attr('transform', 'translate(0,0)')
//                 .call(yAxis);

//             group.select('.x.axis')
//                 .append('text')
//                 .attr('x',  width/2)
//                 .attr('y', 60)
//                 .attr('fill', '#000')
//                 .style('font-size', '20px')
//                 .style('text-anchor', 'middle')
//                 .text('Country');    
                
//             group.select('.y.axis')
//                 .append('text')
//                 .attr('x', 0)
//                 .attr('y', 0)
//                 .attr('transform', `translate(-50, ${height/2}) rotate(-90)`)
//                 .attr('fill', '#000')
//                 .style('font-size', '20px')
//                 .style('text-anchor', 'middle')
//                 .text('Government Expenditure in Billion Dollars');   
                
//             const yGridlines = d3.axisLeft()
//                 .scale(yScale)
//                 .ticks(5)
//                 .tickSize(-width,0,0)
//                 .tickFormat('')

//             group.append('g')
//                 .call(yGridlines)
//                 .classed('gridline', true);
    
//         },
//         [props.data]
//     );
//     return (
//         <svg width={props.width} height={props.height} style={{margin: "10px"}}>
//           <g
//             ref={ref}
//           />
//         </svg>
//       );
// };

// export default EmojiChart;