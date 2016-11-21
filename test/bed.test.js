let mongoose = require("mongoose");
let Bed = require('../app/models/bed.model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Beds', () => {
    beforeEach((done) => { //Before each test we empty the database
        Bed.remove({}, (err) => { 
           done();         
        });     
    });
  describe('/GET bed', () => {
      it('it should GET all the beds', (done) => {
        chai.request(server)
        .get('/api/beds')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
          done();
        });
      });
  });
  describe('/POST bed', () => {
      it('it should not POST a bed without "text" field', (done) => {
        let bed = {
            width: 3,
            height: 10
        };
        chai.request(server)
        .post('/api/beds')
        .send(bed)
        .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('text');
            res.body.errors.text.should.have.property('kind').eql('required');
          done();
        });
      });
      it('it should POST a bed ', (done) => {
        let bed = {
            text: "test bed",
            width: 3,
            height: 10
        };
        chai.request(server)
        .post('/api/beds')
        .send(bed)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('text');
            res.body[0].should.have.property('created');
            res.body[0].should.have.property('plants');
          done();
        });
      });
  });
  describe('/DELETE/:id bed', () => {
      it('it should DELETE a bed given the id', (done) => {
        let bed = {
            text: "test bed to delete",
            width: 3,
            height: 10
        };
        chai.request(server)
        .post('/api/beds')
        .send(bed)
        .end((err, res) => {
            var bedID = res.body[0]._id;
            chai.request(server)
            .delete('/api/beds/' + bedID)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('text');
                res.body[0].should.have.property('created');
                res.body[0].should.have.property('plants');
              done();
            });
          done();
        });
      });
  });
});
