// Description: This file contains the code to create the gauge chart for the Belly Button Biodiversity project.

// get the data from the url
d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    var samples = data.samples;
    var metadata = data.metadata;

    // populate the dropdown
    var dropdown = d3.select("#selDataset");
    samples.forEach((sample) => {
        dropdown.append("option").text(sample.id).property("value", sample.id);
    });

    // display the initial data
    updateData(samples[0].id);
});

// function to handle change in dropdown selection
function optionChanged(id) {
    updateData(id);
}

// function to update the demographic info box with the selected ID
function buildMetadata(metadata) {
    var demographicInfo = d3.select("#sample-metadata");

    // clear the existing data
    demographicInfo.html("");

    // append the data to the panel
    Object.entries(metadata).forEach(([key, value]) => {
        demographicInfo.append("h6").text(`${key}: ${value}`);
    });
}

// function to update the gauge chart
function updateData(id) {
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
        var samples = data.samples;
        var metadata = data.metadata;

        var sample = samples.filter(sample => sample.id == id)[0];
        var sampleMetadata = metadata.filter(meta => meta.id == id)[0];
        buildPlots(sample);
        buildMetadata(sampleMetadata);

        // Add this line to build the gauge chart
        buildGauge(sampleMetadata.wfreq);
    });
}


// Function to create the gauge chart
function buildGauge(wfreq) {    
    var gaugeData = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreq,
            title: { text: "Belly Button Washing Frequency" },
            type: "indicator",
            mode: "gauge+number+delta",
            delta: { reference: 0 },
            gauge: {
                axis: { range: [0, 9] },
                steps: [
                    { range: [0, 1], color: "white" },
                    { range: [1, 2], color: "beige" },
                    { range: [2, 3], color: "lightyellow" },
                    { range: [3, 4], color: "lightgoldenrodyellow" },
                    { range: [4, 5], color: "palegoldenrod" },
                    { range: [5, 6], color: "khaki" },
                    { range: [6, 7], color: "darkkhaki" },
                    { range: [7, 8], color: "olive" },
                    { range: [8, 9], color: "darkolivegreen" }
                ]
            
            }
        }
    ];

    var gaugeLayout = { width: 600, height: 500, margin: { t: 0, b: 0 } };

    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
}