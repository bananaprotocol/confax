'use strict'

const http = require('http')

var methods = {}
var randomCache = []

function get (url, callback) {
  http.get(url, function (result) {
    const contentType = result.headers['content-type']
    const statusCode = result.statusCode

    let error
    if (statusCode !== 200) {
      error = new Error('Unable to send request for definitions. Status code: ' + statusCode)
    } else if (contentType.indexOf('application/json') === -1) {
      error = new Error("Content retrieved isn't JSON. Content type: '" + contentType + "'")
    }

    if (error) {
      // Removes response data to clear up memory.
      result.resume()
      callback(error)
      return
    }

    result.setEncoding('utf8')

    let rawData = ''
    result.on('data', function (buffer) {
      rawData += buffer
    })
    result.on('end', function () {
      // try {
        callback(null, JSON.parse(rawData))
      // } catch (error) {
      //   callback(new Error('Failed to parse retrieved Urban Dictionary JSON.'))
      //   console.log('rawData is: ' + rawData)
      // }
    })
  })
}

methods.defid = function defid (id, callback) {
  get('http://api.urbandictionary.com/v0/define?defid=' + id, function (error, result) {
    if (error) {
      callback(error)
      return
    }

    if (!result || result.result_type !== 'exact') {
      callback(new Error('No result found.'))
      return
    }

    callback(null, result.list[0], result.tags, result.sounds)
  })
}

methods.random = function random (callback) {
  if (!randomCache[0]) {
    get('http://api.urbandictionary.com/v0/random', function (error, result) {
      if (error) {
        callback(error)
        return
      }
      randomCache = result.list
      callback(null, randomCache[0])
      randomCache.splice(0, 1)
    })
  } else {
    callback(null, randomCache[0])
    randomCache.splice(0, 1)
  }
}

methods.term = function term (word, callback) {
  get('http://api.urbandictionary.com/v0/define?term=' + encodeURIComponent(word), function (error, result) {
    if (error) {
      callback(error)
      return
    }

    if (!result || result.result_type !== 'exact') {
      callback(new Error(word + ' is undefined.'))
      return
    }

    callback(null, result.list, result.tags, result.sounds)
  })
}

module.exports = methods
