/* Some Code taken from
http://bl.ocks.org/mbostock/3887235
*/

function makeCharts(data) {
    
    $("#charts").empty();
    // Get all of the keys in the data
    var keys = [];
    for (var k in data) keys.push(k);

    // ######### Making the pie chart ################
    var pie_data = []
    for (var i=0; i<keys.length; i++) {
	if (keys[i].length > 10) {
	    if (!(keys[i].slice(0,5) == "Speak") && !(keys[i].indexOf("$") > -1)) {
		pie_data.push({"value":+data[keys[i]],"name":keys[i]});
	    }
	}
	else {
	    if (!(keys[i].slice(6) == "_AVG") && !(keys[i] == "id") && !(keys[i] == "GEOID10") && !(keys[i].indexOf("$") > -1) && !(keys[i] == "RB_CUSTMR") && !(keys[i] == "Total:")) {
		pie_data.push({"value":+data[keys[i]],"name":keys[i]});
	    }
	}
    }
    
    $("#charts").append("<div id=\"langName\"><h3>Language: <span id=\"lang\"> </span></h3></div>");
    console.log(pie_data)
    var width = 300,
	height = 200,
    radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
	.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
	.outerRadius(radius - 10)
	.innerRadius(0);

    var pie = d3.layout.pie()
	.sort(null)
	.value(function(d) { return d.value; });

    var svg = d3.select("#charts").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
	.data(pie(pie_data))
	.enter().append("g")
	.attr("class", "arc");

    g.append("path")
	.attr("d", arc)
	.attr("title", function(d) { return d.data.name; })
	.style("fill", function(d) { 
	    return color(d.data.name); })
	.on('click', function(d) {
	    $("#charts #langName span").html(d.data.name.slice(0,-1));
	});

    // ############ Bar Chart Code ###################

}

function makeInfo(data){
  
	for (var k in data) keys.push(k);

	for (var i=0; i < keys.length; i++){
		if (keys[i] == "ApproxAvgIncome"){
			var AvgInc = keys[i];
			document.getElementById('Income').innerHTML = AvgInc;
		}

		if (keys[i] == "LI_AVG"){
			var LIAVG = keys[i];
			document.getElementById('LitterIndex').innerHTML = LIAVG;
		}

		if (keys[i] == "RB_CUSTMR){
			var RBCust = keys[i];
			document.getElementById('RecycleBank').innerHTML = RBCust;
		}
}



