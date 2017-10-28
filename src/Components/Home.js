import React, { Component } from 'react';
import * as d3 from 'd3';

// import { Route, Switch } from 'react-router-dom';
// import { Link } from 'react-router-dom';


// class Home extends Component{
// 	render(){
// 		return(
// 			<div>askjdlfhalskjdhf</div>)
// 	}
// }

class Home extends Component {
	constructor(props){
		super(props)
		this.createBubbles = this.createBubbles.bind(this)
	}

	componentDidMount(){
		this.createBubbles()
	}

	componentDidUpdate(){
		this.createBubbles()
	}

	createBubbles(){
		var node = this.node
		var svg = d3.select(node)
		console.log(this.node)
		// var svg = d3.select("svg"),
	    var margin = 20,
	    diameter = +svg.attr("width"),
	    g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
	    console.log(svg)
	    
		var color = d3.scaleLinear()
		    .domain([-1, 5])
		    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
		    .interpolate(d3.interpolateHcl);

		var pack = d3.pack()
		    .size([diameter - margin, diameter - margin])
		    .padding(2);

		d3.json('../../public/flare.json', function(error, root) {
		  if (error) throw error;

		  root = d3.hierarchy(root)
		      .sum(function(d) { return d.size; })
		      .sort(function(a, b) { return b.value - a.value; });

		  var focus = root,
		      nodes = pack(root).descendants(),
		      view;

		  var circle = g.selectAll("circle")
		    .data(nodes)
		    .enter().append("circle")
		      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
		      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
		      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

		  var text = g.selectAll("text")
		    .data(nodes)
		    .enter().append("text")
		      .attr("class", "label")
		      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
		      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
		      .text(function(d) { return d.data.name; });

		  var node = g.selectAll("circle,text");

		  svg
		      .style("background", color(-1))
		      .on("click", function() { zoom(root); });

		  zoomTo([root.x, root.y, root.r * 2 + margin]);

		  function zoom(d) {
		    var focus0 = focus; focus = d;

		    var transition = d3.transition()
		        .duration(d3.event.altKey ? 7500 : 750)
		        .tween("zoom", function(d) {
		          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
		          return function(t) { zoomTo(i(t)); };
		        });

		    transition.selectAll("text")
		      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
		        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
		        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
		        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
		  }

		  function zoomTo(v) {
		    var k = diameter / v[2]; view = v;
		    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
		    circle.attr("r", function(d) { return d.r * k; });
		  }
		});
	}

	render() {
		return (
			<div>home component here
				<svg ref={node=>{this.node=node}} width={960} height={960}></svg>
			</div>
		)
	}
}

export default Home;

/*createBubbles(){
		
		var svg = d3.select("svg"),
	    margin = 20,
	    diameter = +svg.attr("width"),
	    g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

		var color = d3.scaleLinear()
		    .domain([-1, 5])
		    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
		    .interpolate(d3.interpolateHcl);

		var pack = d3.pack()
		    .size([diameter - margin, diameter - margin])
		    .padding(2);

	d3.json(flare, function(error, root) {
	  if (error) throw error;

	  root = d3.hierarchy(root)
	      .sum(function(d) { return d.size; })
	      .sort(function(a, b) { return b.value - a.value; });

	  var focus = root,
	      nodes = pack(root).descendants(),
	      view;

	  var circle = g.selectAll("circle")
	    .data(nodes)
	    .enter().append("circle")
	      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
	      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
	      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

	  var text = g.selectAll("text")
	    .data(nodes)
	    .enter().append("text")
	      .attr("class", "label")
	      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
	      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
	      .text(function(d) { return d.data.name; });

	  var node = g.selectAll("circle,text");

	  svg
	      .style("background", color(-1))
	      .on("click", function() { zoom(root); });

	  zoomTo([root.x, root.y, root.r * 2 + margin]);

	  function zoom(d) {
	    var focus0 = focus; focus = d;

	    var transition = d3.transition()
	        .duration(d3.event.altKey ? 7500 : 750)
	        .tween("zoom", function(d) {
	          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
	          return function(t) { zoomTo(i(t)); };
	        });

	    transition.selectAll("text")
	      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
	        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
	        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
	        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
	  }

	  function zoomTo(v) {
	    var k = diameter / v[2]; view = v;
	    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
	    circle.attr("r", function(d) { return d.r * k; });
	  }
	});
	}*/
