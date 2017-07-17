const Discord = require('discord.js')
const Confax = require('../bot.js')
const request = require('request')

Confax.registerCommand('flip', 'default', (message) => {
    let results = (Math.round((Math.random())) == 1) ? 'heads' : 'tails'
    message.channel.send(results)

}, ['flip'], 'flip a coin', '[]')