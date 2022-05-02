import React from "react";
import "./Login.css";

const CLIENT_ID = '66d4dc55bde841f68636140e078d7076'
const REDIRECT_URI = 'http://localhost:3000/song_search'
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <body>
          <header className="Login-header">
            <section>
              <h1>To Start Your Journey</h1>
              <button className="Button">
                <a
                  href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
                >
                  Login to Spotify
                </a>
              </button>
            </section>
          </header>
        </body>
      </div>
    );
  }
}

export default Login;
