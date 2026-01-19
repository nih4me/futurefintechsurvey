## FutureFinTech : Fellow Survey

### Project structure
```text
futurefintechsurvey/
├── .gitignore
├── backend/
│   ├── app/
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── export.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── routers.py
│   │   ├── schemas.py
│   │   └── utils.py
│   ├── requirements.txt
│   └── schema.sql
├── futurefintech_form.js
├── index.html
└── style.css
```

### Requirements
- Python 3.9+

### Instructions for deployment

1. Backend/API
```sh
git clone <this-repository> # Clone the project
cd futurefintech/backend
pip install -r requirements.txt # Install requirements
cd app
uvicorn main:app --host 0.0.0.0 --port $PORT # Start the api
```

2. Frontend

- Update the `BASE_URL` in `futurefintech/futurefintech_form.js`
- Serve `futurefintech/index.js`, `futurefintech/style.js`, `futurefintech/futurefintech_form.js` files in any HTTP server (Apache, Nginx...)