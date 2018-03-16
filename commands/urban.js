'use strict'
const Discord = require('discord.js');
const Confax = require('../bot.js');
const ud = require('./urban-dictionary')

Confax.registerCommand('urban', 'default', (message) => {
    let msg = message.content + '';

    ud.term(msg, function(error, entries, tags, sounds) {
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