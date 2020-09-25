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
            dDate ="2020-06-03";
            console.log(dDate)
            chai.request('http://localhost:5000')
            .post("/api/flight")
            .send({
                from:"Delhi",
                to:"Jaipur",
                date:dDate
            })
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('array')
                done();
                });
            });
            it("It should NOT GET all the flights", (done)=>{
                dDate ="2020-06-03";
                console.log(dDate)
                chai.request('http://localhost:5000')
                .get("/api/fligh")
                .send({
                    from:"Delhi",
                    to:"Jaipur",
                    date:dDate
                })
                .end((err,response)=>{
                    response.should.have.status(404);
                    done();
                    });
                });
        });

    })
