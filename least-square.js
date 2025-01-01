var solution_box = document.getElementById("least-square-solution");
var calculate_botton = document.getElementById("calculate-card2");
var select = document.getElementsByClassName("custom-select")[0];
var option_key = 0;
solution_box.innerHTML = "";


calculate_botton.addEventListener("click", calculate);
select.addEventListener("click",changeKey);


function changeKey(event){
    var selected_mode = select.getElementsByClassName("select-selected")[0].innerHTML;
    if(selected_mode == "y = β₁x + β₂x² + β₃x³"){
        option_key = 0;
    } else if (selected_mode == "y = β₁x + β₂x² + β₃x³ + β₄x⁴"){
        option_key = 1;
    } else if (selected_mode == "y = β₁x + β₂x² + β₃x³ + β₄x⁴ + β₅x⁵"){
        option_key = 2;
    }
}


function calculate(){


    var string = document.getElementById("input-ls-data").value;
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
        
        
        var fn = "";

        if(option_key==0){
            const y_matrix = math.matrix(array_y);
            const x_array = [];
            for(let i =0;i<array_x.length;i++){
                x_array.push([array_x[i],Math.pow(array_x[i],2),Math.pow(array_x[i],3)]);
            }
            const A = math.matrix(x_array);
            const At = math.transpose(A);
            const AtxA = math.multiply(At,A);
            const invAtxA = math.inv(AtxA);
            const invAtxAxAt = math.multiply(invAtxA,At);
            const result = math.multiply(invAtxAxAt,y_matrix);
            const [[beta1],[beta2],[beta3]] = result.toArray();
            const b1 = parseFloat(beta1);
            const b2 = parseFloat(beta2);
            const b3 = parseFloat(beta3);
            // const b1 = 0.49, b2 = -0.03, b3 = 0.0009;
            fn = `${b1}x+${b2}x^2+${b3}x^3`;
            solution_box.innerHTML= `<h2>Solution:</h2>
            <p>y = (${b1})x + (${b2})x² + (${b3})x³</p>
            <h3>Plot the graph that we find by least-square with data:</h3>
            <div id="plot"></div>
            <style>
                #plot circle {
                    r: 5;
                }
            </style>
            `;
            // Define the data for the function
            const functionData = {
                fn: fn,
                color: "#001A6E",
            };

            // Define scatterplot points
            const scatterData = {
                points: array_for_scatter_plot,
                fnType: "points", // Specify it's a scatterplot
                graphType: "scatter", // Type of plot for scatter points
                color: "#009990",
            };

            // Create the plot
            functionPlot({
                target: "#plot",
                width: 800,
                height: 400,
                grid: true,
                data: [functionData, scatterData],
            });
        } else if(option_key==1){
            const y_matrix = math.matrix(array_y);
            const x_array = [];
            for(let i =0;i<array_x.length;i++){
                x_array.push([array_x[i],Math.pow(array_x[i],2),Math.pow(array_x[i],3),Math.pow(array_x[i],4)]);
            }
            const A = math.matrix(x_array);
            const At = math.transpose(A);
            const AtxA = math.multiply(At,A);
            const invAtxA = math.inv(AtxA);
            const invAtxAxAt = math.multiply(invAtxA,At);
            const result = math.multiply(invAtxAxAt,y_matrix);
            const [[beta1],[beta2],[beta3],[beta4]] = result.toArray();
            const b1 = parseFloat(beta1);
            const b2 = parseFloat(beta2);
            const b3 = parseFloat(beta3);
            const b4 = parseFloat(beta4);
            // const b1 = 0.49, b2 = -0.03, b3 = 0.0009;
            fn = `${b1}x+${b2}x^2+${b3}x^3+${b4}x^4`;
            solution_box.innerHTML= `<h2>Solution:</h2>
            <p>y = (${b1})x + (${b2})x² + (${b3})x³ + (${b4})x⁴</p>
            <h3>Plot the graph that we find by least-square with data:</h3>
            <div id="plot"></div>
            <style>
                #plot circle {
                    r: 5; /* Increase radius size */
                }
            </style>
            `;
            // Define the data for the function
            const functionData = {
                fn: fn,
                color: "#001A6E",
            };

            // Define scatterplot points
            const scatterData = {
                points: array_for_scatter_plot,
                fnType: "points", // Specify it's a scatterplot
                graphType: "scatter", // Type of plot for scatter points
                color: "#009990",
            };

            // Create the plot
            functionPlot({
                target: "#plot",
                width: 800,
                height: 400,
                grid: true,
                data: [functionData, scatterData],
            });

        } else if (option_key == 2){
            const y_matrix = math.matrix(array_y);
            const x_array = [];
            for(let i =0;i<array_x.length;i++){
                x_array.push([array_x[i],Math.pow(array_x[i],2),Math.pow(array_x[i],3),Math.pow(array_x[i],4),Math.pow(array_x[i],5)]);
            }
            const A = math.matrix(x_array);
            const At = math.transpose(A);
            const AtxA = math.multiply(At,A);
            const invAtxA = math.inv(AtxA);
            const invAtxAxAt = math.multiply(invAtxA,At);
            const result = math.multiply(invAtxAxAt,y_matrix);
            const [[beta1],[beta2],[beta3],[beta4],[beta5]] = result.toArray();
            const b1 = parseFloat(beta1);
            const b2 = parseFloat(beta2);
            const b3 = parseFloat(beta3);
            const b4 = parseFloat(beta4);
            const b5 = parseFloat(beta5);
            // const b1 = 0.49, b2 = -0.03, b3 = 0.0009;
            fn = `${b1}x+${b2}x^2+${b3}x^3+${b4}x^4+${b5}x^5`;
            solution_box.innerHTML= `<h2>Solution:</h2>
            <p>y = (${b1})x + (${b2})x² + (${b3})x³ + (${b4})x⁴ + (${b5})x⁵</p>
            <h3>Plot the graph that we find by least-square with data:</h3>
            <div id="plot"></div>
            <style>
                #plot circle {
                    r: 5; /* Increase radius size */
                }
            </style>
            `;
            // Define the data for the function
            const functionData = {
                fn: fn,
                color: "#001A6E",
            };

            // Define scatterplot points
            const scatterData = {
                points: array_for_scatter_plot,
                fnType: "points", // Specify it's a scatterplot
                graphType: "scatter", // Type of plot for scatter points
                color: "#009990",
            };

            // Create the plot
            functionPlot({
                target: "#plot",
                width: 800,
                height: 400,
                grid: true,
                data: [functionData, scatterData],
            });
        }
    }
}
