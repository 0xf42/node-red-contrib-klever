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

  function KleverNodeTransaction(config) {
    RED.nodes.createNode(this, config);

    // Save settings in local node
    this.account = config.account;
    this.configNode = RED.nodes.getNode(this.account);
    this.name = config.name;
    this.contract = config.contract;

    this.transferReceiver = config.transferReceiver
    this.transferAmount = parseInt(config.transferAmount);
    this.transferAsset = config.transferAsset;
    this.freezeAmount = parseInt(config.freezeAmount);
    this.freezeAsset = config.freezeAsset;
    this.unfreezeBucketID = config.unfreezeBucketID;
    this.unfreezeAsset = config.unfreezeAsset;
    this.delegateReceiver = config.delegateReceiver;
    this.delegateBucketID = config.delegateBucketID;
    this.undelegateBucketID = config.undelegateBucketID;
    this.claimClaimType = parseInt(config.claimClaimType);
    this.claimId = config.claimId;
    this.withdrawAssetId = config.withdrawAssetId;
    this.setaccountnameName = config.setaccountnameName;


    let node = this;
    if (this.configNode) {

  		// Input handler, called on incoming flow
      this.on('input', function(msg, send, done) {

        // The contract can be set via UI or given by the msg object. At least one must be given.
        const contract = node.contract || msg.contract;
        if (!contract) {
          node.error("the property 'contract' is not set", msg);
          done();
          return;
        }
        if (msg.contract && node.contract && (node.contract !== msg.contract)) {
          node.warn(("'msg.contract' is set differently in 'msg' and node configuration"));
        }

        // Based on the type of contract we must prepare the correct payload and trigger
        // the transaction via the kleverSDK.
        // Settings are taken from node properties or (if not set) from the msg.payload. UI has precedence.
        let transactionResponse;
        switch(contract) {

          case 'CONTRACT_TRANSFER':
            transactionResponse = node.configNode.kleverAccount.sendTransfer({
              receiver: node.transferReceiver || msg.payload.receiver,
              amount: node.transferAmount || msg.payload.amount,
              asset: node.transferAsset || msg.payload.asset,
            });
            break;

          case 'CONTRACT_FREEZE':
            transactionResponse = node.configNode.kleverAccount.sendFreeze({
              amount: node.freezeAmount || msg.payload.amount,
              asset: node.freezeAsset || msg.payload.asset
            });
            break

          case 'CONTRACT_UNFREEZE':
            transactionResponse = node.configNode.kleverAccount.sendUnfreeze({
              amount: node.unfreezeBucketID || msg.payload.bucketID,
              asset: node.unfreezeAsset || msg.payload.asset
            });
            break;

          case 'CONTRACT_DELEGATE':
            transactionResponse = node.configNode.kleverAccount.sendDelegate({
              receiver: node.delegateReceiver || msg.payload.receiver,
              bucketID: node.delegateBucketID || msg.payload.bucketID
            });
            break;

          case 'CONTRACT_UNDELEGATE':
            transactionResponse = node.configNode.kleverAccount.sendUndelegate({
              bucketID: node.undelegateBucketID || msg.payload.bucketID
            });
            break;

          case 'CONTRACT_CLAIM':
            transactionResponse = node.configNode.kleverAccount.sendClaim({
              claimType: node.claimClaimType || msg.payload.claimType,
              id: node.claimId || msg.payload.id
            });
            break;

          case 'CONTRACT_WITHDRAW':
            transactionResponse = node.configNode.kleverAccount.sendWithdraw({
              assetId: node.withdrawAssetId || msg.payload.assetId
            });
            break;

          case 'CONTRACT_UNJAIL':
            transactionResponse = node.configNode.kleverAccount.sendUnjail();
            break;

          case 'CONTRACT_SET_ACCOUNT_NAME':
            transactionResponse = node.configNode.kleverAccount.setAccountName({
              name: node.setaccountnameName || msg.payload.name
            });
            break;

          default: {
            node.error(`the contract ${contract} is unknown or not supported`, msg);
            done();
            return;
          }
        }

        // Query the transaction result
        transactionResponse.then((tx) => {

          // The resulting transaction hash is put into the payload as result
          msg.payload.tx = tx;

          // Emit the msg object from the node
          send = send || function() { node.send.apply(node, arguments) }
          send(msg);

          if (done) {
            done();
          }
        })
        .catch((err) => {

          // Something went wrong, report the error message and trigger error
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
  RED.nodes.registerType("klever-transaction", KleverNodeTransaction);
};
