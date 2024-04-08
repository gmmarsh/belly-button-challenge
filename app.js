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

// create a bubble chart otu_ids for x values, sample_values for y values, sample_values for marker size, otu_ids for marker colors, otu_labels for text values
// Fetch the data

d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Extract the samples data
    let samples = data.samples[0];

    // Extract the necessary data
    let otu_ids = samples.otu_ids;
    let sample_values = samples.sample_values;
    let otu_labels = samples.otu_labels;

    // Create the trace
    let trace = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids
        }
    };

    // Create the data array for the plot
    let chartData = [trace];

    // Define the plot layout
    let layout = {
        title: "Bacteria Cultures Per Sample",
        xaxis: { title: "OTU ID" },
        showlegend: false,
        height: 600,
        width: 1500
    };

    // Plot the chart to a div tag with id "bubble"
    Plotly.newPlot("bubble", chartData, layout);
});

// code to handle the change event which in this case is the Test Subject ID No. dropdown
// Fetch the data from the URL
d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the dropdown element from the page
    var dropdown = document.getElementById("selDataset");

    // Loop through the names in the data
    data.names.forEach((name) => {
        // Create a new option element
        var option = document.createElement("option");
        // Set the text and value of the option
        option.text = name;
        option.value = name;

        // Add the option to the dropdown
        dropdown.add(option);
    });
});

// code to handle the change event which in this case is the Test Subject ID No. dropdown 
// the Test Subject ID No. is "id" in the JSON data

// a function to update the sample metadata
function optionChanged(id) {
    
    // fetch the data and return the promise
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
        
    // filter the metadata for the selected Test Subject ID No.
        var metadata = data.metadata.filter(meta => meta.id.toString() === id)[0];

        // get the metadata div
        var metadataDiv = document.getElementById("sample-metadata");

        // Clear any existing metadata
        metadataDiv.innerHTML = "";

        // Add each key-value pair to the metadata div
        Object.entries(metadata).forEach(([key, value]) => {
            var h6tag = document.createElement("h6");
            h6tag.textContent = `${key}: ${value}`;
            metadataDiv.appendChild(h6tag);
        });
    });
}

