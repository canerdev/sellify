import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const PieChart = ({ data, caption }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 500;
    const radius = Math.min(width, height - 150) / 2;

    const color = d3.scaleOrdinal([
      "#FF4500",
      "#1E90FF",
      "#32CD32",
      "#8A2BE2",
      "#FFD700",
      "#DC143C",
      "#00CED1"
    ]);

    const pie = d3.pie()
      .value((d) => d.count)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcHover = d3.arc()
      .innerRadius(0)
      .outerRadius(radius + 20);

    svg.attr("width", width).attr("height", height);

    if (caption) {
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", 40)
        .attr("text-anchor", "middle")
        .attr("font-size", "19px")
        .attr("font-weight", "bold")
        .attr("fill", "#333")
        .text(caption);
    }

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${(height / 2) + 20})`);

    const arcs = g.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "rgba(0, 0, 0, 0.7)")
      .style("color", "white")
      .style("padding", "8px 12px")
      .style("border-radius", "5px")
      .style("opacity", 0)
      .style("pointer-events", "none")
      .style("font-size", "14px");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.region))
      .style("stroke", "#fff")
      .style("stroke-width", "2px")
      .style("filter", "drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.5))")
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", arcHover)
          .style("filter", "drop-shadow(8px 8px 12px rgba(0, 0, 0, 0.7))");

        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.data.region}</strong><br>Number of Customers: ${d.data.count}`)
          .style("left", `${event.pageX + 15}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.pageX + 15}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", arc)
          .style("filter", "drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.5))");
      
        tooltip.style("opacity", 0);
      });
      
    arcs.append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d) => `${d.data.region}`)
      .style("fill", "white")
      .style("font-size", "14px")
      .style("font-weight", "bold");

  }, [data, caption]);

  return (
    <svg ref={ref} className="border-4 rounded-md shadow-xl bg-gray-50"></svg>
  );
};

export default PieChart;
