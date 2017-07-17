/*jshint esversion: 6 */
/*jshint asi: true */

const Discord = require('discord.js');
const GlassBot = require('../bot.js')
const bot = GlassBot.bot
    //const config = GlassBot.config

bot.on('message', message => {
    if (message.author.bot) return

    if (message.content == "(╯°□°）╯︵ ┻━┻")
        message.channel.send("┬─┬ ノ( ゜-゜ノ)")

    return
});