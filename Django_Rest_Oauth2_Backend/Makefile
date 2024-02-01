runserver:
	python manage.py runserver

install:
	pip install -r requirements.txt

makemigrations:
	python manage.py makemigrations

migrate:
	python manage.py migrate

createsuperuser:
	python manage.py createsuperuser

startapp:
	cd apps && django-admin startapp $(app)

flake:
	cd api && flake8

collectstatic:
	python -m manage collectstatic

shell:
	python -m manage shell