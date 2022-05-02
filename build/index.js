"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _cluster = _interopRequireDefault(require("cluster"));

var _require = require('./app'),
    initializeMicroService = _require.initializeMicroService;

var workers = [];

var setUpCluster = function setUpCluster() {
  var numCores = require('os').cpus().length;

  if (_cluster["default"].isPrimary) {
    console.log('Master cluster setting up ' + numCores + ' workers');

    for (var i = 0; i < numCores; i++) {
      workers.push(_cluster["default"].fork());
      workers[i].on('message', function (message) {
        console.log(message);
      });
    }
  }

  _cluster["default"].on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' is listening');
  }); // if any of the worker process dies then start a new one by simply forking another one


  _cluster["default"].on('exit', function (worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');

    _cluster["default"].fork();

    workers.push(_cluster["default"].fork()); // to receive messages from worker process

    workers[workers.length - 1].on('message', function (message) {
      console.log(message);
    });
  });
};

var setUpService = function setUpService() {
  //setUpCluster()
  initializeMicroService();
};

setUpService();