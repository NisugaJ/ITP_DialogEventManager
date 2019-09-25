window.onload = function () {

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2", // "light1", "light2", "dark1", "dark2"
	title: {
		text: "Poll 1"//titile of the graph
	},
	axisY: {
		title: " Numbers of votes (in %)",
		suffix: "%",
		includeZero: false
	},
	axisX: {
		title: "Type"
	},
	data: [{
		type: "column",
		yValueFormatString: "#,##0.0#\"%\"",
		dataPoints: [
			{ label: "Good", y: 9.1 },	
			{ label: "Bad", y: 6.70 },	
			
			
		]
	}]
});
chart.render();

}