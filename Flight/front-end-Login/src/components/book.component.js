import React, { Component } from "react";

import FlightsService from "../services/flight.service";
import BookService from "../services/book.service";
import AuthService from "../services/auth.service";

import "../book.css";

/** 
const vFrom = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
*/

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.getFlight = this.getFlight.bind(this);
    this.bookFlight = this.bookFlight.bind(this);
    this.onchangeQuantity = this.onchangeQuantity.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      currentFlight: {
        id: null,
        flight_name: "",
        from: "",
        to: "",
        date: "",
        departuretime: "",
        arrivaltime: "",
        fare: "",
      },
      quantity: "1",
    };
  }

  onchangeQuantity(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  componentDidMount() {
    this.getFlight(this.props.match.params.id);
    console.log(this.state.currentUser);
    console.log(this.getFlight);
  }

  bookFlight(e) {
    e.preventDefault();
    console.log("inside bookflight");
    var currentFlight = {
      flight_name: this.state.currentFlight.flight_name,
      from: this.state.currentFlight.from,
      to: this.state.currentFlight.to,
      date: this.state.currentFlight.date,
      departuretime: this.state.currentFlight.departuretime,
      arrivaltime: this.state.currentFlight.arrivaltime,
      fare: this.state.currentFlight.fare,
    };
    console.log(currentFlight);
    BookService.BookFlight(
      this.state.currentUser,
      currentFlight,
      this.state.quantity
    )
      .then((response) => {
        console.log("inside booking");
        if(response){
        console.log(response);
        alert(`Your Ticket is Booked!`);
      }
      else{
        alert("Booking Failed")
      }
      })
      .catch((e) => {
        console.log("inside error");
        console.log(e);
      });
  }

  getFlight(id) {
    FlightsService.get(id)
      .then((response) => {
        this.setState({
          currentFlight: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    // const { flight } = this.state;
    const { currentFlight, currentUser, bookingdata } = this.state;

    return (
      <div class="container">
        
       
          {currentFlight && currentUser ? (

            <div className="editform">
             
              <form class="form-style">
              <h3 class="text-white"> Booking Details</h3>
               
                 <div class="input">


                <div className="group">
                  <label class="text-white">
                    <strong>From</strong>
                  </label>
                  <input
                    type="text"
                    className="linecontrol"
                    value={currentFlight.from}
                    onChange={this.onChangeFrom}
                   
                  />
                </div>

                 <div className="group">
                  <label class="text-white">
                    <strong>To</strong>
                  </label>
                  <input
                    type="text"
                    className="linecontrol"
                    value={currentFlight.to}
                    onChange={this.onChangeTo}
                    
                  />
                </div>

                <div class="form-group">
                  <label class="text-white">
                    <strong>Flight Name</strong>
                  </label>
                  <input
                    style={{ marginLeft: "10px", float: "left" }}
                    type="text"
                    className="control"
                    value={currentFlight.flight_name}
                    onChange={this.onChangeFlightName}
                    
                  />
                </div>

                <div class="form-group">
                  <label class="text-white">
                    <strong>Date</strong>
                  </label>
                  <input
                    style={{ marginLeft: "10px", float: "left" }}
                    type="text"
                    className="control"
                    id="description"
                    value={currentFlight.date}
                    onChange={this.onChangeDate}
                   
                  />
                </div>

                <div class="group">
                  <label class="text-white">
                    <strong>Departure Time</strong>
                  </label>
                  <input
                   type="text"
                    className="linecontrol"
                    id="description"
                    value={currentFlight.departuretime}
                    onChange={this.onChangeDepartureTime}
                   
                  />
                </div>

                <div class="group">
                  <label class="text-white">
                    <strong>Arrival Time</strong>
                  </label>
                  <input
                   type="text"
                    className="linecontrol"
                    id="description"
                    value={currentFlight.arrivaltime}
                    onChange={this.onChangeArrivalTime}
                   
                  />
                </div>

                <div class="form-group">
                  <label class="text-white">
                    <strong>Fare</strong>
                  </label>
                  <input
                    style={{ marginLeft: "10px", float: "left" }}
                    type="text"
                    className="control"
                    id="description"
                    value={currentFlight.fare}
                    onChange={this.onChangeFare}
                    
                  />
                </div>
                 
                <div className="two">
                  <h3 class="text-white">Personal Details</h3>

                  <div class="form-group">
                    <label class="text-white">First Name</label>
                    <input
                      type="text"
                      className="control"
                      value={currentUser.username}
                      onChange={this.onChangeUsername}
                      
                    />
                  </div>

                  <div class="group">
                    <label class="text-white">Last Name</label>
                    <input
                      type="text"
                      className="linecontrol"
                      value={currentUser.lastname}
                      onChange={this.onChangeLastname}
                     
                    />
                  </div>

                  <div class="group">
                    <label class="text-white">Gender</label>
                    <input
                      type="text"
                      className="linecontrol"
                      value={currentUser.gender}
                      onChange={this.onChangeGender}
                      
                    />
                  </div>

                  <div class="form-group">
                    <label class="text-white">Number of Passengers</label>
                    <input
                      type="text"
                      className="control"
                      value={this.state.quantity}
                      onChange={this.onchangeQuantity}
                      
                    />
                  </div>
                  <div className="col text-center">
                    <button type="submit" class="btn btn-warning text-white"
                      onClick={(e) => {
                        this.bookFlight(e);
                      }}
                      id="button"
                     
                    >
                      Continue
                    </button>
                  </div>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <br />
              <p>Please Login First to continue..</p>
              <a id="loginlink" href="/login">
                Sign In
              </a>
            </div>
          )}
        
      </div>
    );
  }
}