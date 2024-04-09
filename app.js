// Get the data
d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // extract the samples data
    let samples = data.samples;


// create the dropdown menu
let dropdown = d3.select("#selDataset");

    // append the Test Subject ID No. to the dropdown menu
    samples.forEach((sample) => {
        dropdown.append("option").text(sample.id).property("value", sample.id);
    }
    );

    // display the data and the plots to the page
    buildPlots(samples[0]);
    buildMetadata(data.metadata[0]);
});


// function to handle the change of the dropdown menu
function optionChanged(id) {
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
        // extract the samples data
        let samples = data.samples;

        // filter the data for the selected ID
        let sample = samples.filter(sample => sample.id == id)[0];

        // display the demographic info and the plots
        buildPlots(sample);
        buildMetadata(data.metadata.filter(sample => sample.id == id)[0]);
    }
    );
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

    // plot the bar chart
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

    // plot the bubble chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
}

// update the demographic info with the selected ID
function buildMetadata(metadata) {
    let demographicInfo = d3.select("#sample-metadata");

    // clear the existing data
    demographicInfo.html("");

    // append the data to the panel
    Object.entries(metadata).forEach(([key, value]) => {
        demographicInfo.append("h6").text(`${key}: ${value}`);
    });
}