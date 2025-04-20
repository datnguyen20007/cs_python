Land price prediction base on land area

Process:
1. Frontend send land_area value to backend via API
Frontend port = 3000
2. Backend receive the request at
IP=127.0.0.1
Port=5000
3. Backend call the trained AI model and predict land price
4. Backend send the land_price to the frontend
5. Frontend display the land_price.

Simple demo using frontend, backend, API
# A. Train the AI model for land price prediction
1. Go to cd backend
2. python md.py
# B. Start the backend
1. python main.py
# C. Start the frontend
1. Open new Terminal
2. cd frontend
3. Edit ReactJS code in src/App.js
4. npm start
