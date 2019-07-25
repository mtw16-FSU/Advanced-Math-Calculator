#import numpy as np
#import compiler
import sympy as sp

def testEquationCalculator(equation):
	print("#",equation,"#")
	#x = np.float32(1.0)
	#print(x)
	#print(compiler.parse(""))
	#print(eval(equation))
	#print(eval("52-21"))

	#temporary fix to get powers of numbers working
	originalEquation = equation	

	counter = len(equation)
	i = 0
	while counter > 0:
		if equation[i] == "^":
			equation = equation[0:i] + "**" + equation[i+1:len(equation)]
			counter += 1
		elif equation[i] == "{":
			equation = equation[0:i] + "(" + equation[i+1:len(equation)]		
		elif equation[i] == "}":
			equation = equation[0:i] + ")" + equation[i+1:len(equation)]		

		counter -= 1
		i += 1

	print(equation)	
	returnString = ""
	try:
		#computedExpression = str(eval(equation))
		returnString = "$" + originalEquation + " = " + str(eval(equation)) + "$"
	except:
		print("Error")
		returnString = "Error, unable to process the following  equation: $" + originalEquation + "$"
	
	return returnString

def solveForVariable(equation):
	print("Untouched equation:",equation)
	formattedEquation = formatInput(equation)
	print("Formatted equation:",formattedEquation)
	
	terms = parseTerms(formattedEquation)
	print("Terms:",terms)
	#formattedEquation = formatSolveInput(formattedEquation)

	equalityOperator = "="
	
	for i in range(0,len(formattedEquation)):
		if formattedEquation[i] == "=" or formattedEquation[i] == "≤" or formattedEquation[i] == "≥":
			equalityOperator = formattedEquation[i]
			formattedEquation = formattedEquation[0:i] + "-(" + formattedEquation[i+1:len(formattedEquation)] + ")"
			i = len(formattedEquation)
	
	print("Formatted equation after:",formattedEquation)
	variables = getVariables(formattedEquation)
	print("variables:",variables)
	for v in variables:
		sp.var(v)
	
	returnString = ""
	try:
		result = sp.solve(formattedEquation, x)
		print("result:",result)
		returnString = "x " + equalityOperator + " "
		for answer in result:
			print("answer:",answer)
			returnString += str(answer) + ", "
		print("return string before:",returnString)
		returnString = returnString[0:len(returnString)-2]
		returnString = formatLaTex(returnString)
	except:
		print("Here?")
		returnString = equation + " No solution"
	
	return returnString

def getVariables(equation):
	variables = []
	for x in equation:
		tracked = False
		for v in variables:
			if x == v:
				tracked = True
		if not tracked and x.isalpha():
			variables.append(x)
	
	return variables

def formatInput(equation):
	counter = len(equation)
	i = 0
	while counter > 0:
		print(equation[i], counter)
		if equation[i].isdigit() and equation[i+1].isalpha():
			equation = equation[0:i+1] + "*" + equation[i+1:len(equation)]
			counter += 1
		elif equation[i] == "^":
			equation = equation[0:i] + "**" + equation[i+1:len(equation)]
			counter += 1
		elif equation[i] == "{":
			equation = equation[0:i] + "(" + equation[i+1:len(equation)]		
		elif equation[i] == "}":
			equation = equation[0:i] + ")" + equation[i+1:len(equation)]		
		
		counter -= 1
		i += 1
		if i == len(equation)-1:
			if equation[i] == "}":
				equation = equation[0:i] + ")"
			counter = 0

	print("Inside:",equation)
	return equation
	

def formatSolveInput(equation):
	"""reversedPart = ""
	for x in equation:
		if x == "=":
			reversedPart = getReversedValues(equation[i:len(equation)])

	returnString = equation	

	return returnString"""
	pass
			

def getReversedValues(equation):
	firstTerm = True
	returnString = ""
	for i in range(0,len(equation)):
		j = 0
		if firstTerm:
			if equation[i] == "-":
				firstTerm = "+"
			else:
				pass
			while j != len(equation):
				#if
				j += 1
			
			firstTerm = False
		else:
			pass

def parseTerms(equation):
	terms = []
	currentTerm = ""
	for i in range(0,len(equation)):
		if isOperator(equation[i]):
			if currentTerm == "":
				terms.append(equation[i])
			else:
				terms.append(currentTerm)
				terms.append(equation[i])
			currentTerm = ""
		else:
			currentTerm += equation[i]
	
	if currentTerm != "":
		terms.append(currentTerm)

	return terms

def isOperator(character):
	if not character.isdigit() and not character.isalpha():
		return True

	return False
	"""if (character == "+" or character == "-" or character == "*" or
	character == "/" or character == "<" or character == "=" or
	character == ">" or character == "(" or character == ")"):
		pass"""

def formatLaTex(equation):
	terms = parseTerms(equation)
	print("inside format latex")
	for i in range(0,len(terms)):
		print(i)
		if terms[i] == "sqrt":
			terms[i] = "\sqrt"
			i += 1
			terms[i] = "{"
			numRightParenthesis = 1
			oldPosition = i
			while numRightParenthesis > 0:
				i += 1
				if terms[i] == ")":
					numRightParenthesis -= 1
				elif terms[i] == "(":
					numRightParenthesis += 1
			terms[i] = "}"
			i = oldPosition
		elif terms[i] == "I":
			terms[i] = "i"
		elif terms[i] == "pi":
			terms[i] = "{\pi}"
		elif terms[i] == "*":
			if terms[i+1] == "*":
				terms[i] = "^"
				terms[i+1] = "{"
				terms[i+2] = ""
				i += 2
				numRightParenthesis = 1
				oldPosition = i
				while numRightParenthesis > 0:
					i += 1
					if terms[i] == ")":
						numRightParenthesis -= 1
					elif terms[i] == "(":
						numRightParenthesis += 1
				terms[i] = "}"
				i = oldPosition
			elif terms[i + 1].isalpha():
				terms[i] = ""


	returnString = "".join(terms)	
	print("Fixed:",returnString)
	return "$" + returnString + "$"
