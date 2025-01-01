var solution_box_2 = document.getElementById("curve-fitting-solution");
var calculate_botton_2 = document.getElementById("calculate-card3");

solution_box_2.innerHTML = "";

calculate_botton_2.addEventListener("click", calculate);


function calculate(){
    var string = document.getElementById("input-cf-data").value;
    var regExp = /^([(][+-]?([0-9]*[.])?[0-9]+,[+-]?([0-9]*[.])?[0-9]+[)],)+[(][+-]?([0-9]*[.])?[0-9]+,[+-]?([0-9]*[.])?[0-9]+[)]$/;
    if (!regExp.test(string)){
        alert("Invalid input! Please input the in the box in the right form! For Example: (2,5.1),(3.4,6),(3.7,7),(9.7)");
    } else {
        var find_pair_reg = /[(][+-]?([0-9]*[.])?[0-9]+,[+-]?([0-9]*[.])?[0-9]+[)]/g;
        var pairs_array = string.match(find_pair_reg);
        
        var find_x_reg = /[+-]?([0-9]*[.])?[0-9]+(?=,)/;
        var find_y_reg = /(?<=,)[+-]?([0-9]*[.])?[0-9]+/;

        var array_for_scatter_plot = [];
        var array_x = [];
        var array_y = [];
        for(let i=0;i<pairs_array.length;i++){
            array_for_scatter_plot.push([parseFloat(pairs_array[i].match(find_x_reg)[0]),parseFloat(pairs_array[i].match(find_y_reg)[0])]);
            array_x.push(parseFloat(pairs_array[i].match(find_x_reg)[0]));
            array_y.push([parseFloat(pairs_array[i].match(find_y_reg)[0])]);
        }
        const y_matrix = math.matrix(array_y);
        const x_array = [];
        for(let i =0;i<array_x.length;i++){
            x_array.push([Math.pow(Math.E,array_x[i]*(-1)*0.2),Math.pow(Math.E,array_x[i]*(-1)*0.7)]);
        }
        const A = math.matrix(x_array);
        const At = math.transpose(A);
        const AtxA = math.multiply(At,A);
        const invAtxA = math.inv(AtxA);
        const invAtxAxAt = math.multiply(invAtxA,At);
        const result = math.multiply(invAtxAxAt,y_matrix);
        const [[Ma],[Mb]] = result.toArray();

        solution_box_2.innerHTML= `<h2>Solution:</h2>
            <p>y = (${Ma})e<sup>-.02t</sup> + (${Mb})e<sup>-.07t</sup></p>
            <h3>Plot the graph that we find by least-square with data:</h3>
            <div id="plot2"></div>
            <style>
                #plot circle {
                    r: 5;
                }
            </style>
            `;
        // Define the data for the function
        const functionData = {
            fn: `${Ma}*exp(x*(-0.2))+${Mb}*exp(x*(-0.7))`,
            color: "#FA4032"
        };

        // Define scatterplot points
        const scatterData = {
            points: array_for_scatter_plot,
            fnType: "points", // Specify it's a scatterplot
            graphType: "scatter", // Type of plot for scatter points
            color: "red",
        };

        // Create the plot
        functionPlot({
            target: "#plot2",
            width: 800,
            height: 400,
            grid: true,
            data: [functionData, scatterData],
        });
    }
}
