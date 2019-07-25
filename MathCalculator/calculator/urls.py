from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('algebra/', views.algebra, name="algebra"),
    path('algebra/equations', views.algebra_equations, name="algebra_equations"),
    path('algebra/equations/solve-equation', views.algebra_equations_solve_equation, name="algebra_equations_solve_equation"),
    path('algebra/equations/system', views.algebra_equations_system, name="algebra_equations_system"),
path('algebra/equations/evaluate-expression', views.algebra_equations_expressions, name="algebra_equations_expressions"),
    path('algebra/slope', views.algebra_slope, name="algebra_slope"),
    path('algebra/graph', views.algebra_graph, name="algebra_graph"),
    path('algebra/function-composition', views.algebra_composition, name="algebra_composition"),
    path('algebra/partial-fractions', views.algebra_partial_fractions, name="algebra_partial_fractions"),
    path('calculus', views.calculus, name="calculus"),
    path('calculus/derivatives', views.calculus_derivatives, name="calculus_derivatives"),
    path('calculus/derivatives/standard', views.calculus_derivatives_standard, name="calculus_derivatives_standard"),
    path('calculus/derivatives/partial', views.calculus_derivatives_partial, name="calculus_derivatives_partial"),
    path('calculus/integrals', views.calculus_integrals, name="calculus_integrals"),
    path('calculus/integrals/indefinite', views.calculus_integrals_indefinite, name="calculus_integrals_indefinite"),
    path('calculus/integrals/definite', views.calculus_integrals_definite, name="calculus_integrals_definite"),
    path('calculus/graphical', views.calculus_graphical, name="calculus_graphical"),
    path('calculus/limits', views.calculus_limits, name="calculus_limits")
]
