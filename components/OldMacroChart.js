import React from "react";
import { Svg, G, Line, Rect, Text } from "react-native-svg";
import * as d3 from "d3";

const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 20;
const colors = {
  axis: "#E4E4E4",
  bars: "#15AD13",
};

const MacroChart = ({ data }) => {
  // Dimensions
  const SVGHeight = 300;
  const SVGWidth = 350;
  const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
  const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;

  // X scale point
  const xDomain = data.map((item) => item.label);
  const xRange = [0, graphWidth];
  const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1);

  // Y scale linear
  const space_on_top_lol = 6;
  const dataMax = d3.max(data, (d) => d.apples + d.bananas + d.dates);
  const yDomain = [0, dataMax + space_on_top_lol];
  const yRange = [0, graphHeight];
  const y = d3.scaleLinear().domain(yDomain).range(yRange);
  const dataTicks = [];
  for (let i = 0; i < dataMax + 100; i = i + 100) {
    dataTicks.push(i);
  }
  const space_on_left_lol = 6;
  const space_at_start_lol = 27;

  return (
    <Svg width={SVGWidth} height={SVGHeight}>
      <G y={graphHeight}>
        {/* y axis */}
        <Line
          x1={space_at_start_lol}
          y1="2"
          x2={space_at_start_lol}
          y2={graphHeight * -1}
          stroke={colors.axis}
          strokeWidth="0.5"
        />
        <G origin={(5, graphHeight * -0.5)}>
          <Text
            fontSize="8"
            x={graphHeight * 0.5}
            y="6"
            textAnchor="middle"
            style={{ hefontSize: 200, transform: [{ rotate: "270deg" }] }}
          >
            Calories
          </Text>
        </G>

        {/* ticks */}
        {dataTicks.map((tick) => {
          console.log("graphHeight", graphHeight);
          console.log(y(tick));
          return (
            <G key={tick}>
              <Text
                fontSize="8"
                x={space_at_start_lol - 2}
                y={-y(tick) + 2}
                textAnchor="end"
                style={{ hefontSize: 200 }}
              >
                {tick}
              </Text>
              <Line
                x1={space_at_start_lol}
                y1={-y(tick)}
                x2={graphWidth}
                y2={-y(tick)}
                stroke={colors.axis}
                strokeWidth="0.5"
              />
            </G>
          );
        })}

        {/* bars */}
        {data.map((item) => (
          <G key={item.label}>
            <Rect
              x={x(item.label) - GRAPH_BAR_WIDTH / 2 + space_on_left_lol}
              y={y(Number(item.apples + item.dates)) * -1}
              width={GRAPH_BAR_WIDTH}
              height={y(item.apples)}
              fill={"red"}
            />
            <Rect
              x={x(item.label) - GRAPH_BAR_WIDTH / 2 + space_on_left_lol}
              y={y(Number(item.bananas + item.dates + item.apples)) * -1}
              width={GRAPH_BAR_WIDTH}
              height={y(item.bananas)}
              fill={"yellow"}
            />
            <Rect
              x={x(item.label) - GRAPH_BAR_WIDTH / 2 + space_on_left_lol}
              y={y(Number(item.dates)) * -1}
              width={GRAPH_BAR_WIDTH}
              height={y(item.dates)}
              fill={"brown"}
            />
          </G>
        ))}
        {/* x axis */}

        <Line
          x1={space_at_start_lol}
          y1="0"
          x2={graphWidth}
          y2="0"
          stroke={colors.axis}
          strokeWidth="1"
        />
        {/* x axis labels */}
        {data.map((item) => (
          <Text
            key={"label" + item.label}
            fontSize="8"
            x={x(item.label) + space_on_left_lol}
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
export default MacroChart;
