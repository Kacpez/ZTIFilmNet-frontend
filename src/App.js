import './App.css';
import React, { Component } from 'react';
import {BrowserRouter as Router,  Route, Routes,Navigate } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListMovieComponent from './components/ListMovieComponent';
import ListSeriesComponent from './components/ListSeriesComponent';
import AddMovieComponent from './components/AddMovieComponent';
import AddSeriesComponent from './components/AddSeriesComponent';
import Register from './components/Register.js'
import Login from './components/Login.js'
import Home from './components/HomeComponent';
import ListSPComponent from './components/ListSPComponent';
import AddRatingMovieComponent from './components/AddRatingMovieComponent';
import AddRatingSeriesComponent from './components/AddRatingSeriesComponent';
class App extends Component{

   state = { username: "", isAuthenticated : false };

   updateUsername = () => {
     const username = localStorage.getItem("username");
     this.setState({ username: username });
     if (username.length > 0) {
       this.setState({isAuthenticated : true});
       console.log("true");
     } else {
       this.setState({isAuthenticated : false});
       console.log("false");
     }
  };

  logout = () => {
    localStorage.clear();
     this.setState({username : "", isAuthenticated : false});
  }

  render(){
  return (
    <div>
      <Router>
        <HeaderComponent />
  
        <div className= "container">
          <Routes>
              <Route exact path="/login" element={<Login updateUsername={this.updateUsername} />} />
              <Route path='/' element={<Home/>}></Route>
              <Route path = "/series" element = {<PrivateSeriesRoute/>}></Route>
              <Route path = "/streaming-platforms" element = {<ListSPComponent/>}></Route>
              <Route path = "/movies" element = {<PrivateMoviesRoute/>}></Route>
              <Route path = "/add-movie" element = {<AddMovieComponent/>} ></Route>
              <Route path = "/add-series" element = {<AddSeriesComponent/>} ></Route>
              <Route path = "/edit-movie/:id" element = {<AddMovieComponent/>}></Route>
              <Route path = "/edit-series/:id" element = {<AddSeriesComponent/>}></Route>
              <Route path = "/add-rating-movie/:id" element = {<AddRatingMovieComponent/>}></Route>
              <Route path = "/add-rating-series/:id" element = {<AddRatingSeriesComponent/>}></Route>
              <Route path ="/register" element={<Register/>}/>
              
          
            </Routes>
  
        </div>
        <FooterComponent />
        </Router>
    </div>
  );
}}

function PrivateMoviesRoute() {
  return (
    <Routes>
    <Route
      path="/"
      element={
        localStorage.getItem("username") !== null ? (
          <ListMovieComponent />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
    </Routes>
  );
}
function PrivateSeriesRoute() {
  return (
    <Routes>
    <Route
      path="/"
      element={
        localStorage.getItem("username") !== null ? (
          <ListSeriesComponent />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
    </Routes>
  );
}

export default App;
