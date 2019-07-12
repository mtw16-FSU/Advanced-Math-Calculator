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
		print("####Has been posted####")
		if form.is_valid():
			print("####Valid form####")
			formattedEquation = testEquationCalculator(form.cleaned_data["textarea"])
	else:
		print("#####Has NOT been posted####")
		form = MathForm()
	return render(request, "index.html", {"form": form, "formattedEquation": formattedEquation})

def algebra_equations(request):
	return render()
