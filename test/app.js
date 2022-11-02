// locean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai#test-the-delete-id-route

//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("To-Do's", () => {
  /*
   * Test the /GET route
   */

  describe("/GET todo", () => {
    it("it should GET all the to-do's", (done) => {
      chai
        .request(server)
        .get("/todo")
        .end((err, res) => {
          console.log(res.body, "find me");
          res.should.have.status(200);
          res.body.rows.should.be.a("array");
          res.body.rows.length.should.be.eql(11);
          done();
        });
    });

    it("it should return ERROR if wrong endpoint", (done) => {
      chai
        .request(server)
        .get("/toods")
        .end((err, res) => {
          res.should.have.status(404);
          //   res.body.rows.should.be.a("array");
          //   res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */

  describe("/POST todo", () => {
    it("it should not POST a todo without title", (done) => {
      let todo = {
        id: 10,
        name: "sweep floors",
        description: "bedroom",
        completed: false,
      };
      chai
        .request(server)
        .post("/todo")
        .send(todo)
        .end((err, res) => {
          res.should.have.status(200);

          done();
        });
    });

    it("it should GET two todos", (done) => {
      chai
        .request(server)
        .get("/todo")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.rows.should.be.a("array");
          res.body.rows.length.should.be.eql(12);
          res.body.rows[1].name.should.be.eql("sweep floors");
          done();
        });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe("/DELETE/:id todo", () => {
    it("it should DELETE a todo given the id", (done) => {
      chai
        .request(server)
        .delete("/todo")
        .send("19")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.rows.length.should.be.eql(11);
          done();
        });
    });
  });
});
