import React, { Component } from "react";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"
import UserService from "../services/user.service";
import AddComponent from "./add.component" ;
import FlightList from "./flight-list.component";
import Flight from "./flight.component";
import "../nav.css";
export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  
  render() {
    return (
      <Router>
      <div>
      <div className="navbars">
            <ul>
            <li>
              <div classname="link">
                <Link className="link" to={"/add"} >
                  Add
                </Link>
                </div>
              </li>
                
              <li>
                <div classname="link">
                <Link className="link" to={"/flight"} >
                
                  Flights
                </Link></div>
              </li>
              
              
             
            </ul>
        </div>
        <div >
            <Switch>
              <Route exact path="/add" component={AddComponent} />
              <Route exact path={["/", "/flight"]} component={FlightList} />
              
              <Route path="/flight/:id" component={Flight} />

            </Switch>
        </div>
      </div>
      </Router>
    );
  }
}