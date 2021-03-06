# Song / Artwork Pairing Application
by Amy Feng Chen, Erin McAteer, Skyler Gauuan, Kruthik Ravishankar, Pratima Vaidyanathan, Xiao Wen

## Description
Our application uses an artwork emotion dataset to match Spotify songs to famous artwork. The user authenticates with Spotify and can then input a song and artist they'd like to pair to a piece of artwork that matches the features and sentiments of the song lyrics. Spotify is used for authentication and to search for the song features such as danceability, energy, and loudness. The lyrics of the song are obtained from Genius API and then sent to the IBM Watson to receive a sentiment analysis. We then utilize WikiArt Emotions Database, which is a dataset of mostly paintings that has annotations of the emotions evoked by a viewer observing the painting. We use the results of the sentiment analysis of the song from Watson to find a painting from the dataset that matches the sentiment. We then store the sentiment match of the song and the painting in a database, which displays a few additional pairings of artwork as examples.

## Repo Organization

    .
    ├── Docs
      ├── TechStack.md          # Info for why this specific tech stack was chosen
      ├── UserStory1.md         # User Story #1
      ├── UserStory2.md         # User Story #2
      ├── UserStory3.md         # User Story #3
      ├── UserStory4.md         # User Story #4
      ├── UserStory5.md         # User Story #5
      └── pitches.md            # Original project pitches
    ├── Prototype               # Contains most up-to-date functioning prototype
        ├── src                 # Contains source files
        ├── FinalVideo.mp4      # Demo Video
        └── base.py             # Current backend
    ├── flask_react             # Contains current application
        ├── backend
        ├── env                 # Private, user-specific env file
        ├── public              
        └── src                 # Frontend
    ├── .gitignore 
    └── ReadME.md

## Required Set-up Keys
### Spotify
Authentication with a Spotify developer key is needed. Please look [here](https://developer.spotify.com/) to make an account and retrieve your ClientId and ClientSecret.

### IBM Cloud / Watson
To retrieve the sentiment analysis from Watson, an IBM account with an API key from before January 1, 2022 is needed (Watson is no longer servicing new users). 

## Running the Application
### In terminal, clone the repo and open the folder
```
$ git clone https://github.com/afeng99/CS411.git
$ cd flask_react
```

### Frontend set-up
```
$ npm install --save react react-dom react-scripts
$ npm install react-router-dom
$ npm start
```

### Backend set-up (in a new terminal within the flask_react folder)
```
$ pip install flask
$ pip install python-dotenv
$ pip install ibm-watson == 5.3
$ flask run
```
