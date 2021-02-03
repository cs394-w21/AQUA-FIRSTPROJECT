import React, { useRef } from "react";
import { View } from "react-native";
import { Svg, G, Line, Rect, Text } from "react-native-svg";
import * as d3 from "d3";
import { timeDay } from "d3";

const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 20;
const colors = {
  axis: "#E4E4E4",
  bars: "#15AD13",
};

const MacroChart = ({ data }) => {
  // Dimensions
  const SVGHeight = 300;
  const SVGWidth = 300;
  const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
  const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;

  // X scale point
  const xDomain = data.map((item) => item.label);
  const xRange = [0, graphWidth];
  const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1);

  // Y scale linear
  const space_on_top_lol = 6;
  const yDomain = [
    0,
    d3.max(data, (d) => d.apples + d.bananas + d.dates) + space_on_top_lol,
  ];
  const yRange = [0, graphHeight];
  const y = d3.scaleLinear().domain(yDomain).range(yRange);
  return (
    <Svg width={SVGWidth} height={SVGHeight}>
      <G y={graphHeight}>
        {/* bars */}
        {data.map((item) => (
          <G key={item.label}>
            <Rect
              x={x(item.label) - GRAPH_BAR_WIDTH / 2}
              y={y(Number(item.apples + item.dates)) * -1}
              width={GRAPH_BAR_WIDTH}
              height={y(item.apples)}
              fill={"red"}
            />
            <Rect
              x={x(item.label) - GRAPH_BAR_WIDTH / 2}
              y={y(Number(item.bananas + item.dates + item.apples)) * -1}
              width={GRAPH_BAR_WIDTH}
              height={y(item.bananas)}
              fill={"yellow"}
            />
            <Rect
              x={x(item.label) - GRAPH_BAR_WIDTH / 2}
              y={y(Number(item.dates)) * -1}
              width={GRAPH_BAR_WIDTH}
              height={y(item.dates)}
              fill={"brown"}
            />
          </G>
        ))}
        <G className="y-axis" />
        <Line
          x1="0"
          y1="2"
          x2={graphWidth}
          y2="2"
          stroke={colors.axis}
          strokeWidth="0.5"
        />
        {/* labels */}
        {data.map((item) => (
          <Text
            key={"label" + item.label}
            fontSize="8"
            x={x(item.label)}
            y="10"
            textAnchor="middle"
            style={{ hefontSize: 200 }}
          >
            {item.label}
          </Text>
        ))}
      </G>
    </Svg>
  );
};
/*
const MacroChart = ({ data }) => {
  var stack = d3
    .stack()
    .keys(["apples", "bananas", "cherries", "dates"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);

  var series = stack(data);
  console.log(series);
  const GRAPH_MARGIN = 20;
  const colors = {
    axis: "#E4E4E4",
  };

  const SVGHeight = 300;
  const SVGWidth = 300;
  const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
  const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;

  return (
    <Svg width={SVGWidth} height={SVGHeight}>
      <G y={graphHeight}>
        <Line
          x1="0"
          y1="2"
          x2={graphWidth}
          y2="2"
          stroke={colors.axis}
          strokeWidth="0.5"
        />
      </G>
    </Svg>
  );
};
*/
export default MacroChart;
