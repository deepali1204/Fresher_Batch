import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Book from "./components/book.component"

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";

import BoardAdmin from "./components/board-admin.component";
import Footer from "./components/footer";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      
      showAdminBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;
    
    return (
      <div>
      
      <Router>
        
     <div>
     
          <nav className="navbar navbar-expand navbar-fixed-top transparent  navbar-dark bg-dark " id="nav1">
          <Link to={"/"} className="navbar-brand">
          <a href="#"><img      
          src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2/128/airplane-circle-blue-512.png"  alt=""  className="navigation-img-card"/></a>
         
          
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  <strong>Home</strong>
                </Link>
              </li>

             

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    <strong> Admin </strong>
                   
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/book/:id"} className="nav-link">
                    <strong>Book</strong>
                   
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    <strong> {currentUser.username}</strong>
                   
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    <strong> LogOut</strong>
                   
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    <strong>Login</strong>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    <strong>  Sign Up</strong>
                  
                   
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/book/:id" component={Book} />
             
              <Route path="/admin" component={BoardAdmin} />
            </Switch>
          </div>
        </div>
        
      </Router>
      <Footer></Footer>
      </div>
    );
  }
}

export default App;