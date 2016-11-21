let mongoose = require("mongoose");
let Plant = require('../app/models/plant.model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Plants', () => {
  describe('/GET plant', () => {
	  it('it should GET all the [plants]', (done) => {
		chai.request(server)
	    .get('/api/plants')
	    .end((err, res) => {
		  	res.should.have.status(200);
		  	res.body.should.be.a('array');
		  	res.body.length.should.be.eql(10);
		  	res.body[0].should.have.property('_id');
		  	res.body[0].should.have.property('class');
		  	res.body[0].should.have.property('name');
	      done();
	    });
	  });
  });
});
