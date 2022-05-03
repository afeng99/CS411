import React from "react";
import "./Login.css";
import happy from './images/happy.jpg';
import tentative from './images/tentative.jpg';
import sadness from './images/sadness.jpg';
import anger from './images/anger.jpg';

const CLIENT_ID = '66d4dc55bde841f68636140e078d7076'
const REDIRECT_URI = 'http://localhost:3000/song_search'
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

class Login extends React.Component {
  render() {
    return (

      <div className="Login">

      <view>
      <h1>To Start Your Journey</h1>
      <button className="Button">
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
          Login to Spotify
        </a>
      </button>
      </view>
       

      <view style = {{position: 'absolute', width:1000, height: 1000, top: 500, left:600}}>
      <img src={tentative}></img>
      <p>Happy Now by kygo</p>
      <p>Emotion: Tentative</p>
      </view>

      <view style = {{position: 'absolute', width:500, top: 500, left:10}}>
      <img src={sadness}></img>
      <p>Payphone by Maroon 5</p>
      <p>Emotion: Sadness</p>
      </view>

      <view style = {{position: 'absolute', width:1000, height:500, top: 500, left:170}}>
      <img src={anger}></img>
      <p>deja vu by Olivia Rodrigo</p>
      <p>Emotion: Anger</p>
      </view>

      </div>
    );
  }
}

export default Login;
