window.onload = function () {
	
	let good = innerHTML = localStorage.getItem("graphGood")
	let bad = innerHTML = localStorage.getItem("graphBad")

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2", // "light1", "light2", "dark1", "dark2"
	title: {
		text: innerHTML = localStorage.getItem("graphQuestion")//titile of the graph
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
			{ label: "Good", y: parseFloat(good) },	
			{ label: "Bad", y: parseFloat(bad) },
			
		]
	}]
});
chart.render();

}