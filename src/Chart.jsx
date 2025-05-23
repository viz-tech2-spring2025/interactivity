import * as d3 from "d3";

export function Chart({ data }) {
  const marginLeft = 200;
  const width = 800;
  const height = 800;
  const marginRight = 40;
  const marginTop = 50;
  const marginBottom = 50;

  console.log("This data inside the chart component:", data[0]["Country Name"]);

  //Filter and process data
  const numericData = data
    .filter((d) => d["2022"] != null)
    .map((d) => ({
      country: d["Country Name"],
      value: +d["2022"],
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 50);

  console.log("numericData", numericData);

  // X axis scale

  //domain -> [mix, max] of our data, data.values
  const max = d3.max(numericData, (d) => d.value);
  const min = d3.min(numericData, (d) => d.value);

  console.log("min", min);

  const xScale = d3
    .scaleLinear()
    .domain([0, max])
    .range([marginLeft, width - marginRight - marginLeft]);
  console.log(xScale(max));

  // Y axis scale f(data) -> pixels

  const countries = numericData.map((d) => d.country);

  const yScale = d3
    .scaleBand()
    .domain(numericData.map((d) => d.country))
    .range([marginTop, height - marginBottom])
    .padding(0.3);
  console.log(yScale("Suriname"));

  const xTicks = xScale.ticks(10).map((tick) => (
    <g
      key={tick}
      transform={`translate(${xScale(tick)},${height - marginBottom})`}
    >
      <line y2="6" stroke="black" />
      <text dy="2em" textAnchor="middle" fontSize="10">
        {tick}
      </text>
    </g>
  ));

  //y ticks

  return (
    <div>
      <p>Template for the Coding Exercise</p>
      <svg className="drawing" width={width} height={height}>
        {numericData.map((d) => (
          <rect
            key={d.country}
            x={xScale(0)}
            y={yScale(d.country)}
            width={xScale(d.value) - xScale(0)}
            height={yScale.bandwidth()}
            fill="black"
          ></rect>
        ))}
        {xTicks}
        {/* <line x1={xScale(0)} y1={yScale(max)} x2={width - marginLeft - marginRight} y2={yScale(max)} stroke="black"></line> */}
        <line
          x1={xScale(0)}
          y1={yScale(countries[countries.length - 1])}
          x2={xScale(max)}
          y2={yScale(countries[countries.length - 1])}
          stroke="black"
        ></line>
      </svg>
    </div>
  );
}
