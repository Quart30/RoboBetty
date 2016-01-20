var request = require('supertest');

var config = require('../config/config');
var should = require('chai').should();

// Wrapper that creates admin user to allow api calls
var ConfigureAuth = require('./ConfigureAuth');


describe("Employee", function() {
    var url = "localhost:" + config.port;

    var credentials;  // variable to hold all the need authentication variables.

    // before function is called at the very beginning of the 'Forms' test suite,
    // no tests are run until the done() callback is called.
    before(function(done) { 
      // setupAdmin will create and admin and log you in, give it a callback that will give you 
      // the credentials you need. Make sure to call done() inside ConfigureAuth's callback!
      ConfigureAuth.setupAdmin(function(cred) {
        credentials = cred;
        done();
      });
    });

    var templateFormId = null;


    describe("Employee Testing", function() {

      // TEST POST
      describe('POST /api/employee', function(){
        it('should save submitted employee', function(done){
          request(url)
            .post('/api/employee')
            .query({email: credentials.email, token: credentials.token})
            .send({
              _admin_id: credentials.admin._id,
              //form: submittedForm,
              name: "John",
              email: "jt@tomcruise.com",
              phone_number: "123456789",
            })
            .end(function(err, res){
              if(err)
                throw(err);
              //console.log(err);
              //console.log(res);
              //res.body.should.have.property('_admin_id').and.be.equal(''+credentials.admin._id);
              res.body.should.have.property('name').and.be.equal("John");
              res.body.should.have.property('email').and.be.equal("jt@tomcruise.com");

              returnedId = res.body._id;
              done();
            });
        });
      });

      // TEST PUT
      describe('PUT /api/employee/:id', function(){
        it('Should update the employee data', function(done){
          request(url)
            .put('/api/employee/' + returnedId)
            .query({email: credentials.email, token: credentials.token})
            .send({
              _admin_id: credentials.admin._id,
              email: "updated_email@tomcruise.com",
              phone_number: "987654321",
            })
            .end(function(err, res){
              if(err)
                throw(err);

              res.body.should.have.property('email').and.be.equal("updated_email@tomcruise.com");
              res.body.should.have.property('phone_number').and.be.equal("987654321");
              done();
            });
        });
      });

      // TEST GET ALL EMPLOYEES
      describe('GET /api/employee/admin/:id', function(){
          it("should return all employees", function(done){

            request(url)
              .get('/api/employee/admin/'+credentials.admin._id)
              .query({email: credentials.email, token: credentials.token})
              .send({
                _admin_id: credentials.admin._id
              })
              .end(function(err, res){
                           
                //console.log("RESPONSE", res)
                res.body.should.be.instanceof(Object);
                //res.body.should.not.be.empty;
                res.body.should.not.be.empty();
                //res.body.should.exist;
                should.exist(res.body);
                res.body.should.have.length.of.at.least(1);
                res.body.should.be.an.instanceof(Array);

                done();
            });
          });
        });

		// TEST GET A SPECIFIC EMPLOYEE
        describe('GET /api/employee/:id', function(){
          it("should return a specific employee", function(done){
            request(url)
              .get('/api/employee/' + returnedId)
              .query({email: credentials.email, token: credentials.token})
              .end(function(err, res){
             
              res.body.should.have.property('_id');
              res.body.should.have.property('email');
              res.body.should.have.property('name');
              res.body.should.have.property('phone_number');

              res.body.should.be.instanceof(Object);

              res.body._id.should.equal(returnedId);
              done();
            });
          });
        });
      
      // TEST DELETE
      describe('DELETE /api/employee/:id', function(){
        it('Should delete the employee data', function(done){
          request(url)
            .delete('/api/employee/' + returnedId)
            .query({email: credentials.email, token: credentials.token})
            .end(function(err, res){
              res.text.should.equal('deleted ' + returnedId);
              done();
            });
        });
      });


    
    });


    after(function(done) {
      // give cleanupAuth the email of the admin user it created earlier.
      ConfigureAuth.cleanupAuth(credentials.email, done);
    });
  }
);