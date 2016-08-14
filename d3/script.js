
//Setting some vars data - later we'll load them from data.csv instead
//var data = [3,5,7,2,3,12,54,32,23,2,9];
//Now we'll make it scale automatically. Also had to remove the hard-coded d*10 to x(d)
//Watch out - methods have changed since 3 it used to be d3.scale.linear..
var x = d3.scaleLinear()
	.range([0,420]);


//Already have a div class "chart", which we select. Though better yet: append a div of class chart to the body


/* next bit was the example with html elements, commented to show the svg methods
d3.select("body")
	.append("div")
	.attr('class',"chart" )
	.selectAll("div")
		.data(data)
	.enter().append("div")
		.style('width', function(d) {return x(d)+"px";})
		.text(function(d) {return d;});
*/
//SVG rep of stuff
var width = 420
var barHeight = 20;
var chart = d3.select("body")
	.append("svg")
	.attr('class',"chart" )
	.attr('width', width)

//src directory is considered the index.html one, 0not where the script.js resides!!
//At least on a local server...
//That's a lot set within the callback function. Wonder if I HAVE to put it all there?
//Coz that's a lot of code potentially if EVERYTHING that depends on the data has to be within the
//callback... or perhaps I could set data = d3.csv(....) & the refer to data instead? Might be a 
//simple choice for tutorial?
d3.csv('/d3/data/data.csv', function(error,data) {
	x.domain([0,d3.max(data,function(d) {return d.value;})]);
	chart.attr('height', barHeight*data.length);

var bar = d3.select(".chart")
	.selectAll("g")
	.data(data)
	.enter().append("g")
		.attr('transform', function(d,i) {return "translate(0,"+i*barHeight + ")";} );

bar.append('rect')
    .attr('width', function(d) {return x(d.value);})
    .attr('height', barHeight - 1)

bar.append("text")
    .attr('x', function(d) {return x(d.value) -3;})
    .attr('y', barHeight/2)
    .attr('dy', ".35em" )
		.text(function(d) {return d.value;});
});
function type(d) {
	d.value = +d.value;	//to force conversion to number
	return d;
}

