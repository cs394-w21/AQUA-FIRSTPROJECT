import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { Svg, G, Line, Rect, Text } from "react-native-svg";
import {
  select,
  scaleBand,
  axisBottom,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending,
} from "d3";

/**
 * Component that renders a StackedBarChart
 */

function MacroChart({ data, keys, colors }) {
  const svgRef = useRef();
  const wrapperRef = useRef();

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const width = 300;
    const height = 300;

    // stacks / layers
    const stackGenerator = stack().keys(keys).order(stackOrderAscending);
    const layers = stackGenerator(data);
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];

    // scales
    /*
    const xScale = scaleBand()
      .domain(data.map((d) => d.year))
      .range([0, width])
      .padding(0.25);
      */
    const xScale = scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, width]);
    const yScale = scaleLinear().domain([height, 0]);
    //const yScale = scaleLinear().domain(extent).range([height, 0]);

    // rendering
    svg
      .selectAll(".layer")
      .style("border", "1px solid black")
      .data(layers)
      .join("G")
      .attr("class", "layer")
      .attr("fill", (layer) => colors[layer.key])
      .selectAll("rect")
      .data((layer) => layer)
      .join("rect")
      .attr("x", (sequence) => xScale(sequence.data.year))
      .attr("width", xScale.bandwidth())
      .attr("y", (sequence) => yScale(sequence[1]))
      .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1]));

    // axes
    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((index) => index + 1);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);
  }, [colors, data, keys]);

  return (
    <>
      <View
        ref={wrapperRef}
        style={{
          marginBottom: "2rem",
          borderWidth: 1,
          borderColor: "purple",
          borderStyle: "solid",
        }}
      >
        <Svg
          ref={svgRef}
          style={{ borderWidth: 1, borderColor: "black", borderStyle: "solid" }}
        >
          <G className="x-axis" />
          <G className="y-axis" />
        </Svg>
      </View>
    </>
  );
}

/*
function bars(scale) {
  const margin = 10,
    width = 100,
    height = 60,
    chart = <Svg width={width + 2 * margin} height={height + 2 * margin}>
        <G transform="translate(${margin}, ${margin})">
            <Rect width=${width} height="${height}"
 fill="none" stroke="black" stroke-width="0.5" />

<rect x="${scale("one")}" width=${scale.bandwidth()} height="${height}"
 fill="red"/>

<rect x="${scale("two")}" width=${scale.bandwidth()} height="${height}"
 fill="green"/>

<rect x="${scale("three")}" width=${scale.bandwidth()} height="${height}"
 fill="blue" />

<rect x="${scale("four")}" width=${scale.bandwidth()} height="${height}"
 fill="#777" />

</g></svg>`;

  return chart;
}
*/

export default MacroChart;
