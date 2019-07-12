function init(){
	var dropdowns = document.getElementsByClassName("dropdown");
	for(var i = 0; i < dropdowns.length; i++){
		dropdowns[i].onclick = function(){
			if(this.style.transform == "rotate(90deg)"){
				this.style.transform = "rotate(0deg)";
				this.nextElementSibling.nextElementSibling.style.display = "none";
			}else{
				this.style.transform = "rotate(90deg)";
				this.nextElementSibling.nextElementSibling.style.display = "block";
			}
		}
	}

	var input = document.getElementById("equation-input");
	var textarea = document.getElementById("id_textarea");
	var cursor = document.getElementById("cursor");

	textarea.innerHTML = "";

	input.addEventListener("keypress", function(event){
		//alert("code: " + event.keyCode + ", value: " + String.fromCharCode(event.keyCode));
		
		var character = String.fromCharCode(event.keyCode);
		
		var newNode = document.createElement("div");
		var newContent = document.createTextNode(character);
		/*if(event.keyCode == 94){
			newNode.className = "sup";
			newContent = document.createTextNode(" ");
			//alert(doGetCaretPosition(textarea));
		}else{*/
			newNode.className = "input-item";
		//}

		newNode.appendChild(newContent);

		insertAtCursor(newNode, character);

		textarea = document.getElementById("id_textarea");

		textarea.focus();

		
	});

	input.addEventListener("keydown", function(event){
		var classNum = Number(cursor.className);
		var prevNum = classNum;
		movement = false; //used to handle case where non-arrow key is entered
		//alert(classNum + ", " + (classNum+1));
		switch(event.keyCode){
			case 37: //left arrow key
				if(classNum > 1){
					classNum -= 1;
					cursor.className = classNum;
					classNum = -classNum;
					movement = true;
				}
				break;
			case 39: //right arrow key
				//"<span id=''></span>"
				if(classNum < input.children.length-1){
					classNum += 1;
					cursor.className = classNum;
					movement = true;
				}
				break;
			default:
				break;
		}

		if(classNum != prevNum && movement){
			//console.log("Here");
			moveCursor(classNum);
		}
	});

	input.addEventListener("keyup", function(event){
		//for(var i = 0; i < input.innerHTML.length; i++){
			//if(input.innerHTML[i] == '^'){
			//	input.innerHTML = input.innerHTML.substring(0,i) + "<div class='sup'>&nbsp;</div>&nbsp;" + input.innerHTML.substring(i+1,input.innerHTML.length);
			//}
		//}
	});

	setInterval(function(){
		cursor = document.getElementById("cursor");
		if(cursor.style.opacity == 0){
			cursor.style.opacity = 1;
		}else{
			cursor.style.opacity = 0;
		}
	}, 530);
}

function moveCursor(position){
	moveBack = false;
	if(position < 0){
		position *= -1;
		moveBack = true;
	}
	//console.log(position);
	var input = document.getElementById("equation-input");
	var inputItems = input.children;
	/*console.log("Start loop");
	for(var i = 0; i < inputItems.length; i++){
		console.log("id: " + inputItems[i].id + " class: " + inputItems[i].className);
	}*/
	for(var i = 1; i < inputItems.length; i++){
		//console.log(inputItems[i].className);
		if(inputItems[i].className == position){
			//alert(inputItems[i].innerHTML + ", " + inputItems[i+1].innerHTML);
			var tempContent = inputItems[i].innerHTML;
			//var tempClass = inputItems[i].className;
			changeAmount = (moveBack) ? -1 : 1;
			//console.log("Before: " + i + ", position:" + position + ", current: " + inputItems[i].className + ", " + inputItems[i + changeAmount].className);
			inputItems[i].innerHTML = inputItems[i + changeAmount].innerHTML;
			inputItems[i].className = inputItems[i + changeAmount].className;
			//console.log(i + ", position:" + position + ", current: " + inputItems[i].className + ", " + inputItems[i + changeAmount].className);
			inputItems[i].id = "";
			inputItems[i].style.opacity = 1;
			//alert(inputItems[i].innerHTML + ", " + inputItems[i+1].innerHTML);
			inputItems[i + changeAmount].innerHTML = tempContent;
			inputItems[i+changeAmount].className = position;
			inputItems[i+changeAmount].id = "cursor";
			i = inputItems.length;
			//alert(inputItems[i].innerHTML + ", " + inputItems[i+1].innerHTML);
		}
	}

	/*console.log("End loop");
	for(var i = 0; i < inputItems.length; i++){
		console.log("id: " + inputItems[i].id + " class: " + inputItems[i].className);
	}*/
}

function doGetCaretPosition (oField) {

	// Initialize
	var iCaretPos = 0;
  
	// IE Support
	if (document.selection) {
  
	  // Set focus on the element
	  oField.focus();
  
	  // To get cursor position, get empty selection range
	  var oSel = document.selection.createRange();
  
	  // Move selection start to 0 position
	  oSel.moveStart('character', -oField.innerHTML.length);
  
	  // The caret position is selection length
	  iCaretPos = oSel.text.length;
	}
  
	// Firefox support
	else if (oField.selectionStart || oField.selectionStart == '0')
	  iCaretPos = oField.selectionDirection=='backward' ? oField.selectionStart : oField.selectionEnd;
  
	// Return results
	return iCaretPos;
  }