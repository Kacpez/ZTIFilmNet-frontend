import React, { Component } from 'react';
import './css/home.css'
class Home extends Component {

      render() {
        return (
          <>
          <img src="/image/tlo.png" alt="" class="center"></img>
          <h2>
      
            Welcome {localStorage.getItem("username")}!
            This is FilmNet web application about the most popular movies and series on streaming platform.
            </h2>
         
<div class="bod"> 
<a href="/movies">
  <div class="post">
  <img src="/image/filmy-marvela.jpeg" alt=""></img>
    <div class="post-s">
      <h2>
  Movies</h2>
  </div>
  </div>
  </a>
  <a href="/series">
  <div class="post">
  <img src="/image/dom-z-papieru.jpeg" alt=""></img>
      <div class="post-s">
        <h2>
    Series</h2>
    </div>
    </div>
  </a>

</div>
          </>
        ); 
    }
}

export default Home;