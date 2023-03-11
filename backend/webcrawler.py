from hashlib import new
import os
from urllib import response
key = os.environ.get('API')
import json
import requests
from newspaper import Article
import nltk
from cgitb import text
nltk.download('vader_lexicon')
from nltk.sentiment.vader import SentimentIntensityAnalyzer
nltk.download('punkt')


key = '18dbac97e84a4b0891fd86ba11dcfec3'

def analyser(text):
    sid = SentimentIntensityAnalyzer()
    out = sid.polarity_scores(text)
    score = out['compound']
    if score>0:
        return 'positive'
    if score<0:
        return 'negative'
    else: 
        return 'neutral'

def summariser(url):
    article = Article(url)
    article.download()
    article.parse()
    article.nlp()
    return article.summary


def newsparser():
    dflt = "https://newsapi.org/v2/everything?q=donate&apiKey="
    link = dflt + key
    response = requests.get(link)
    news = {}
    a = response.json()
    
    for i in range(0,20):
        summary = summariser(a["articles"][i]['url'])
        summary = summary.strip('\n')
        summary = summary.strip('\u2019')

        ind = {
            'source': a["articles"][i]['url'],
            'url' : a["articles"][i]['url'],
            'img' : a["articles"][i]['urlToImage'],
            'summary' : summary,
            'sentiment' : analyser(summary)
        }
        if(ind['sentiment'] == 'positive'):
            news[str(i+1)] = ind
    with open("news.json", "w") as outfile:
        json.dump(news, outfile)  
    

def main():
    newsparser()
main()
