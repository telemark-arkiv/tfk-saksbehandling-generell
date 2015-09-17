'use strict'

function createPipeline (item, callback) {
  var thru = require('thru')
  var pipeline = thru()
  var prepareItem = require('./lib/prepareItem')
  var lookupDSF = require('./lib/lookupDSF')
  var lookupBRREG = require('./lib/lookupBRREG')
  var doSaksbehandling = require('./lib/doSaksbehandling')
  var cleanupItem = require('./lib/cleanupItem')
  var writeToFile = require('./lib/writeToFile')

  pipeline
    .pipe(prepareItem)
    .pipe(lookupDSF)
    .pipe(lookupBRREG)
    .pipe(doSaksbehandling)
    .pipe(cleanupItem)
    .pipe(writeToFile)

  writeToFile.on('finish', function () {
    return callback(null, 'File ' + item._id + '.json' + ' written.')
  })

  pipeline.write(JSON.stringify(item))

}

module.exports = createPipeline