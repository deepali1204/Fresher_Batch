
import React, { Component } from "react";
import FlightService from "../services/flight.service";

export default class Flight extends Component {
  constructor(props) {
    super(props);
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
    this.onChangeFlight_name = this.onChangeFlight_name.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeFare = this.onChangeFare.bind(this);
    this.onChangeArrivaltime = this.onChangeArrivaltime.bind(this);
    this.onChangeDeparturetime = this.onChangeDeparturetime.bind(this);
    this.getFlight = this.getFlight.bind(this);
    this.updateFlight = this.updateFlight.bind(this);
    this.deleteFlight= this.deleteFlight.bind(this);

    this.state = {
      currentFlight: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getFlight(this.props.match.params.id);
  }
////////////////////////////////////////////////////
  onChangeFrom(e) {
    const to= e.target.value;
////////////////////////////////////////////
    this.setState(function(prevState) {
      return {
        currentFlight: {
          ...prevState.currentFlight,
          to:to
        }
      };
    });
  }

  onChangeTo(e) {
    const to = e.target.value;
    
    this.setState(prevState => ({
      currentFlight: {
        ...prevState.currentFlight,
        to: to
      }
    }));
  }
  onChangeFlight_name(e) {
    const flight_name = e.target.value;
    
    this.setState(prevState => ({
      currentFlight: {
        ...prevState.currentFlight,
        flight_name: flight_name
      }
    }));
  }
  onChangeDate(e) {
    const date = e.target.value;
    
    this.setState(prevState => ({
      currentFlight: {
        ...prevState.currentFlight,
        date: date
      }
    }));
  }
  onChangeFare(e) {
    const fare = e.target.value;
    
    this.setState(prevState => ({
      currentFlight: {
        ...prevState.currentFlight,
        fare: fare
      }
    }));
  }
  onChangeArrivaltime(e) {
    const arrivaltime = e.target.value;
    
    this.setState(prevState => ({
      currentFlight: {
        ...prevState.currentFlight,
        arrivaltime: arrivaltime
      }
    }));
  }
  onChangeDeparturetime(e) {
    const departuretime = e.target.value;
    
    this.setState(prevState => ({
      currentFlight: {
        ...prevState.currentFlight,
        departuretime: departuretime
      }
    }));
  }

  getFlight(id) {
    FlightService.get(id)
      .then(response => {
        this.setState({
          currentFlight: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  

  updateFlight() {
    FlightService.update(
      this.state.currentFlight._id,
      this.state.currentFlight
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Flight was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteFlight() {    
    FlightService.delete(this.state.currentFlight._id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/flight')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentFlight } = this.state;

    return (
      <div>
        {currentFlight ? (
          <div className="edit-form">
            <h4></h4>
            <form>
            <div className="edit">
                <label htmlFor="description"><strong>Name</strong></label>
                <input
                  type="text"
                  className="edit"
                  id="description"
                  value={currentFlight.flight_name}
                  onChange={this.onChangeFlight_name}
                />
              </div>
              <div className="edit">
                <label htmlFor="title"><strong>From</strong></label>
                <input
                  type="text"
                  className="edit"
                  id="title"
                  value={currentFlight.from}
                  onChange={this.onChangeFrom}
                />
              </div>
              <div className="edit">
                <label htmlFor="description"><strong>To</strong></label>
                <input
                  type="text"
                  className="edit"
                  id="description"
                  value={currentFlight.to}
                  onChange={this.onChangeTo}
                />
              </div>
             
              <div className="edit">
                <label htmlFor="description"><strong>Date</strong></label>
                <input
                  type="text"
                  className="edit"
                  id="description"
                  value={currentFlight.date}
                  onChange={this.onChangeDate}
                />
              </div>
              <div className="edit">
                <label htmlFor="description"><strong>Arrival Time</strong></label>
                <input
                  type="text"
                  className="edit"
                  id="description"
                  value={currentFlight.arrivaltime}
                  onChange={this.onChangeArrivaltime}
                />
              </div>
              <div className="edit">
                <label htmlFor="description"><strong>Departure Time</strong></label>
                <input
                  type="text"
                  className="edit"
                  id="description"
                  value={currentFlight.departuretime}
                  onChange={this.onChangeDeparturetime}
                />
              </div>
              

            </form>
            
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteFlight}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateFlight}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Flight </p>
          </div>
        )}
      </div>
    );
  }
}
  
