moving = "";
movement = false;
//numBoxes = 0;
cursorCurrentParent = "equation-input";

function initAlt(id){
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

	var menu = document.getElementById(id);
	menu.style.color = "#fff000";
	menu.previousElementSibling.style.transform = "rotate(90deg)";
	menu.nextElementSibling.style.display = "block";
}

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

	cursorCurrentParent = "equation-input";

	var input = document.getElementById("equation-input");
	var textarea = document.getElementById("id_textarea");
	var cursor = document.getElementById("cursor");

	textarea.innerHTML = "";

	input.addEventListener("keypress", function(event){
		//alert("code: " + event.keyCode + ", value: " + String.fromCharCode(event.keyCode));
		cursor = document.getElementById("cursor");

		var character = String.fromCharCode(event.keyCode);
		
		var newNode = document.createElement("div");
		var newContent = document.createTextNode(character);
		if(event.keyCode == 94){
			newInnerNode = document.createElement("div");
			newInnerNode.className = "input-item";
			newNode.className = "sup";
			newNode.id = "sup-" + cursor.className;
			newNode.appendChild(newInnerNode);
			character = "^{}";
			//newContent = document.createTextNode(" ");
			//alert(doGetCaretPosition(textarea));
		}else{
			newNode.className = "input-item";
			newNode.appendChild(newContent);
		}


		insertAtCursor(newNode, character); //type

		textarea = document.getElementById("id_textarea");

		textarea.focus();

		
	});

	input.addEventListener("keydown", function(event){
		cursor = document.getElementById("cursor");
		var classNum = Number(cursor.className);
		var prevNum = classNum;
		movement = false; //used to handle case where non-arrow key is entered
		//alert(classNum + ", " + (classNum+1));
		switch(event.keyCode){
			case 37: //left arrow key
				if(classNum > 1 || cursorCurrentParent != "equation-input"){
					classNum -= 1;
					cursor.className = classNum;
					classNum = -classNum;
					movement = true;
				}
				break;
			case 39: //right arrow key
				if(classNum < input.children.length-1 || cursorCurrentParent != "equation-input"){
					classNum += 1;
					cursor.className = classNum;
					movement = true;
				}
				break;
			case 8: //backspace key
				classNum = removeItem(classNum);
				break;
			default:
				break;
		}

		if(classNum != prevNum && movement){
			//console.log("Here");
			//moving = setInterval(moveCursor, 100);
			moveCursor(classNum);
		}
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
//console.log("Start of move: " + position);
	//cursorParent = "equation-input";

	newId = false;

	moveBack = false;
	if(position < 0){
		position *= -1;
		moveBack = true;
	}
	//console.log(position);
	//var input = document.getElementById("equation-input");
	var input = document.getElementById(cursorCurrentParent);
	console.log(input.id);
	var inputItems = input.children;

	if(cursorCurrentParent.substring(0,3) == "num" && position >= inputItems.length){
		cursorCurrentParent = "den-" + cursorCurrentParent.substring(4,cursorCurrentParent.length);
		console.log("numerator switch: " + cursorCurrentParent);

		newInputItems = document.getElementById(cursorCurrentParent).parentElement.children[1];
		newPosition = 1;
		cursorPosition = (position < 1) ? 1 : inputItems.length - 1;

		//console.log();
		newInputItems.insertBefore(inputItems[cursorPosition], newInputItems.children[newPosition]);
		var cursor = document.getElementById("cursor");
		cursor.className = newPosition;		

	}else if(cursorCurrentParent.substring(0,3) == "den" && position < 1){
		cursorCurrentParent = "num-" + cursorCurrentParent.substring(4,cursorCurrentParent.length);

		newInputItems = document.getElementById(cursorCurrentParent).parentElement.children[0];
		newPosition = newInputItems.children.length;
		cursorPosition = 1;

		console.log("Heyah: " + newPosition);
		newInputItems.appendChild(inputItems[cursorPosition]);
		var cursor = document.getElementById("cursor");
		cursor.className = newPosition;		

	}else if(position < 1 || position >= inputItems.length){
		cursorCurrentParent = "equation-input";
		newInputItems = document.getElementById(cursorCurrentParent);
		newPosition = Number(input.id.substring(4,input.id.length));

		newPosition = (position < 1) ? newPosition : newPosition+1;
		cursorPosition = (position < 1) ? 1 : inputItems.length - 1;

		if(input.className == "sup"){
			input.style.border = "none";
		}

		newInputItems.insertBefore(inputItems[cursorPosition], newInputItems.children[newPosition]);
		//console.log("new cursor pos: " + input.id.substring(4,input.id.length));
		var cursor = document.getElementById("cursor");
		cursor.className = newPosition;
		return "";
	}


	for(var i = 1; i < inputItems.length; i++){
		//console.log(inputItems[i].className);		
		changeAmount = (moveBack) ? -1 : 1;
		if(inputItems[i].className == position && inputItems[i + changeAmount].className == "sup"){ //exponentials
			inputItems[i].className = (!moveBack) ? "1" : inputItems[i+changeAmount].children.length;
			//console.log(inputItems[i].className + ", " + inputItems[i+changeAmount].children.length);
			if(moveBack){
				inputItems[i+changeAmount].appendChild(inputItems[i]);
			}else{
				if(inputItems[i+changeAmount].children.length <= 1){
					inputItems[i+changeAmount].appendChild(inputItems[i]);
				}else{
					inputItems[i+changeAmount].insertBefore(inputItems[i], inputItems[i+changeAmount].children[1]);
				}
				
				//console.log(inputItems[i][0].className);
			}
			
			smallOffset = (moveBack) ? -1 : 0;

			cursorCurrentParent = inputItems[i+smallOffset].id;
			inputItems[i+smallOffset].style.border = "2px solid darkgreen";
			//console.log("new id: " +cursorCurrentParent);
			newId = true;

			i = inputItems.length;
			//input.removeChild(inputItems[i]);
		}else if(inputItems[i].className == position && inputItems[i + changeAmount].className == "fraction"){ //fraction
			console.log("Should go into numerator");
			numChild = (!moveBack) ? 0 : 1;
			inputItems[i].className = (!moveBack) ? "1" : inputItems[i+changeAmount].children[numChild].children.length;

			if(moveBack){
				inputItems[i+changeAmount].children[numChild].appendChild(inputItems[i]);
			}else{
				if(inputItems[i+changeAmount].children[numChild].children.length <= 1){
					inputItems[i+changeAmount].children[numChild].appendChild(inputItems[i]);
				}else{
					inputItems[i+changeAmount].children[numChild].insertBefore(inputItems[i], inputItems[i+changeAmount].children[numChild].children[1]);
				}
			}

			smallOffset = (moveBack) ? -1 : 0;

			cursorCurrentParent = inputItems[i+smallOffset].children[numChild].id;
			//inputItems[i+smallOffset].style.border = "2px solid darkgreen";
			console.log(inputItems[i+smallOffset].children[numChild].className);
			console.log("new id: " +cursorCurrentParent);
			newId = true;

			i = inputItems.length;
		}else if(inputItems[i].className == position){
			
			var tempContent = inputItems[i].innerHTML;
			
			changeAmount = (moveBack) ? -1 : 1;
			
			inputItems[i].innerHTML = inputItems[i + changeAmount].innerHTML;
			inputItems[i].className = inputItems[i + changeAmount].className;
			
			inputItems[i].id = "";
			inputItems[i].style.opacity = 1;
			
			inputItems[i + changeAmount].innerHTML = tempContent;
			inputItems[i+changeAmount].className = position;
			inputItems[i+changeAmount].id = "cursor";

			//console.log("Inside move: " + inputItems[i].className + ", " + inputItems[i+changeAmount].className);
			i = inputItems.length;

			//alert(inputItems[i].innerHTML + ", " + inputItems[i+1].innerHTML);
		}
	}

	//if(!newId){
		//cursorCurrentParent = "equation-input";
	//}
	return "";
}

function removeItem(position){
	//var input = document.getElementById("equation-input");
	var input = document.getElementById(cursorCurrentParent);
	var inputItems = input.children;

	if(position == 1){
		return position;
	}

	for(var i = 1; i < inputItems.length; i++){
		if(inputItems[i].className == position){
			input.removeChild(inputItems[i-1]);

			inputItems[i-1].className = i-1;
			position = i-1;

			if(i < inputItems.length){
				if(inputItems[i].className == "sup"){
					//console.log("SKREEEE");
					inputItems[i].id = "sup-" + (i-1);
				}else if(inputItems[i].className == "fraction"){
					inputItems[i].id = "frac-" + (i-1);
					inputItems[i].children[0].id = "num-" + (i-1);
					inputItems[i].children[1].id = "den-" + (i-1);
				}
			}

			interpretEquation();
			//console.log("position");
			return position;
		}
	}

	return 1; //should never be reached
}

function shiftContainers(position, direction){
	var inputItems = document.getElementById("equation-input").children;

	for(var i = position; i < inputItems.length; i++){
		if(inputItems[i].className == "sup"){
			newPosition = Number(inputItems[i].id.substring(4,inputItems[i].id.length));
			newPosition += direction;
			inputItems[i].id = "sup-" + newPosition;
			console.log("INNNNN");
		}else if(inputItems[i].className == "fraction"){
			newPosition = Number(inputItems[i].id.substring(5,inputItems[i].id.length));
			newPosition += direction;
			inputItems[i].id = "frac-" + newPosition;
			inputItems[i].children[0].id = "num-" + newPosition;
			inputItems[i].children[1].id = "den-" + newPosition;
		}
	}
}