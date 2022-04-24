import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, hashHistory, Routes } from 'react-router-dom';
import Login from './components/Login';
import SongSearch from './components/SongSearch';
 

class App extends Component {

  render() {
    return (      
      <BrowserRouter>
        <div>
            <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/song_search" element={<SongSearch/>}/>    
           </Routes>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;