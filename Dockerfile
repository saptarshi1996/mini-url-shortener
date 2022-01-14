FROM python:3.10.0

WORKDIR /app

COPY . ./

RUN pip install -r requirements.txt

EXPOSE 3306 6379 8000
