import { useState } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './App.css';


function App() {
 const [songData, setSongData] = useState(null)
 const [songValue, setSongValue] = useState(null)
 const [artistValue, setArtistValue] = useState(null)

  function getData(){
    axios({
      method: "GET",
      url: "/search?songname=" + songValue + "&artistname=" + artistValue,
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

  function handleSongChange(event){
    setSongValue(event.target.value)
  }
  function handleArtistChange(event){
    setArtistValue(event.target.value)
  }
  return (
    <div className="App">
      <header className="App-header">
      <p>Song Name:</p>
      <input type="text" value={songValue} onChange={handleSongChange} />
      <p>Artist Name:</p>
      <input type="text" value={artistValue} onChange={handleArtistChange} />
      <p>To get song information: </p>
      <button onClick={getData}>Click me</button>
      {songData && <div>
            <p>{"Name: " + songValue }</p>
            <p>{"Artist: " + artistValue}</p>
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
