(function(){

var data = {
	normalRisk: 0.01,
	testAccuracy: 0.8
};

var COUNT = 1000;
var forwards = function(data){
	data.positiveTestRisk = 
		(data.testAccuracy * data.normalRisk) /
		(data.testAccuracy * data.normalRisk + (1-data.testAccuracy)*(1-data.normalRisk));

	var positive = COUNT * data.normalRisk;
	data.truePositives = positive * data.testAccuracy;
	data.falseNegatives = positive - data.truePositives;
	data.trueNegatives = (COUNT - positive) * data.testAccuracy;
	data.falsePositives = (COUNT - positive) * (1 - data.testAccuracy);
	return data;
};

var dots = function(n){
	var r = "";
	for(var i=0; i<n; i++)
		r = r + "<span class='dot'></span>";
	return r;
};

var render = function(data){
	["truePositives", "falsePositives", "trueNegatives", "falseNegatives"].forEach(function(set){
		var el = document.querySelectorAll("."+set)[0];
		el.innerHTML = dots(data[set]);
	});
};

render(forwards(data));

})();