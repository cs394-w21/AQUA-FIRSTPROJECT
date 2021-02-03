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
    const xScale = scaleBand()
      .domain(data.map((d) => d.year))
      .range([0, width])
      .padding(0.25);

    const yScale = scaleLinear().domain(extent).range([height, 0]);

    // rendering
    svg
      .selectAll(".layer")
      .data(layers)
      .join("G")
      .attr("class", "layer")
      .attr("fill", (layer) => colors[layer.key])
      .selectAll("rect")
      .data((layer) => layer)
      .join("rect")
      //.attr("x", (sequence) => xScale(sequence.data.year))
      .attr("width", xScale.bandwidth())
      //.attr("y", (sequence) => yScale(sequence[1]))
      .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1]));

    // axes
    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);
  }, [colors, data, keys]);

  return (
    <>
      <View ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <Svg ref={svgRef}>
          <G className="x-axis" />
          <G className="y-axis" />
        </Svg>
      </View>
    </>
  );
}

export default MacroChart;
