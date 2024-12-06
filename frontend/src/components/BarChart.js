import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const BarChart = ({ data, xField, yField, caption}) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    svg.attr("width", width).attr("height", height);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d[xField]))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yMax = d3.max(data, (item) => item[yField]) * 1.25;

    const y = d3
      .scaleLinear()
      .domain([0, yMax])
      .nice()
      .range([height - margin.bottom, margin.top]);

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

    // draw bars
    svg
      .append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d[xField]))
      .attr("y", (d) => y(d[yField]))
      .attr("height", (d) => y(0) - y(d[yField]))
      .attr("width", x.bandwidth())
      .attr("fill", "steelblue")
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(`${d[yField]}`)
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

    svg
      .append("g")
      .call(d3.axisLeft(y))
      .attr("transform", `translate(${margin.left},0)`);

    svg
      .append("g")
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0,${height - margin.bottom})`);

    if (caption) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", margin.top)
        .attr("text-anchor", "middle")
        .attr("font-size", "18px")
        .attr("fill", "white")
        .text(caption);
    }
  }, [data, xField, yField, caption]);

  return <svg className="border-2 border-white rounded-md" ref={ref}></svg>;
};

export default BarChart;
