// get the data once when the page loads
let samples, metadata;
d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    samples = data.samples;
    metadata = data.metadata;

    // populate the dropdown and display the initial data
    populateDropdown(samples);
    updateData(samples[0].id);
});


// function to populate the dropdown
function populateDropdown(samples) {
    let dropdown = d3.select("#selDataset");
    samples.forEach((sample) => {
        dropdown.append("option").text(sample.id).property("value", sample.id);
    });
}

// function to handle change in dropdown selection
function optionChanged(id) {
    updateData(id);
}

// function to update the demographic info box with the selected ID
function buildMetadata(metadata) {
    let demographicInfo = d3.select("#sample-metadata");

    // clear the existing data
    demographicInfo.html("");

    // append the data to the panel
    Object.entries(metadata).forEach(([key, value]) => {
        demographicInfo.append("h6").text(`${key}: ${value}`);
    });
}

// function to update the plots and metadata
function updateData(id) {
    let sample = samples.filter(sample => sample.id == id)[0];
    let sampleMetadata = metadata.filter(meta => meta.id == id)[0];
    buildPlots(sample);
    buildMetadata(sampleMetadata);
}


// function to build the plots
function buildPlots(sample) {

    // create the bar chart
    let barData = [
        {
            x: sample.sample_values.slice(0, 10).reverse(),
            y: sample.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            otu_labels: sample.otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        }
    ];

    let barLayout = {
        title: "Top 10 OTUs",
        margin: { t: 30, l: 150 }
    };
   
        Plotly.newPlot("bar", barData, barLayout);


    // create the bubble chart
    let bubbleData = [
        {
            x: sample.otu_ids,
            y: sample.sample_values,
            text: sample.otu_labels,
            mode: "markers",
            marker: {
                size: sample.sample_values,
                color: sample.otu_ids,
                colorscale: "Earth"
            }
        }
    ];

    let bubbleLayout = {
        title: "Bacteria Cultures per Sample",
        xaxis: { title: "OTU ID" },
        margin: { t: 30 }
    };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
}