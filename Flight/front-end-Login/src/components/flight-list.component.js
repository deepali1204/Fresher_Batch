import React, { Component } from "react";
import FlightService from "../services/flight.service";
import { Link } from "react-router-dom";

export default class FlightList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchFlight_name = this.onChangeSearchFlight_name.bind(this);
    this.retrieveFlights = this.retrieveFlights.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveFlight = this.setActiveFlight.bind(this);
    this.removeAllFlights = this.removeAllFlights.bind(this);
    this.searchFlight_name = this.searchFlight_name.bind(this);
 //////
    this.state = {
      flight: [],
      currentFlight: null,
      currentIndex: -1,
      searchFlight_name: ""
    };
  }

  componentDidMount() {
    this.retrieveFlights();
  }

  onChangeSearchFlight_name(e) {
    const searchFlight_name = e.target.value;

    this.setState({
      searchFlight_name: searchFlight_name
    });
  }

  retrieveFlights() {
    FlightService.getAll()
      .then(response => {
        this.setState({
          flight: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveFlights();
    this.setState({
      currentFlight: null,
      currentIndex: -1
    });
  }

  setActiveFlight(flights, index) {
    this.setState({
      currentFlight: flights,
      currentIndex: index
    });
  }

  removeAllFlights() {
    FlightService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchFlight_name() {
    FlightService.findByFlight_name(this.state.searchFlight_name)
      .then(response => {
        this.setState({
          flight: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    

    const { searchFlight_name, flight, currentFlight, currentIndex } = this.state;

    return (
      <div className="listrow">
        
        <div className="col-md-8">
         
            <div className="searchbox">
            
            <input
              type="text"
              className="form-control"
              placeholder="Search by Flight Name"
              value={searchFlight_name}
              onChange={this.onChangeSearchFlight_name}
              
              />
            </div>
            <div className="search button">
               <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchFlight_name}
                >
                search
                </button>
           
            </div>
          
        </div>


        <div className="list">
         <ul className="list-group">
           <h4>List</h4>
            {flight &&
              flight.map((flights, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveFlight(flights, index)}
                  key={index}
                >
                  {flights.flight_name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllFlights}
          >
            Remove All
          </button>
        </div>
      

        <div className="detailed_list">
          {currentFlight ? (
            <div>
              
              <div>
                <label>
                  <strong>Flight Name</strong>
                </label>{" "}
                {currentFlight.flight_name}
              </div>
              <div>
                <label>
                  <strong>From:</strong>
                </label>{" "}
                {currentFlight.from}
              </div>
              <div>
                <label>
                  <strong>To:</strong>
                </label>{" "}
                {currentFlight.to}
              </div>
              <div>
                <label>
                  <strong>Date:</strong>
                </label>{" "}
                {currentFlight.date}
              </div>
              
              <div>
                <label>
                  <strong>Fare</strong>
                </label>{" "}
                {currentFlight.fare}
              </div>
             

              <div>
                <label>
                  <strong>Arrival time</strong>
                </label>{" "}
                {currentFlight.arrivaltime}
              </div>
              <div>
                <label>
                  <strong>Departure Time</strong>
                </label>{" "}
                {currentFlight.departuretime}
              </div>
             

              <Link
                to={"/flight/" + currentFlight._id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please Click on a Flight</p>
            </div>
          )}
        </div>

        
      
      </div>
    );
  }

  }
