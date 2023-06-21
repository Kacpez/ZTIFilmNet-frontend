import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class HeaderComponent extends Component{

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
            <header>
            <nav class="navbar  navbar-dark navbar-expand-lg bg-dark"  >
  <div class="container-fluid">
    <a class="navbar-brand" href="/"><img src="/image/logo.png" alt="Logo" width="80" height="50" class="d-inline-block align-text-top">
      </img></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        
        <li class="nav-item">
          <a class="nav-link" href="/streaming-platforms">Platformy streamingowe</a>
        </li>
        </ul>
        </div>
        <div>
        <ul class="nav navbar-nav navbar-right">
        {localStorage.getItem("username") !== null ? null : <li class="nav-item"><a class="nav-link" href="/login"> Login</a></li>}
        {localStorage.getItem("username") !== null ? null : <li class="nav-item"><a class="nav-link" href="/register"> Register</a></li>}
      {localStorage.getItem("username") !== null ?  <span class="navbar-text">Logged in user: <strong>{localStorage.getItem("username")}</strong> </span> : null}
      {'  '}
      {localStorage.getItem("username") !== null ? <span><li class="nav-link "><Link to="/login" onClick={this.logout}>Log out</Link></li></span> : null}


    </ul>
    <span></span>
    </div>
    
  </div>
</nav>
       
            </header>
        </div>
    )
}}

export default HeaderComponent;