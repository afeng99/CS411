import { useState } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {
 const [songData, setSongData] = useState(null)
 const [value, setValue] = useState(null)

  function getData() {
    axios({
      method: "GET",
      url: "/song",
    })
    .then((response) => {
      const res =response.data
      setSongData(({
        danceability: res.danceability,
        energy: res.energy,
        loudness: res.loudness,
        acousticness: res.acousticness,
        instrumentalness: res.instrumentalness}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    function handleChange(event){
      setValue(({songName: event.target.value}))
    }
  return (
    <div className="App">
      <header className="App-header">
       <p>To get song information: </p><button onClick={getData()}>Click me</button>
      {songData && <div>
            <p>Name: Enter Sandman</p>
            <p>Artist: Metallica</p>
            <p>Danceability: {songData.danceability}</p>
            <p>Energy: {songData.energy}</p>
            <p>Loudness: {songData.loudness}</p>
            <p>Acousticness: {songData.acousticness}</p>
            <p>Instrumentalness: {songData.instrumentalness}</p>
            </div>
      }
      </header>
    </div>
  );
}

export default App;
