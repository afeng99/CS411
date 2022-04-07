import { useState } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {
 const [songData, setSongData] = useState(null)

  function getData() {
    axios({
      method: "GET",
      url: "/song",
    })
    .then((response) => {
      const res =response.data
      setSongData(({
        danceability: res.danceability}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
  return (
    <div className="App">
      <header className="App-header">
       <p>To get song information: </p><button onClick={getData}>Click me</button>
      {songData && <div>
            <p>Danceability: {songData.danceability}</p>
            </div>
      }
      </header>
    </div>
  );
}

export default App;
