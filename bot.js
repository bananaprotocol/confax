const Discord = require('discord.js')
const bot = new Discord.Client()
const fs = require('fs')
const yaml = require('js-yaml')
const config = require('./config')
const http = require('http')
const dotenv = require('dotenv')
dotenv.load()

exports.bot = bot
exports.config = config
exports.commands = {
  master: {},
  moderator: {},
  default: {},
  dm: {}
}

registerCommand = function (name, type, callback, aliases, description, usage) {
  exports.commands[type][name] = {}
  exports.commands[type][name]['aliases'] = aliases
  exports.commands[type][name]['description'] = description
  exports.commands[type][name]['usage'] = usage
  exports.commands[type][name]['process'] = callback
}

var loadScript = (path, reload) => {
  var req = require(path)
  if (reload) {
    console.log('Reloaded script at ' + path)
  } else {
    console.log('Script loaded at ' + path)
  }
}

function changeConfig (guildID, callback) {
  var path = './GlassBotfiles/' + guildID + '.yml'
  var data = yaml.safeLoad(fs.readFileSync(path))
  callback()
  fs.writeFileSync(path, yaml.safeDump(data))
  console.log('Edited config in ' + path)
}

function getConfigValue (guildID, name) {
  var path = './GlassBotfiles/' + guildID + '.yml'
  var data = yaml.safeLoad(fs.readFileSync(path))
  try { return data[name] } catch (error) { console.log('An error occured: ' + error.stack) }
}

exports.registerCommand = registerCommand
exports.loadScript = loadScript
exports.changeConfig = changeConfig
exports.getConfigValue = getConfigValue

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
