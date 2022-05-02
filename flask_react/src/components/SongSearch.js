import { useState } from "react";
import axios from "axios";
import "./SongSearch.css";
import happy from './images/happy.jpg';
import tentative from './images/tentative.jpg';
import sadness from './images/sadness.jpg';
import anger from './images/anger.jpg';

function SongSearch() {
  const [songData, setSongData] = useState(null);
  const [songValue, setSongValue] = useState(null);
  const [artistValue, setArtistValue] = useState(null);

  function getData() {
    axios({
      method: "GET",
      url: "/search?songname=" + songValue + "&artistname=" + artistValue,
    })
      .then((response) => {
        const res = response.data;
        setSongData({
          lyrics: res.lyrics,
          danceability: res.danceability,
          energy: res.energy,
          loudness: res.loudness,
          acousticness: res.acousticness,
          instrumentalness: res.instrumentalness,
          weblink: res.weblink,
          artworktitle: res.arttitle,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function handleSongChange(event) {
    setSongValue(event.target.value);
  }
  function handleArtistChange(event) {
    setArtistValue(event.target.value);
  }
  return (
    <div className="SongSearch">
      
      <view style = {{position: 'absolute', width:1000, height: 500, top: 100,}}>
      <img src={tentative}></img>
      <p>Happy Now by kygo</p>
      <p>Emotion: Tentative</p>
      </view>

      <view style = {{position: 'absolute', width:1000, height: 500, marginRight: 100, top: 470,}}>
      <img src={happy}></img>
      <p>Location by Khalid</p>
      <p>Emotion: Joy</p>
      </view>

      
      <view style = {{position: 'absolute', width:0, top: 100,}}>
      <img src={sadness}></img>
      <p>Payphone by Maroon 5</p>
      <p>Emotion: Sadness</p>
      </view>

      <view style = {{position: 'absolute', width:0, height: 500, top: 470,}}>
      <img src={anger}></img>
      <p>deja vu by Olivia Rodrigo</p>
      <p>Emotion: Anger</p>
      </view>
    

      <header className="SongSearch-header">
        <a href="/">Home Page</a>
        <fieldset>
          <ul>
            <li>
              <p>Song Name:</p>
              <input
                type="text"
                value={songValue}
                onChange={handleSongChange}
              />
            </li>
            <li>
              <p>Artist Name:</p>
              <input
                type="text"
                value={artistValue}
                onChange={handleArtistChange}
              />
            </li>
          </ul>
          <p>To get song information: </p>

          <button onClick={getData}>Click me</button>
          {songData && (
            <div>
              <p>{"Name: " + songValue}</p>
              <p>{"Artist: " + artistValue}</p>
              <p>Lyrics: {songData.lyrics} </p>
              <p>Danceability: {songData.danceability}</p>
              <p>Energy: {songData.energy}</p>
              <p>Loudness: {songData.loudness}</p>
              <p>Acousticness: {songData.acousticness}</p>
              <p>Instrumentalness: {songData.instrumentalness}</p>
              <a href = {songData.weblink}> {songData.artworktitle} </a>
            </div>
          )}
        </fieldset>
      </header>
    </div>
  );
}

export default SongSearch;
