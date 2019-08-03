<h1>Master Calcuator</h1>

(The link to the website running the code in this repository is <a href="https://advanced-math-calculator.herokuapp.com/">https://advanced-math-calculator.herokuapp.com/</a>)

<h2>Team Members</h2>
<ul>
	<li>Matthew Wix
		<ul>
			<li>User interface and website deisgn</li>
			<li>Backend setup (connection with Django, deployment on Heroku)</li>
			<li>Algebra and Linear Algebra solvers</li>
		</ul>
	</li>
	<li>Vivian Martinez
		<ul>
			<li>Webpage setup and content</li>
			<li>Calculus and ODE solvers</li>
		</ul>
	</li>
</ul>

<h2>Goal</h2>
<p>Our Master Calculator seeks to solve mathematical equations of college level difficulty while providing a clean and intuitive interface for users. We also seek to format all input and output in a LaTex format so as to improve readability.</p>

<h2>Libraries</h2>
<ul>
	<li>Django - backend server development. Provided a means of retrieving user input and processing it with other Python libraries.</li>
	<li>Sympy - mathematical library for solving symbolic equations.</li>
	<li>MathJax - JavaScript library that interprets and compiles LaTex expressions.</li>
</ul>

<h2>Other Resources</h2>
<ul>
	<li>Heroku - web server used to deploy our application.</li>
</ul>

<h2>Application Usage</h2>
<p>Our application running on our Heroku web server has an intuitive interface that allows users to enter their equations and produces the result. For downloading and running our application locally, the following commands should be entered after downlaoding and extracting the files in our repository (in order):</p>
<p><strong>Note: the file paths referenced are from the root directory of the application i.e "/" = root directory of the application</strong></p>
<ol>
	<li>File path: / Command: . env/bin/activate </li>
	<li>File path: /MathCalculator Command: python manage.py runserver</li>
</ol>
<p>If the steps were performmed correctly, the application should be running at the following address: <a href="http://127.0.0.1:8000/">http://127.0.0.1:8000/</a></p>
