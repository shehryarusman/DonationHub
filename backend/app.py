from flask import Flask, jsonify
import pandas as pd
import numpy as np
import random
import pickle
import json

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

def getLocalX_test(id):
    X = []
    poverty = pd.read_csv("datasets/content/Philadelphia-CensusZipCodeTabulationArea.csv")["Value:Count_Person_BelowPovertyLevelInThePast12Months"][id]

    expectedNeed = []
    for i in range(0, 365):
        yearn = []
        yearn.append(expected(i, ))
        expectedNeed.append(yearn)

    return X

@app.route('/centers', methods=['GET'])
def mlbackend():
    model = pickle.load("TodayNeedPredictor.sav")
    i=0
    response = {}
    lat=""
    longitude=""
    data = pd.read_csv('datasets/cleaned_data.csv')
    currentId = ""
    for latlon in data["LatLon"]:
        currentId = data["Id"]
        lat = latlon.split(',')[1]
        longitude = latlon.split(',')[0]
        hours=""
        if data["Time: Open"][i] == "Contact for Hours":
            hours = "Contact for Hours"
        else:
            hours = data["Time: Open"][i] + "-" + data["Time: Close"][i]
        
        need = int(model.predict(getLocalX_test(currentId).reshape(1, -1))[0])
        response[i]= {"lat": lat, 
                "long": longitude, 
                "need": need,
                "current-stock": random.randin(0,50),
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