
import requests
from flask import Flask
from flask import request
import json
api = Flask(__name__)
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from bs4 import BeautifulSoup
import requests

CLIENT_ID = 'OAuth'
CLIENT_SECRET = 'OAuth'

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
    print(r)
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
    #print (song_names)
    #print (song_artists)
    if (indexsaver == None):
        return None
    else:
        spot_track_id = (resp['tracks']['items'][indexsaver]['uri'])
        track_ID = spot_track_id[14:]
        #print (track_ID)
        r = my_song(track_ID)
        print(scrape_lyrics(artistname,songname))
        return r

def scrape_lyrics(artistname, songname):
    artistname2 = str(artistname.replace(' ','-')) if ' ' in artistname else str(artistname)
    songname2 = str(songname.replace(' ','-')) if ' ' in songname else str(songname)
    call = 'https://genius.com/'+ artistname2 + '-' + songname2 + '-' + 'lyrics'
    #print(call)
    page = requests.get(call)
    #page = requests.get('https://genius.com/Khalid-Location-lyrics')
    #print(page.text)
    html = BeautifulSoup(page.text, 'html.parser')
    #print(html)
    lyrics1 = html.find("div", class_="lyrics")
    lyrics2 = html.find("div", class_="Lyrics__Container-sc-1ynbvzw-6")
    if lyrics1:
        lyrics = lyrics1.get_text()
    elif lyrics2:
        lyrics = lyrics2.get_text()
    elif lyrics1 == lyrics2 == None:
        lyrics = None

    return lyrics

def getAnalysis(lyrics):
    authenticator = IAMAuthenticator('{apikey}')
    tone_analyzer = ToneAnalyzerV3(
        version='2017-09-21',
        authenticator=authenticator
    )

    tone_analyzer.set_service_url('{url}')

    text = lyrics

    tone_analysis = tone_analyzer.tone(
        {'text': text},
        content_type='application/json'
    ).get_result()
    print(json.dumps(tone_analysis, indent=2))


    # test cases
    #my_song()
    #search("Location","Khalid")
