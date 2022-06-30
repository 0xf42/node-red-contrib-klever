/**
 *
 * MIT License
 *
 * Copyright (c) 2022
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
 require('dotenv').config()

// Initialize the Node-RED test helper (https://github.com/node-red/node-red/wiki/Testing)
const helper = require("node-red-node-test-helper");
helper.init(require.resolve("node-red"));

const kleverAccount = require("../klever-account.js");
const kleverBalance = require("../klever-balance.js");

const expect = require("chai").expect;



//// TESTS ////////////////////////////////////////////////////////////////////
describe("klever-balance", function() {

  function getAddress() {
    return process.env.TEST_ADDRESS;
  }
  function getPrivateKey() {
    return process.env.TEST_PRIVATE_KEY;
  }

  // We need to reset Node-RED test framework after each test
  beforeEach(function(done) {
    helper.startServer(done);
  });
  afterEach(function (done) {
    helper.unload().then(function() {
      helper.stopServer(done);
    });
  });


  it("should be deployed", function(done) {

    let flow = [
      {"id":"h1","type":"helper"},
      {"id":"n1","type":"klever-balance","account":"c1","name":"balance1","wires":[["h1"]]},
      {"id":"c1","type":"klever-account","name":"klever1"}
    ];
    let credentials = {
      c1: {
        address: "aaa",
        privateKey: "bbb"
      }
    };

    helper.load([kleverAccount, kleverBalance], flow, credentials, () => {

      let c1 = helper.getNode("c1");
      c1.should.have.property("name", "klever1");
      c1.should.have.property("credentials", {
        address: "aaa",
        privateKey: "bbb"
      });

      let n1 = helper.getNode("n1");
      n1.should.have.property("name", "balance1");

      done();
    });

  });


  it("should get a balance", function(done) {

    let flow = [
      {"id":"h1","type":"helper"},
      {"id":"n1","type":"klever-balance","account":"c1","name":"balance1","wires":[["h1"]]},
      {"id":"c1","type":"klever-account","name":"klever1"}
    ];
    let credentials = {
      c1: {
        address: getAddress(),
        privateKey: getPrivateKey()
      }
    };

    helper.load([kleverAccount, kleverBalance], flow, credentials, () => {

      let n1 = helper.getNode("n1");
      let h1 = helper.getNode("h1");

      h1.on("input", (msg) => {
        try {
          // There should be some KLV on our test account
          expect(msg).to.have.property('payload').that.is.a('number').greaterThan(1);
          done();
        }
        catch(err){
          done(err);
        }
      });

      n1.receive({ payload: "" });
    });

  });



});
