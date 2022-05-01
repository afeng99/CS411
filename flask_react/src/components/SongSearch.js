import { useState } from "react";
import axios from "axios";
import "./SongSearch.css";

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
      <header className="SongSearch-header">
        <a href="/">Home Page</a>

        <fieldset>
          <legend>Welcome</legend>
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
