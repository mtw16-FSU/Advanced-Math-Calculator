function printLatex(){
	var input = document.getElementById("equation-input");
	var textarea = document.getElementById("id_textarea");
	var display = document.getElementById("equation-display");

	display.innerHTML = "$" + textarea.innerHTML + "$";
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);	
}

function insertSymbol(symbolID){
	var input = document.getElementById("equation-input");
	var symbol = document.getElementById(symbolID);

	var newNode = document.createElement("div");
	var newContent = document.createTextNode(symbol.innerHTML);

	newNode.className = "input-item";
	newNode.appendChild(newContent);

	insertAtCursor(newNode, symbol.innerHTML);

	var textarea = document.getElementById("id_textarea");
	textarea.focus();
}


function insertAtCursor(newNode, character){

	var input = document.getElementById("equation-input");
	var textarea = document.getElementById("id_textarea");
	var cursor = document.getElementById("cursor");

	var inputItems = input.children;
	var found = false;
		for(var i = 1; i < inputItems.length-1; i++){
			if(inputItems[i].id == "cursor"){
				input.insertBefore(newNode, inputItems[i+1]);
				//necessary to update which element is the cursor element
				cursor = document.getElementById("cursor");
				cursor.className = i+1;
				//console.log("Before");
				moveCursor(i+1);
				textarea.innerHTML = textarea.innerHTML.substring(0,i-1) + character + textarea.innerHTML.substring(i-1,textarea.innerHTML.length) ;
				//console.log("In here: " + textarea.innerHTML);
				//console.log("After");
				found = true;
				i = inputItems.length;
				//console.log("i: " + i + " out of " + inputItems.length);
			}
		}
		if(!found){
			//console.log("Not found");
			input.appendChild(newNode);
			//console.log("Not found: " + inputItems.length);
			cursor = document.getElementById("cursor");
			cursor.className = inputItems.length-1;
			moveCursor(inputItems.length-1);
			textarea.innerHTML += character;
		}
}