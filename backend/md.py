import numpy as np
from sklearn.linear_model import LinearRegression
import joblib

# Step 1: Generate dummy data
# Assume: price = 100 * area + 5000 (some made-up formula)
land_area = np.array([500, 750, 1000, 1200, 1500, 2000, 2500]).reshape(-1, 1)
price = np.array([55000, 62500, 70000, 74000, 80000, 90000, 100000])

# Step 2: Train linear regression model
model = LinearRegression()
model.fit(land_area, price)

# Step 3: Save the model to disk
joblib.dump(model, "land_price_model.pkl")

print("Model trained and saved as land_price_model.pkl")
