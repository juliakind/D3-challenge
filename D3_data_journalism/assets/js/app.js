function loadGraph() {

    let plotWidth = 960;
    let plotHeight = 500;
    
    let margin = {
        top: 20,
        right: 40,
        bottom: 80,
        left:100
    };
    
    let width = plotWidth - margin.left - margin.right;
    let height = plotHeight - margin.top - margin.bottom;
    
    // Create the SVG wrapper
    let svgWraper = d3.select("#scatter")
        .append("svg")
        .attr("width", plotWidth)
        .attr("height", plotHeight);
    
    let graph = svgWraper.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    //Load data
    d3.csv("assets/data/data.csv")
        .then(function(plotData){
            plotData.forEach(function(data) {
            data.age = +data.age;
            data.smokes = +data.smokes;
            data.healthcare = +data.healthcare;
            data.poverty = +data.poverty;
            data.abbr = data.abbr;
            data.income = +data.income;
        });

    //Create scales
        let xScale = d3.scaleLinear()
            .domain([8.5, d3.max(plotData, d => d.poverty)])
            .range([0, width]);
    
        let yScale = d3.scaleLinear()
            .domain([3.5, d3.max(plotData, d => d.healthcare)])
            .range([height, 0]);   
    //Create axis
        let xAxis = d3.axisBottom(xScale);
        let yAxis = d3.axisLeft(yScale);
    
    //Append axis to the graph
        graph.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);
    
        graph.append("g")
        .call(yAxis);
        
    //Display plot
        let circlesGroup = graph.selectAll("circle")
            .data(plotData)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.poverty))
            .attr("cy", d => yScale(d.healthcare))
            .attr("r", 10)
            .attr("fill", "lightblue")
            .attr("opacity", ".6")
            .attr("stroke-width", "1")
            .attr("stroke", "black");
    
            graph.select("g")
            .selectAll("circle")
            .data(plotData)
            .enter()
            .append("text")
            .text(d => d.abbr)
            .attr("x", d => xScale(d.poverty))
            .attr("y", d => yScale(d.healthcare))
            .attr("dy",-395)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "black");

           //console.log(plotData);
    });
    }
    
    loadGraph();
