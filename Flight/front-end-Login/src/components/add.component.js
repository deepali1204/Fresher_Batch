import React, { Component } from "react";
import FlightService  from "../services/flight.service";



export default class AddComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeFlight_name = this.onChangeFlight_name.bind(this);
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    
    this.onChangeDepartureTime = this.onChangeDepartureTime.bind(this);
    this.onChangeArrivalTime = this.onChangeArrivalTime.bind(this);
    this.onChangeFare = this.onChangeFare.bind(this);
    this.saveFlight = this.saveFlight.bind(this);
    this.newFlight = this.newFlight.bind(this);

    this.state = {
      id: null,
      flight_name: "",
      from: "",
      to: "",
      date: "",
      departuretime:"",
      arrivaltime:"",
      fare:"",
      submitted: false
    };
  }

  onChangeFlight_name(e) {
    this.setState({
      flight_name: e.target.value
    });
  }

  onChangeFrom(e) {
    this.setState({
      from: e.target.value
    });
  }
  onChangeTo(e) {
    this.setState({
      to: e.target.value
    });
  }
  onChangeDate(e) {
    this.setState({
      date: e.target.value
    });
  }
  onChangeDepartureTime(e) {
    this.setState({
      departuretime: e.target.value
    });
  }
  onChangeArrivalTime(e) {
    this.setState({
      arrivaltime: e.target.value
    });
  }
  onChangeFare(e) {
    this.setState({
      fare: e.target.value
    });
  }

  saveFlight() {
    var data = {
      flight_name:this.state.flight_name,
      from:this.state.from,
      to:this.state.to,
      date:this.state.date,
      departuretime:this.state.departuretime,
      arrivaltime:this.state.arrivaltime,
      fare:this.state.fare
    };

    FlightService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          flight_name: response.data.flight_name,
          from: response.data.from,
          to: response.data.to,
          date:response.data.date,
          departuretime:response.data.departuretime,
          arrivaltime:response.data.arrivaltime,
          fare:response.data.fare,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newFlight() {
    this.setState({
      id: null,
      flight_name: "",
      from: "",
      to: "",
      date: "",
      departuretime:"",
      arrivaltime:"",
      fare:"",
      submitted: false
    });
  }

  render() {
    return (
      <div>
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Flight added successfully!</h4>
            <div>
            <button className="btn btn-info" onClick={this.newFlight}>
              Add
            </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title"></label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.flight_name}
                placeholder="Name of the Flight"
                onChange={this.onChangeFlight_name}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description"></label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.from}
                placeholder="From where?"
                onChange={this.onChangeFrom}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description"></label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.to}
                placeholder="To where?"
                onChange={this.onChangeTo}
                name="description"
              />
            </div>

            < div className="form-group">
              <label htmlFor="description"></label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.date}
                placeholder="Date of Travel"
                onChange={this.onChangeDate}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description"></label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.departuretime}
                placeholder="Time of Departure"
                onChange={this.onChangeDepartureTime}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description"></label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.arrivaltime}
                placeholder="Time of Arrival"
                onChange={this.onChangeArrivalTime}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description"></label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.fare}
                placeholder="Fare of Flight"
                onChange={this.onChangeFare}
                name="description"
              />
            </div>

            <button onClick={this.saveFlight} className="btn btn-info">
              Submit
            </button>
          </div>
        )}
      </div>
      
      </div>
    );
   
  }
}