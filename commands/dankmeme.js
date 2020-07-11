const Confax = require('../bot.js')
const Discord = require('discord.js')
const https = require('https')
const url = 'https://www.reddit.com/r/dankmemes.json?limit=100'

Confax.registerCommand('dankmeme', 'default', (message, bot) => {
  https.get(url, (result) => {
    let body = ''
    result.on('data', (chunk) => {
      body += chunk
    })

    result.on('end', () => {
      let response = JSON.parse(body)
      let index = response.data.children[Math.floor(Math.random() * 99) + 1].data
      let subRedditName = index.subreddit_name_prefixed
      let title = index.title
      let link = 'https://www.reddit.com' + index.permalink
      let text = index.selftext
      if (index.post_hint !== 'image') {
        const textEmbed = new Discord.MessageEmbed()
          .setTitle(subRedditName)
          .setColor(9384170)
          .setDescription(`[${title}](${link})\n\n${text}`)
          .setURL(`https://www.reddit.com/${subRedditName}`)

        message.channel.send(textEmbed)
      }
      let image = index.preview.images[0].source.url
      if (index.post_hint !== 'image') {
        const textEmbed = new Discord.MessageEmbed()
          .setTitle(subRedditName)
          .setColor(9384170)
          .setDescription(`[${title}](${link})\n\n${text}`)
          .setURL(`https://www.reddit.com/${subRedditName}`)

        message.channel.send(textEmbed)
      }
      const imageEmbed = new Discord.MessageEmbed()
        .setTitle(subRedditName)
        .setImage(image)
        .setColor(9384170)
        .setDescription(`[${title}](${link})`)
        .setURL(`https://www.reddit.com/${subRedditName}`)
      message.channel.send(imageEmbed)
    }).on('error', function (e) {
      console.log('Got an error: ', e)
    })
  })
}, ['dank', 'meme'], 'Get a random meme from r/dankmemes (potentially NSFW)', '[]')
