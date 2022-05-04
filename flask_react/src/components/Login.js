import React from "react";
import "./Login.css";
import happy from './images/happy.jpg';
import tentative from './images/tentative.jpg';
import sadness from './images/sadness.jpg';
import anger from './images/anger.jpg';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const CLIENT_ID = '66d4dc55bde841f68636140e078d7076'
const REDIRECT_URI = 'http://localhost:3000/song_search'
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"


class Login extends React.Component {

  render() {

    return (

      
      <div className="Login">

      <h1>Sentiment Matching: Song and Painting</h1>

      <div>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}> 
         <button className="login_button" >
        Login to Spotify
        </button>
        </a>
      </div>

      <div className="Examples">
      <Container>
      <Row>
        <Col>      
        <img src={tentative}></img>
        <p>Happy Now by kygo</p>
        <p>Emotion: Tentative</p>
        </Col>
        <Col>
        <img src={sadness}></img>
        <p>Payphone by Maroon 5</p>
        <p>Emotion: Sadness</p>
        </Col>
        <Col>
        <img src={anger}></img>
        <p>deja vu by Olivia Rodrigo</p>
        <p>Emotion: Anger</p></Col>
      </Row>
      </Container>

      </div>

      </div>

      

      
    );

    
  }
}

export default Login;
