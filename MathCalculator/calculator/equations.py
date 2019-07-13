#import numpy as np
#import compiler

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
		counter -= 1
		i += 1

	print(equation)	
	returnString = ""
	try:
		#computedExpression = str(eval(equation))
		returnString = "$" + originalEquation + " = " + str(eval(equation)) + "$"
	except:
		returnString = "Error, unable to process the following  equation: $" + originalEquation + "$"
	
	return returnString

#def convertToReadable():
#	pass
