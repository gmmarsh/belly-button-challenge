// Fetch the data
d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Extract the samples data
    let samples = data.samples;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create the dropdown menu
let dropdown = d3.select("#selDataset");

    // Append the Test Subject ID No. to the dropdown menu
    samples.forEach((sample) => {
        dropdown.append("option").text(sample.id).property("value", sample.id);
    }
    );

    // Display the data and the plots to the page
    buildPlots(samples[0]);
    buildMetadata(data.metadata[0]);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function to handle the change of the dropdown menu
function optionChanged(id) {
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
        // Extract the samples data
        let samples = data.samples;

        // Filter the data for the selected ID
        let sample = samples.filter(sample => sample.id == id)[0];

        // Display the data and the plots to the page
        buildPlots(sample);
        buildMetadata(data.metadata[0]);
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to build the plots
function buildPlots(sample) {
    // Create the bar chart
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
    }
