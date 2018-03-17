/*  Copyright (c) 2018, Klendi Gocci.

    17 March, 2018
    https://github.com/klendi
    https://twitter.com/klendigocci

    ------------------------------------------------------------------------
    Explains a word or a sentence from urban-dictionary API

    The following command is uisng a free API from http://urbandictionary.com/
    The API request can be found here: http://api.urbandictionary.com/v0/

    Usage:
      !urban <Any Word Or Sentence Here>

    Example:
      !urban gtg
    
    GTG
      ------ Definition ------
      Internet shorthand for "got to go". Also it can mean "good to go" depending on contex
      ------ Second Definition ------
      got to go

      ------ First Example ------
      Good to go:
      "Say im heading out. You coming?"
      "gtg"

      Got to go:
      "Shoot, it's almost midnight gtg."
      ------ Second Example ------
      Rachel I gtg
    ------------------------------------------------------------------------

*/
'use strict'
const Discord = require('discord.js');
const Confax = require('../bot.js');
const http = require('http')

var methods = {}
var randomCache = []

Confax.registerCommand('urban', 'default', (message) => {
    let msg = message.content + '';

    term(msg, function(error, entries) {
        if (error) {
            console.error(error.message)
            message.channel.send(error.message);
        } else {
            if (entries.length == 1) {
                message.channel.send({
                    embed: {
                        color: 9384170,
                        title: '**' + entries[0].word + '**',
                        fields: [{
                                name: "Definition",
                                value: entries[0].definition
                            },
                            {
                                name: "**Example**",
                                value: entries[0].example
                            },
                        ],
                    }
                });
            }
            else if (entries.length > 1) {
                message.channel.send({
                    embed: {
                        color: 9384170,
                        title: '**' + entries[0].word + '**',
                        fields: [{
                                name: "Definition",
                                value: entries[0].definition
                            },
                            {
                                name: 'Second Definition',
                                value: entries[1].definition
                            },
                            {
                                name: "**First Example**",
                                value: entries[0].example
                            },
                            {
                                name: "**Second Example**",
                                value: entries[1].example
                            },
                        ],
                    }
                });
            }
        }
    })

}, ['urban', 'urban', 'urban-dict'], 'Get urban dictionary word explanation!', '[]')

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
      try {
        callback(null, JSON.parse(rawData))
      } catch (error) {
        callback(new Error('Failed to parse retrieved Urban Dictionary JSON.'))
        console.log('rawData is: ' + rawData)
      }
    })
  })
}

function term (word, callback) {
  get('http://api.urbandictionary.com/v0/define?term=' + encodeURIComponent(word), function (error, result) {
    if (error) {
      callback(error)
      return
    }

    if (!result || result.result_type !== 'exact') {
      callback(new Error(word + ' is undefined.'))
      return
    }

    callback(null, result.list)
  })
}