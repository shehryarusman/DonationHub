from flask import Flask, jsonify
import pandas as pd
import pickle

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello World!'

@app.route('/centers', methods=['GET'])
def mlbackend():
    i=0
    response = {}
    lat=""
    longitude=""
    data = pd.read_csv('clean_datasets/cleaned_data.csv')
    for latlon in data["LatLon"]:
        lat = latlon.split(',')[1]
        longitude = latlon.split(',')[0]
        hours = ""
        if data["Time: Open"][0] == "Contact for Hours":
            hours = "Contact for Hours"
        else:
            hours = data["Time: Open"][0] + "-" + data["Time: Close"][0]
            
        response[i]= {"lat": lat, 
                "long": longitude, 
                "need": ,
                "current stock": ,
                "contact name": data["Organization Name"][i], 
                "contact address": data["Address"][i], 
                "contact hours": hours}
        i+=1

    return jsonify(response)

if __name__ == '__main__':
    app.run("debug=True")