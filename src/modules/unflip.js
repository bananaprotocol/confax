/*
  Table unflip by Klendi Gocci
	This contains other dope things
	18.7.2017
	https://github.com/klendigocci
	https://twitter.com/klendigocci

	Example:

	Klendi: (╯°□°）╯︵ ┻━┻

	Subiex(bot): ┬─┬﻿ ノ( ゜-゜ノ)
*/
const Confax = require('../bot.js')
const bot = Confax.bot

bot.on('message', message => {
  if (message.content.includes('(╯°□°）╯︵ ┻━┻')) {
    message.channel.send('┬─┬﻿ ノ( ゜-゜ノ)')
  }
})
