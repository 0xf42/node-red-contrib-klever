/*
The MIT License (MIT)

Copyright (c) 2022

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

module.exports = function(RED) {
  'use strict';

  function KleverNodeBalance(config) {
    RED.nodes.createNode(this, config);

    // Save settings in local node
    this.account = config.account;
    this.configNode = RED.nodes.getNode(this.account);
    this.name = config.name;
    this.contract = config.contract;

    let node = this;
    if (this.configNode) {

  		// Input handler, called on incoming flow
      this.on('input', function(msg, send, done) {

        node.configNode.kleverAccount
          .getBalance()
          .then((balance) => {

            msg.payload = balance;
            msg.address = node.configNode.address;

            send = send || function() { node.send.apply(node, arguments) }
            send(msg);

            if (done) {
              done();
            }
          })
          .catch((err) => {
            if (done) {
              done(err);
            } else {
              node.error(err, msg);
            }
          });

      });

      // Closing, get's called when new flow is deployed
      node.on("close", function(removed, done){
        done();
      });

    } else {
      this.error("Could not find config node");
    }
  }
  RED.nodes.registerType("klever-balance", KleverNodeBalance);
};
