import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const PieChart = ({ data, caption, w = 550, h = 350 }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = w;
    const height = h;
    const radius = Math.min(width, height) / 2 - 40;

    const color = d3.scaleOrdinal([
      "#1E3A8A",
      "#2563EB",
      "#60A5FA",
      "#93C5FD",
      "#F3F4F6",
      "#6B7280",
      "#111827"
    ]);

    const pie = d3.pie()
      .value((d) => d.count)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcHover = d3.arc()
      .innerRadius(0)
      .outerRadius(radius + 10);

    svg.attr("width", width).attr("height", height);

    if (caption) {
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("font-size", "18px")
        .attr("fill", "white")
        .text(caption);
    }

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcs = g.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "rgba(0, 0, 0, 0.7)")
      .style("color", "white")
      .style("padding", "5px 10px")
      .style("border-radius", "5px")
      .style("opacity", 0)
      .style("pointer-events", "none")
      .style("font-size", "12px");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.region))
      .on("mouseover", function (event, d) {
        d3.select(this).transition()
          .duration(300)
          .attr("d", arcHover);
        tooltip.transition()
          .duration(300)
          .style("opacity", 1);
        tooltip.html(`Region: ${d.data.region}<br>Customers: ${d.data.count}`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px");
      })
      .on("mousemove", (event) => {
        tooltip.style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px");
      })
      .on("mouseout", function () {
        d3.select(this).transition()
          .duration(300)
          .attr("d", arc);
        tooltip.transition()
          .duration(300)
          .style("opacity", 0);
      });

    arcs.append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d) => d.data.region)
      .style("fill", "white")
      .style("font-size", "12px");

  }, [data, caption, w, h]);

  return <svg ref={ref} className="border-2 border-white rounded-md" style={{ backgroundColor: 'transparent', width: '100%', height: '100%' }}></svg>;
};

export default PieChart;
