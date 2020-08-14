const Discord = require('discord.js')
const index = new Discord.Client()
const { readFileSync, readdirSync, writeFileSync } = require('fs')
const config = require('../config.json')
const http = require('http')
const warnedUserIds = require('../warneduserids.json')

exports.warnedUserIds = warnedUserIds
exports.bot = index
exports.config = config
exports.commands = {
  master: {},
  moderator: {},
  default: {},
  dm: {}
}

const registerCommand = (name, type, callback, aliases, description, usage) => {
  exports.commands[type][name] = { aliases, description, usage, process: callback }
}

const loadScript = (path, reload) => {
  require(path)
  if (reload) {
    console.log('Reloaded script at ' + path)
  } else {
    console.log('Script loaded at ' + path)
  }
}

const changeConfig = (guildID, callback) => {
  const path = './guilds/' + guildID + '.json'
  const data = JSON.parse(readFileSync(path))
  callback()
  writeFileSync(path, JSON.stringify(data, null, 2))
  console.log('Edited config in ' + path)
}

const getConfig = (guildID) => {
  const path = './guilds/' + guildID + '.json'
  let data
  try {
    data = JSON.parse(readFileSync(path))
  } catch (err) {
    setConfig(guildID, config)
    data = JSON.parse(readFileSync(path))
  }
  try { return data } catch (error) { console.log('An error occured: ' + error.stack) }
}

const setConfig = (guildID, config) => {
  const path = './guilds/' + guildID + '.json'
  writeFileSync(path, JSON.stringify(config, null, 2))
}

const getConfigValue = (guildID, name) => {
  const path = './guilds/' + guildID + '.json'
  const data = JSON.parse(readFileSync(path))
  try { return data[name] } catch (error) { console.log('An error occured: ' + error.stack) }
}

exports.registerCommand = registerCommand
exports.loadScript = loadScript
exports.changeConfig = changeConfig
exports.getConfigValue = getConfigValue
exports.getConfig = getConfig
exports.setConfig = setConfig

const commands = readdirSync('./commands/')
commands.forEach(script => {
  if (script.substring(script.length - 3, script.length) === '.js') {
    exports.loadScript('./commands/' + script)
  }
})

const modules = readdirSync('./modules/')
modules.forEach(script => {
  if (script.substring(script.length - 3, script.length) === '.js') {
    loadScript('./modules/' + script)
  }
})

exports.getHTTP = (link) => {
  if (!link) return undefined
  return new Promise((resolve, reject) => {
    let data = ''
    const request = http.request(link, res => {
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
