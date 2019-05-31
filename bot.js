const Discord = require('discord.js')
const bot = new Discord.Client()
const fs = require('fs')
const config = require('./config')
const http = require('http')
const dotenv = require('dotenv')
const warnedUserIds = require('./warneduserids')
dotenv.load()

exports.warnedUserIds = warnedUserIds
exports.bot = bot
exports.config = config
exports.commands = {
  master: {},
  moderator: {},
  default: {},
  dm: {}
}

var registerCommand = function (name, type, callback, aliases, description, usage) {
  exports.commands[type][name] = { aliases, description, usage, process: callback }
}

var loadScript = (path, reload) => {
  require(path)
  if (reload) {
    console.log('Reloaded script at ' + path)
  } else {
    console.log('Script loaded at ' + path)
  }
}

function changeConfig (guildID, callback) {
  var path = './guilds/' + guildID + '.json'
  var data = JSON.parse(fs.readFileSync(path))
  callback()
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
  console.log('Edited config in ' + path)
}

function getConfig (guildID) {
  var path = './guilds/' + guildID + '.json'
  var data = JSON.parse(fs.readFileSync(path))
  try { return data } catch (error) { console.log('An error occured: ' + error.stack) }
}

function setConfig (guildID, config) {
  var path = './guilds/' + guildID + '.json'
  fs.writeFileSync(path, JSON.stringify(config, null, 2))
}

function getConfigValue (guildID, name) {
  var path = './guilds/' + guildID + '.json'
  var data = JSON.parse(fs.readFileSync(path))
  try { return data[name] } catch (error) { console.log('An error occured: ' + error.stack) }
}

exports.registerCommand = registerCommand
exports.loadScript = loadScript
exports.changeConfig = changeConfig
exports.getConfigValue = getConfigValue
exports.getConfig = getConfig
exports.setConfig = setConfig

var commands = fs.readdirSync('./commands/')
commands.forEach(script => {
  if (script.substring(script.length - 3, script.length) === '.js') {
    exports.loadScript('./commands/' + script)
  }
})

var modules = fs.readdirSync('./modules/')
modules.forEach(script => {
  if (script.substring(script.length - 3, script.length) === '.js') {
    loadScript('./modules/' + script)
  }
})

exports.getHTTP = (link) => {
  if (!link) return undefined
  return new Promise((resolve, reject) => {
    let data = ''
    let request = http.request(link, res => {
      res.on('data', chunk => {
        data += chunk
      })

      res.on('end', () => {
        resolve(data)
      })

      res.on('error', err => {
        reject(err)
      })
    })
    request.end()
  })
}
