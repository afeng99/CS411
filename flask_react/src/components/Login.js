import React from 'react'
import "./Login.css";

const CLIENT_ID = 'CLIENT ID'
const REDIRECT_URI = 'http://localhost:3000/song_search'
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

class Login extends React.Component {

  render() {

    return (
      <div className="Login">
        <header className="Login-header">
          
          <h1>Welcome</h1>   
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                          to Spotify</a>
          
        </header>
      </div>
    );

  }
}

export default Login;