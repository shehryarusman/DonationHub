from flask import Flask, jsonify
import pandas as pd
import numpy as np
import random
import pickle
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello World!'

def func(x):
    return 27*np.sin(x/43) + 53 + 10*np.sin(x)/5

def expected(x, poverty):
    if poverty == 0:
        poverty = 1000
    return int(func(x)*5*(poverty/24376))

def getDailyTemps(latitude, longitude):
  start_date = '2022-03-01'
  end_date = '2023-03-01'

  endpoint = f'https://archive-api.open-meteo.com/v1/archive?latitude={latitude}&longitude={longitude}&start_date={start_date}&end_date={end_date}&daily=temperature_2m_mean&timezone=America%2FNew_York&temperature_unit=fahrenheit'

  api_key = 'YOUR_API_KEY'
  headers = {'Authorization': f'Bearer {api_key}'}

  response = requests.get(endpoint, headers=headers)
  data = response.json()
  return data["daily"]["temperature_2m_mean"]

def getLocalX_test(id, lat, longitude, zipcode):
    X = []
    poverty = pd.read_csv("datasets/Philadelphia-CensusZipCodeTabulationArea.csv")["Value:Count_Person_BelowPovertyLevelInThePast12Months"][id]
    for i in range(0, 365):
        X.append(expected(i, poverty))
    
    for t in getDailyTemps(lat, longitude):
        X.append(t)
    X.pop()
    X.append(poverty)
    X.append(zipcode)
    #print(len(X), X)
    return np.array(X)

@app.route('/centers', methods=['GET'])
def mlbackend():
    model = pickle.load(open("TodayNeedPredictor.sav", "rb"))
    i=0
    response = {}
    lat=""
    longitude=""
    data = pd.read_csv('datasets/cleaned_data.csv')
    currentId = ""
    for latlon in data["LatLon"]:
        currentId = i
        print(currentId)
        lat = latlon.split(',')[1]
        longitude = latlon.split(',')[0]
        hours=""
        if data["Time: Open"][i] == "Contact for Hours":
            hours = "Contact for Hours"
        else:
            hours = data["Time: Open"][i] + "-" + data["Time: Close"][i]
        
        need = int(model.predict(getLocalX_test(currentId, lat, longitude, data["Zip Code"][i]).reshape(1, -1))[0])
        response[i]= {"lat": lat, 
                "long": longitude, 
                "need": need,
                "current-stock": random.randint(0,50),
                "contact-name": data["Organization Name"][i], 
                "contact-address": data["Address"][i], 
                "contact-hours": hours,
                "contact-phone": data["Phone Number"][i]}
        i+=1

    return jsonify(response)

@app.route('/news', methods = ['GET'])
def get_posts():
    with open("news.json", "r") as json_file:
        json_data = json.load(json_file)
    return jsonify(json_data)


if __name__ == '__main__':
    app.run("debug=True")