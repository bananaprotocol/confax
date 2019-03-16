const Discord = require('discord.js')
const Confax = require('../bot.js')

Confax.registerCommand('prefix', 'moderator', (message, bot) => {
  const args = message.content.split(' ');
  const prefix = args.join(' ');
  if (!prefix) return message.reply('Sorry, but you must specify what you want to set the custom server prefix as.');
  bot.prefixes.set(message.guild.id, prefix);
  const embed = new Discord.RichEmbed()
    .setTitle('Prefix Set!')
    .setDescription(`The server custom prefix has been set to ${prefix}`)
    .setColor('RANDOM');
  return message.channel.send(embed);
}, ['setprefix', 'changeprefix'], 'Changes the custom guild prefix.', '[]')
