from flask import Flask,jsonify 


@app.route('/news', methods = ['GET'])
def get_posts():
    f = open('news.json')
    return jsonify(f)

app = Flask(__name__)