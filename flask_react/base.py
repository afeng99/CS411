
import requests
from flask import Flask

api = Flask(__name__)

@api.route('/song')
def my_song():
    CLIENT_ID = 'c2e501f4a8ea4d38aa2f76af2216c161'
    CLIENT_SECRET = 'e5605a38306d47eaa90dd1ef33df0cb6'

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

    # base URL of all Spotify API endpoints
    BASE_URL = 'https://api.spotify.com/v1/'
    # Track ID from the URI
    track_id = '18L6LjRgI7Uzw17NySgJgg'
    searchQ = 'q=track:enter+artist:lmfao&type=track'
    # actual GET request with proper header
    r = requests.get(BASE_URL + 'audio-features/' + track_id, headers=headers)
    #r = requests.get(BASE_URL + 'search?' + searchQ, headers=headers)
    r = r.json()
    print(r)
    return r
