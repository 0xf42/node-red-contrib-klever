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

'use strict';

require('dotenv').config()
require("../assets/kleverSDK/kleverSDKLoader");
globalThis.kleverSDKPath = require.resolve("@klever/sdk/dist/kleverSDK/kleverSDK.wasm");
require("@klever/sdk/dist/kleverSDKLoader");
const kleverSDK = require("@klever/sdk");


if(kleverSDK.core.isSDKLoaded()) {
  console.log("SDK loaded");
} else {
  console.error("SDK NOT loaded!");
}



//// Credentials //////////////////////////////////////////////////////////////
function getAddress() {
  return process.env.TEST_ADDRESS;
}
function getPrivateKey() {
  return process.env.TEST_PRIVATE_KEY;
}



//// Globals //////////////////////////////////////////////////////////////////
const account = new kleverSDK.Account(getAddress(), getPrivateKey());



//// Test functions for development ///////////////////////////////////////////
async function testBalance() {

  try {
    console.log(await account.getBalance());
  } catch (err) {
    console.error('Housten we are in trouble: ' + err);
  }

}

async function testTransaction() {

  try {
    const transactionPayload = {
      receiver: "klv1hyp7cnw2cjj298yhghw27p84w2rdkw7k8qq740maxcazulgmva9s0ahjpw",
      amount: 1,
    };

    account
      .sendTransfer(transactionPayload)
      .then((tx) => console.log(tx))
      .catch((err) => console.log(err));

  } catch (err) {
    console.error('Housten we are in trouble: ' + err);
  }

}



//// Exports //////////////////////////////////////////////////////////////////
exports.testBalance = testBalance;
exports.testTransaction = testTransaction;

//testBalance();
//testTransaction();

