from fastapi import FastAPI 
from pydantic import BaseModel
import joblib, numpy as np
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException




import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_methods=["*"],
    allow_headers=["*"],
)


model = joblib.load(os.path.join(BASE_DIR, 'model.pkl'))
scaler = joblib.load(os.path.join(BASE_DIR, 'scaler.pkl'))

class HouseInput(BaseModel):
    avg_area_income:           float
    avg_area_house_age:        float
    avg_area_number_of_rooms:  float
    avg_area_number_of_bedrooms: float
    area_population:             float



@app.post('/predict')
def predict(data: HouseInput):
    try:                                          # fix 4: proper indentation
        features = np.array([[
            data.avg_area_income,
            data.avg_area_house_age,
            data.avg_area_number_of_rooms,
            data.avg_area_number_of_bedrooms,
            data.area_population
        ]])
        scaled = scaler.transform(features)
        price  = model.predict(scaled)[0]
        return {"predicted_price": round(float(price), 2)}  # fix 3: round not roud
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))