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

test:
	python -m pytest

test-class:
	pytest -k $(class)

testprint:
	python -m pytest -s

test-cov:
	python -m pytest --cov

test-cov-detail:
	python -m pytest --cov-report term-missing --cov

collectstatic:
	python -m manage collectstatic

shell:
	python -m manage shell

create-env:
	echo 'DB_NAME=test_db_name' > .env && \
	echo 'DB_USER=postgres' >> .env && \
	echo 'DB_PASSWORD=postgres' >> .env && \
	echo 'DB_HOST=localhost' >> .env && \
	echo 'DB_PORT=5432' >> .env && \
	echo 'DJANGO_SECRET_KEY="super_secret_key_write_here"' >> .env && \
	echo 'DJANGO_DEBUG=1' >> .env && \
	echo 'DATABASE_ENGINE=postgresql' >> .env && \
	echo 'DJANGO_ALLOWED_HOSTS="127.0.0.1,http://localhost:3000/,localhost"' >> .env && \
	echo 'CSRF_TRUSTED_ORIGINS="http://127.0.0.1,http://localhost:3000/"' >> .env && \
	echo 'CORS_ALLOWED_ORIGINS="http://localhost:3000"' >> .env && \
	echo 'TOKEN_EXPIRE=7' >> .env && \
	echo 'REFRESH_TOKEN_EXPIRE=28' >> .env