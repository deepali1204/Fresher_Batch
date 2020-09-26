const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const { response } = require('express');



//Assertion style
chai.should();

chai.use(chaiHttp);

describe('Flights API', ()=>{
    /**
     * Test the GET route
     */

     describe("GET /api/flight", ()=>{
        it("It should GET all the flights", (done)=>{
            chai.request('http://localhost:6000')
            .get("/api/flight")
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('array')
                done();
                });
            });
            it("It should NOT GET all the flights", (done)=>{
                chai.request('http://localhost:6000')
                .get("/api/fligh")
                .end((err,response)=>{
                    response.should.have.status(404);
                    done();
                    });
                });
        });
        
        /**
     * Test the GET(by ID) route
     */
     describe("GET /api/flight/:_id", ()=>{
        it("It should GET a flight by id", (done)=>{
            const flightid='5f4c04462882572a04fa97e3'
            chai.request('http://localhost:6000')
            .get("/api/flight/" +flightid)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object')
                response.body.should.have.property('_id')
                response.body.should.have.property('flight_name')
                response.body.should.have.property('from')
                response.body.should.have.property('to')
                response.body.should.have.property('date')
                response.body.should.have.property('departuretime')
                response.body.should.have.property('arrivaltime')
                response.body.should.have.property('fare')
                response.body.should.have.property('_id').eq('5f4c04462882572a04fa97e3')
                done();
                }); 
            });
            it("It should NOT GET a flight by id", (done)=>{
                const flightid='5f462e21e01962aa48722f62'
                chai.request('http://localhost:6000')
                .get("/api/flights/" +flightid)
                .end((err,response)=>{
                    response.should.have.status(404);
                    done();
                    }); 
                });
        });
     
     /**
     * Test the POST route
     */   
    describe("POST /api/flight", ()=>{
        it("It should POST a new flight", (done)=>{
            const flight={
                flight_name:"DEL-JAI-112",
                from:"Delhi",
                to:"Jaipur",
                date:"2020-06-03",
                departuretime:"18:00",
                arrivaltime:"21:00",
                fare:"4500"
            };
            chai.request('http://localhost:6000')
            .post("/api/flight")
            .send(flight)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object')
                response.body.should.have.property('flight_name')
                response.body.should.have.property('from')
                response.body.should.have.property('to')
                response.body.should.have.property('date')
                response.body.should.have.property('departuretime')
                response.body.should.have.property('arrivaltime')
                response.body.should.have.property('fare')
                done();
                });
            });
            it("It should Not POST a new flight without flight_name", (done)=>{
                const flight={
                    from:"Delhi",
                    to:"Jaipur",
                    date:"2020-06-03",
                    departuretime:"18:00",
                    arrivaltime:"21:00",
                    fare:"4500"
                };
                chai.request('http://localhost:6000')
                .post("/api/flights")
                .send(flight)
                .end((err,response)=>{
                    response.should.have.status(404);
                    done();
                    });
                });
        }); 

    
        describe("DELETE /api/flight/:_id", ()=>{
            it("It should DELETE a flight", (done)=>{
                const flightid='5f48e3a9d337be39ac58f1ea'
                chai.request('http://localhost:6000')
                .delete("/api/flight/" +flightid)
                .end((err,response)=>{
                    response.should.have.status(200);
                    done();
                    });
                });
                it("It should Not DELETE a flight that does not exist", (done)=>{
                    const flightid='5f48e3a9d337be39ac58f1ea'
                    chai.request('http://localhost:6000')
                    .delete("/api/flight/" +flightid)
                    .end((err,response)=>{
                        response.should.have.status(404);
                        done();
                        });
                    });
            });               
})