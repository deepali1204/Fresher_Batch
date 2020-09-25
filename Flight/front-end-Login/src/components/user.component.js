import React, { Component } from 'react'
import   UserSearchService from "../services/user_search.service";
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import "../user.css";

export default class UserComponent extends Component {


    constructor(props) {
        super(props);
        
        this.onChangeFrom = this.onChangeFrom.bind(this);
        this.onChangeTo = this.onChangeTo.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.saveInfo = this.saveInfo.bind(this);
        
        
        
    
        this.state = {
          from: "",
          to: "",
          date: "",
          flight:[]
        };
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

  saveInfo() {
    var data = {
      from:this.state.from,
      to:this.state.to,
      date:this.state.date,
     };
    

     UserSearchService.findflights(data)
    .then(response => {
      
      this.setState({
        flight:response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });

}
 

   render() {
    const { flight } = this.state;
        return (
             <div>
               <div className="zero">
            <div className="one">
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

            <div className="one">
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

            < div className="one">
              <label htmlFor="description"></label>
              <input
                type="date"
                className="form-control"
                id="description"
                required
                value={this.state.date}
                placeholder="Date of Travel"
                onChange={this.onChangeDate}
                name="description"
              />
            </div>
            <div className="button">
            <button onClick={this.saveInfo} className="btn btn-info">
              Submit
            </button>
            </div>
         
            </div>
    
         

         <div className="table">
        <Table responsive>
        <thead>
        <tr>
        
        <th>Source</th>
        <th>Destination</th>
        <th>Date</th>
        <th>DepartureTime</th>
        <th>ArrivalTime</th>
        <th>Fare</th>
        
        <th></th>
        <th></th>
        </tr>
        </thead>
        <tbody>
        {
        flight && flight.map((flight, i) => {
        return (
        <tr>

        <td>{flight.from}</td>
        <td>{flight.to}</td>
        <td>{flight.date.substring(0,10)}</td>
        <td>{flight.departuretime}</td>
        <td>{flight.arrivaltime}</td>
        <td>{flight.fare}</td>
        
        <td>
        <Link to={"/book/" + flight._id} className="btn btn-primary">Book</Link>
        </td>
        
        </tr>
          )
          })
          }
        </tbody>
        </Table>
        </div>
          </div>
          
          
   )
           }
        
    
          }



