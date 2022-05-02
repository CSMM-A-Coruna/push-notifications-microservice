const { initializeMicroService } = require('./app')
import cluster from 'cluster'

let workers = []

const setUpCluster = () => {
  let numCores = require('os').cpus().length
  if (cluster.isPrimary) {
    console.log('Master cluster setting up ' + numCores + ' workers')
    for (let i = 0; i < numCores; i++) {
      workers.push(cluster.fork())
      workers[i].on('message', function (message) {
        console.log(message)
      })
    }
  }

  cluster.on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' is listening')
  })

  // if any of the worker process dies then start a new one by simply forking another one
  cluster.on('exit', function (worker, code, signal) {
    console.log(
      'Worker ' +
        worker.process.pid +
        ' died with code: ' +
        code +
        ', and signal: ' +
        signal
    )
    console.log('Starting a new worker')
    cluster.fork()
    workers.push(cluster.fork())
    // to receive messages from worker process
    workers[workers.length - 1].on('message', function (message) {
      console.log(message)
    })
  })
}

const setUpService = () => {
  //setUpCluster()
  initializeMicroService()
}

setUpService()
