import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const LineChart = ({ data, xField, yField, caption }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear previous elements

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    svg.attr("width", width).attr("height", height);

    // Dynamically set the x and y scales
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d[xField]))
      .range([margin.left, width - margin.right]);

    const yMax = d3.max(data, (item) => item[yField]);
    const yMin = d3.min(data, (item) => item[yField]);

    const y = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Add tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "rgba(0, 0, 0, 0.7)")
      .style("color", "white")
      .style("padding", "5px 10px")
      .style("border-radius", "5px")
      .style("opacity", 0)
      .style("pointer-events", "none")
      .style("font-size", "12px");

    // Create a line generator
    const line = d3
      .line()
      .x((d, i) => (i / (data.length - 1)) * (width - margin.left - margin.right) + margin.left)
      .y((d) => y(d[yField]))
      .curve(d3.curveMonotoneX);

    // Draw the line
    svg
      .append("path")
      .data([data])
      .join("path")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2);

    // Add points to the line chart
    svg
      .append("g")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d, i) => (i / (data.length - 1)) * (width - margin.left - margin.right) + margin.left)
      .attr("cy", (d) => y(d[yField]))
      .attr("r", 5)
      .attr("fill", "red")
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(`${xField}: ${d[xField]}<br>${yField}: ${d[yField]}`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    // Add x-axis as a single line
    svg
      .append("line")
      .attr("x1", margin.left)
      .attr("x2", width - margin.right)
      .attr("y1", height - margin.bottom)
      .attr("y2", height - margin.bottom)
      .attr("stroke", "white");

    // Add y-axis
    svg
      .append("g")
      .call(d3.axisLeft(y))
      .attr("transform", `translate(${margin.left},0)`);

    // Add caption with margin
    if (caption) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", margin.top) // Margin to control space between caption and chart
        .attr("text-anchor", "middle")
        .attr("font-size", "18px")
        .attr("fill", "white")
        .text(caption);
    }
  }, [data, xField, yField, caption]);

  return <svg className="border-2 border-white rounded-md" ref={ref}></svg>;
};

export default LineChart;
