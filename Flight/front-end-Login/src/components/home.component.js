import React, { Component } from "react";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import UserService from "../services/user.service";
import UserComponent from "./user.component" ;
import CheckIcon from "@material-ui/icons/Check";

<Route path="D:\Duplicate_Flight\Flight\front-end-Login\src\components\user.component.js" component={UserComponent} ></Route>

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      /** 
      <Router>
      <div>
      <div className="navbars">
            <ul>
            <li>
              <div classname="link">
                <Link className="link" to={"/search"} >
                 Search
                </Link>
                </div>
              </li>
                </ul>
        </div>
        <div >
            <Switch>
              <Route exact path="/search" component={UserComponent} />
            </Switch>
        </div>
        <hr>
        </hr>
        <img src="https://media.gettyimages.com/photos/airplane-flying-in-the-sky-at-sunset-with-vapor-trails-picture-id520509993?b=1&k=6&m=520509993&s=612x612&w=0&h=dHo_Ty2u8ThKffsvuDv2UgSUoZXOO5BrHBe0BwzGGwg=" alt="flight"></img>
      </div>
      </Router>
      */
     <Router>


    
  <div>

    <div className="component">
      <div className="banner">
        <div>
          
        </div>
        <div className="banner__contentRight">
          <br /> <br /> <br />
          <h1 className="banner__heading">THE BEST CAR SERVICE AWAITS YOU</h1>
          <br></br>
          <p className="banner__para">
            Your Car deserves nothing but the best car repair and services in
            town. Book a seemless car service experience with us.
          </p>
        </div>
      </div>

      <hr />
      <h1 className="banner__heading">The Wype Way</h1>
      <h4 className="banner__feature">
        CONVENIENT • TRANSPARENT • QUALITY • RELIABLE
      </h4>
      <hr />

      <div className="banner">
        <div className="banner__contentLeft">
          <h1 className="feature__heading">CONVENIENT</h1>
          <br></br>
          <h4 className="feature__subHeading">Lets stay home & stay safe</h4>
          <p className="banner__para">
            That's the best thing you can do right now to keep your loved ones
            safe because staying at home everyday keeps Corona away.
          </p>
          <p className="points">
            <CheckIcon color="secondary" />
            Service right at your doorstep.
          </p>
          <p className="points">
            <CheckIcon color="secondary" /> Online payments. Hassle free and
            safe.
          </p>
          <p className="points">
            <CheckIcon color="secondary" />
            Fast delivery. We value your time.
          </p>
        </div>
        <div>
          
        </div>
      </div>

      <div className="banner">
        <div>
          
        </div>
        <div className="banner__contentRight">
          <h1 className="feature__heading">TRANSPARENT</h1>
          <br></br>
          <h4 className="feature__subHeading">
            To let you enjoy your peace of mind
          </h4>
          <p className="banner__para">
            We fix even your trust in car service and repair because we have
            build our business on trust.
          </p>
          <p className="points">
            <CheckIcon color="secondary" />
            Up front pricing.
          </p>
          <p className="points">
            <CheckIcon color="secondary" /> Service beyond the standards.
          </p>
          <p className="points">
            <CheckIcon color="secondary" />
            Real time updates.
          </p>
        </div>
      </div>

      <div className="banner">
        <div className="banner__contentLeft">
          <h1 className="feature__heading">QUALITY</h1>
          <br></br>
          <h4 className="feature__subHeading">It's Our responsibility</h4>
          <p className="banner__para">
            We are committed to quality and take car care seriously. Top-notch
            service is our main auto motive.
          </p>
          <p className="points">
            <CheckIcon color="secondary" />
            Skilled technicians.
          </p>
          <p className="points">
            <CheckIcon color="secondary" /> Genuine spares.
          </p>
          <p className="points">
            <CheckIcon color="secondary" />
            Service warranty.
          </p>
        </div>
        <div>
        
        </div>
      </div>
    </div>
  






     </div>
     </Router>
    );
  }
}