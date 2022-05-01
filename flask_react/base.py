
#Flask 
import requests
from flask import Flask
from flask import request
import json
api = Flask(__name__)

#Spotify Imports
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

#Genius Imports
from bs4 import BeautifulSoup
import requests
import re
import os

#Watson Imports
from ibm_watson import ToneAnalyzerV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

#MongoDB 
import pymongo
import random
from flask_pymongo import PyMongo
from pymongo import MongoClient
MONGO_URI = 'mongodb+srv://sweproject:AUTH@cs411.gjdy6.mongodb.net/artworks?retryWrites=true&w=majority'
client = MongoClient(MONGO_URI)

CLIENT_ID = 'AUTH'
CLIENT_SECRET = 'AUTH'
AUTH_URL = 'https://accounts.spotify.com/api/token'

# POST
auth_response = requests.post(AUTH_URL, {
    'grant_type': 'client_credentials',
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET,
})

# convert the response to JSON
auth_response_data = auth_response.json()
# save the access token
access_token = auth_response_data['access_token']
headers = {
    'Authorization': 'Bearer {token}'.format(token=access_token)
}

@api.route('/song')
def my_song(track_id):
    # track ID should be from the spotify URI
    # base URL of all Spotify API endpoints
    BASE_URL = 'https://api.spotify.com/v1/'
    # actual GET request with proper header
    r = requests.get(BASE_URL + 'audio-features/' + track_id, headers=headers)
    r = r.json()
    # print(r)
    return r

@api.route('/search')
def search():
    songname = request.args.get('songname', default = "Sorry", type = str)
    artistname = request.args.get('artistname', default = "Justin Bieber", type = str)
    SEARCH_URL = 'https://api.spotify.com/v1/search'
    # create and fill dictionary with parameters for spotify search API GET request
    # parameters: search for keyword in titles of tracks, top 50 results in US market
    myparams = {}
    myparams['type'] = 'track'
    myparams['limit'] = '50'
    myparams['market'] = 'US'
    myparams['q'] =  songname 
    # actual GET request with proper header
    resp = requests.get(SEARCH_URL, params=myparams, headers=headers)
    resp = resp.json()
    #print(resp)
    # create/populate an array with the names of top 50 songs with the keyword
    song_names = []
    # create/populate an array with the artists for top 50 songs 
    song_artists = []
    for x in range(0,len(resp['tracks']['items'])):
        artistsforsong= []
        for y in range(0, len(resp['tracks']['items'][x]['artists'])):
            artistsforsong.append(resp['tracks']['items'][x]['artists'][y]['name'])
        song_names.append(resp['tracks']['items'][x]['name'])
        song_artists.append(artistsforsong)
    # search the array with artists names for the desired artist name, if found then save the index, else return NONE
    # if the artist is found, use the index to get track's URI, and use that to find song characteristics
    indexsaver = None
    for x in range(0,len(song_names)):
        if (artistname in song_artists[x]):
            indexsaver = x
            break
    if (indexsaver == None):
        print ("Song Was Not Found")
        return None
    else:
        spot_track_id = (resp['tracks']['items'][indexsaver]['uri'])
        track_ID = spot_track_id[14:]
        r = my_song(track_ID)
        lyrics = scrape_lyrics(artistname,songname)
        watsonanalysis = getAnalysis(lyrics)
        songemotion = watsonanalysis['document_tone']['tones'][0]['tone_id']
        print (songemotion)
        artworkdata = get_art(songemotion)
        r["lyrics"] = lyrics
        r['weblink'] = artworkdata[0]
        r['arttitle'] = artworkdata[1]
        print (r)
        return r

def scrape_lyrics(artistname, songname):
    artistname2 = str(artistname.replace(' ','-')) if ' ' in artistname else str(artistname)
    songname2 = str(songname.replace(' ','-')) if ' ' in songname else str(songname)
    call = 'https://genius.com/'+ artistname2 + '-' + songname2 + '-' + 'lyrics'
    page = requests.get(call)
    html = BeautifulSoup(page.text, 'html.parser')
    lyrics1 = html.find("div", class_="lyrics")
    lyrics2 = html.find("div", class_="Lyrics__Container-sc-1ynbvzw-6")
    if lyrics1:
        lyrics = lyrics1.get_text()
    elif lyrics2:
        lyrics = lyrics2.get_text()
    elif lyrics1 == lyrics2 == None:
        lyrics = None
    lyrics = re.sub(r'[\(\[].*?[\)\]]', '', lyrics)
    lyrics = os.linesep.join([s for s in lyrics.splitlines() if s])
    return lyrics

def getAnalysis(lyrics):
    authenticator = IAMAuthenticator('AUTH')
    tone_analyzer = ToneAnalyzerV3(
        version='2017-09-21',
        authenticator=authenticator
    )
    tone_analyzer.set_service_url('https://api.us-east.tone-analyzer.watson.cloud.ibm.com')

    tone_analysis = tone_analyzer.tone({'text': lyrics}, sentences=False).get_result()
    return (tone_analysis)

def get_art(emotion):
    db = client.artworks
    indexat = 0
    randint = random.randint(0, 50)

    collectionnames = db.list_collection_names()
    for coll_name in collectionnames:
        if coll_name == emotion:
            for x in db[coll_name].find({},{ "_id": 0 }):
                if (indexat == randint):
                    data = [x['weblink'], x["title"]]
                    return data
                else: 
                    indexat = indexat + 1
    default = 'misc'
    for x in db[default].find({},{ "_id": 0 }):
        if (indexat == randint):
            return [x['weblink'], x['title']]
        else: 
            indexat = indexat + 1
        
