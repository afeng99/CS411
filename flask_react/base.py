
import requests
from flask import Flask

api = Flask(__name__)

@api.route('/song')
def my_song():
    CLIENT_ID = '66d4dc55bde841f68636140e078d7076'
    CLIENT_SECRET = '73913d377e454e44b90d6e77782da7ed'

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
    track_id = '6CDzDgIUqeDY5g8ujExx2f'
    # actual GET request with proper header
    r = requests.get(BASE_URL + 'audio-features/' + track_id, headers=headers)
    r = r.json()
    return r