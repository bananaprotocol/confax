/*jshint esversion: 6 */
/*jshint asi: true */

const Discord = require('discord.js');
const GlassBot = require('../bot.js')
const bot = GlassBot.bot
    //const config = GlassBot.config

var isFlipped = false

// bot.on('message', message => {
//     if (message.author.bot) return
//     if (message.content.includes("(╯°□°）╯︵ ┻━┻"))
//         message.channel.send("┬─┬ ノ( ゜-゜ノ)")
//     return
// });

bot.on('message', message => {
    if (message.author.bot) return
    s
    if (message.content.includes("(╯°□°）╯︵ ┻━┻")) {
        if (!isFlipped) {
            isFlipped = true
            return
        } else {
            message.delete()
            message.channel.send("Table is already flipped.. you can't flip a table thats flipped.")
            return
        }
    } else if (message.content.includes("┬─┬ ノ( ゜-゜ノ)"))
        isFlipped = false

    return
});