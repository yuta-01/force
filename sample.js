var list = {
	nodes : [	
			{ name : "C" },//0
			{ name : "C" },
			{ name : "C" },
			{ name : "C" },
			{ name : "C" },
			{ name : "C" },//5
			{ name : "Cl" },//6
			{ name : "Cl" },
			{ name : "Cl" },
			{ name : "Cl" },
			{ name : "Cl" },
			{ name : "Cl" },//11
			{ name : "H" },//12
			{ name : "H" },
			{ name : "H" },
			{ name : "H" },
			{ name : "H" },
			{ name : "H" }//17
	],
	links : [
			{ source : 0, target : 1, point : 5 },
			{ source : 1, target : 2, point : 5 },
			{ source : 2, target : 3, point : 5 },
			{ source : 3, target : 4, point : 5 },
			{ source : 4, target : 5, point : 5 },
			{ source : 5, target : 0, point : 5 },
			{ source : 0, target : 12, point : 5 },
			{ source : 1, target : 13, point : 5 },
			{ source : 2, target : 14, point : 5 },
			{ source : 3, target : 15, point : 5 },
			{ source : 4, target : 16, point : 5 },
			{ source : 5, target : 17, point : 5 },
			{ source : 0, target : 6, point : 5 },
			{ source : 1, target : 7, point : 5 },
			{ source : 2, target : 8, point : 5 },
			{ source : 3, target : 9, point : 5 },
			{ source : 4, target : 10, point : 5 },
			{ source : 5, target : 11, point : 5 }
	]
};


var svgWidth = window.innerWidth;
var svgHeight = 480;
var svg = d3.select("#myGraph").append("svg")
	.attr("width", svgWidth)
	.attr("height", svgHeight);


// Force Layoutを設定
var force = d3.layout.force()
	.nodes(list.nodes)	// ノードを指定
	.links(list.links)	// ノードとノードを結ぶリンク線を指定
	.size([svgWidth, svgHeight])
	.linkDistance(80)//リンクの距離　ノード間のリンクの長さを指定
	.friction(0.9)//摩擦力　値が小さいほど収束が早い
    .charge(-500)//反発力-引力　マイナスだと反発する力、プラスの値だと引き合う力になる。
    .gravity(0.05)//重力　画面の中心に働く重力
    .start();



var link = svg.selectAll("line")
	.data(list.links)
	.enter()
	.append("line")
	.style("stroke", "#ddd")
	.style("stroke-width", function(d){ return d.point; });

var node = svg.selectAll("circle")
	.data(list.nodes)
	.enter()
	.append("circle")
	.attr("r", 30)
	.attr("fill","#fff")
	.style("stroke-width","2px")
	.style("stroke", "#fff")
	.call(force.drag);	
		
var label = svg.selectAll('text')
	.data(list.nodes)
    .enter()
    .append('text')
    .attr("text-anchor", "middle")
    .attr("fill", "#333")
    .attr("dy", ".35em")
    .style({"font-size":20})
    .text(function(d) { return d.name;});
	

force.on("tick", function() {
	link.attr("x1", function(d) { return d.source.x; })	
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; });
	node.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; });
   label.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
});
