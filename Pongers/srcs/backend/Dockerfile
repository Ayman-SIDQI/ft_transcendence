FROM python:3.13.0-bookworm

EXPOSE 8000

WORKDIR /app

COPY backend/requirements.txt /app/

RUN pip install --upgrade pip && pip install -r requirements.txt

# COPY backend/apps /app/

# RUN python manage.py makemigrations && python manage.py migrate
