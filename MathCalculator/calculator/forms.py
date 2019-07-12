from django import forms
from .models import Post

class MathForm(forms.ModelForm):
	class Meta:
		model = Post
		fields = ('textarea',)
		#fields = ('text','textarea')	
		#fields = ('textarea',) 
