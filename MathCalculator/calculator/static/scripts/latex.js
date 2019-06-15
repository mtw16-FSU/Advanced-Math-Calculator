function printLatex(){
	var input = document.getElementById("equation-input");
	var display = document.getElementById("equation-display");
	display.innerHTML = "$" + input.value + "$";
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}
