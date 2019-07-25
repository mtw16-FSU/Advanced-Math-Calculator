# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from .forms import MathForm

from .equations import *
#from equations import testEquationCalculator
#from .equation-solver import testEquationCalculator

def index(request):
	formattedEquation = ""
	if request.method == "POST":
		form = MathForm(request.POST)
		if form.is_valid():
			formattedEquation = testEquationCalculator(form.cleaned_data["textarea"])
	else:
		form = MathForm()
	return render(request, "index.html", {"form": form, "formattedEquation": formattedEquation})

def algebra(request):
	return render(request, "algebra.html")

def algebra_equations(request):
	return render(request, "equations.html")

def algebra_equations_system(request):
	formattedEquation = ""
	if request.method == "POST":
		form = MathForm(request.POST)
		if form.is_valid():
			pass
	else:
		form = MathForm()
	return render(request, "system.html", {"form": form, "formattedEquation": formattedEquation})

def algebra_equations_solve_equation(request):
	formattedEquation = ""
	if request.method == "POST":
		form = MathForm(request.POST)
		if form.is_valid():
			formattedEquation = solveForVariable(form.cleaned_data["textarea"])
	else:
		form = MathForm()
	return render(request, "solve-equation.html", {"form": form, "formattedEquation": formattedEquation})


def algebra_equations_expressions(request):
	formattedEquation = ""
	if request.method == "POST":
		form = MathForm(request.POST)
		if form.is_valid():
			formattedEquation = testEquationCalculator(form.cleaned_data["textarea"])
	else:
		form = MathForm()
	return render(request, "expressions.html", {"form": form, "formattedEquation": formattedEquation})


def algebra_slope(request):
	formattedEquation = ""
	if request.method == "POST":
		form = MathForm(request.POST)
		if form.is_valid():
			formattedEquation = testEquationCalculator(form.cleaned_data["textarea"])
	else:
		form = MathForm()
	return render(request, "slope.html", {"form": form, "formattedEquation": formattedEquation})

def algebra_graph(request):
	formattedEquation = ""
	if request.method == "POST":
		form = MathForm(request.POST)
		if form.is_valid():
			formattedEquation = testEquationCalculator(form.cleaned_data["textarea"])
	else:
		form = MathForm()
	return render(request, "graph.html", {"form": form, "formattedEquation": formattedEquation})

def algebra_composition(request):
	formattedEquation = ""
	if request.method == "POST":
		form = MathForm(request.POST)
		if form.is_valid():
			formattedEquation = testEquationCalculator(form.cleaned_data["textarea"])
	else:
		form = MathForm()
	return render(request, "composition.html", {"form": form, "formattedEquation": formattedEquation})

def algebra_partial_fractions(request):
	formattedEquation = ""
	if request.method == "POST":
		form = MathForm(request.POST)
		if form.is_valid():
			formattedEquation = testEquationCalculator(form.cleaned_data["textarea"])
	else:
		form = MathForm()
	return render(request, "partial-fractions.html", {"form": form, "formattedEquation": formattedEquation})

def calculus(request):
	return render(request, "calculus.html")

def calculus_derivatives(request):
	return render(request, "derivatives.html")

def calculus_derivatives_standard(request):
	formattedEquation = ""
	if request.method == "POST":
		form = MathForm(request.POST)
		if form.is_valid():
			formattedEquation = testEquationCalculator(form.cleaned_data["textarea"])
	else:
		form = MathForm()
	return render(request, "derivatives-standard.html", {"form": form, "formattedEquation": formattedEquation})

def calculus_derivatives_partial(request):
	formattedEquation = ""
	if request.method == "POST":
		form = MathForm(request.POST)
		if form.is_valid():
			formattedEquation = testEquationCalculator(form.cleaned_data["textarea"])
	else:
		form = MathForm()
	return render(request, "derivatives-partial.html", {"form": form, "formattedEquation": formattedEquation})


def calculus_integrals(request):
	return render(request, "integrals.html")

def calculus_integrals_indefinite(request):
	formattedEquation = ""
	if request.method == "POST":
		form = MathForm(request.POST)
		if form.is_valid():
			formattedEquation = testEquationCalculator(form.cleaned_data["textarea"])
	else:
		form = MathForm()
	return render(request, "integrals-indefinite.html", {"form": form, "formattedEquation": formattedEquation})

def calculus_integrals_definite(request):
	formattedEquation = ""
	if request.method == "POST":
		form = MathForm(request.POST)
		if form.is_valid():
			formattedEquation = testEquationCalculator(form.cleaned_data["textarea"])
	else:
		form = MathForm()
	return render(request, "integrals-definite.html", {"form": form, "formattedEquation": formattedEquation})

def calculus_graphical(request):
	return render(request, "graphical.html")

def calculus_limits(request):
	formattedEquation = ""
	if request.method == "POST":
		form = MathForm(request.POST)
		if form.is_valid():
			formattedEquation = testEquationCalculator(form.cleaned_data["textarea"])
	else:
		form = MathForm()
	return render(request, "limits.html", {"form": form, "formattedEquation": formattedEquation})
