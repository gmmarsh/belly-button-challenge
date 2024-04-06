// Fetch the data
d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Extract the samples data
    let samples = data.samples[0];

    // Extract the necessary data
    let otu_ids = samples.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    let sample_values = samples.sample_values.slice(0, 10).reverse();
    let otu_labels = samples.otu_labels.slice(0, 10).reverse();

    // Create the trace
    let trace = {
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        type: "bar",
        orientation: "h"
    };

    // Create the data array for the plot
    let chartData = [trace];

    // Define the plot layout
    let layout = {
        title: "Top 10 OTUs",
        margin: { t: 30, l: 150 }
    };

    // Plot the chart to a div tag with id "bar"
    Plotly.newPlot("bar", chartData, layout);
});








