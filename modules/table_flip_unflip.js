/*
	Table unflip by Klendi Gocci
	17.7.2017
	https://github.com/klendigocci
	https://twitter.com/klendigocci

	Example:

	Klendi: (╯°□°）╯︵ ┻━┻

	Subiex(bot) ┬─┬﻿ ノ( ゜-゜ノ)
*/

const Discord = require('discord.js')
const Confax = require('../bot.js')
const bot = Confax.bot
const config = Confax.config


const emojis = [
		"( ͡° ͜ʖ ͡°)",
		"¯\\_(ツ)_/¯",
		"ʕ•ᴥ•ʔ",
		"(▀̿Ĺ̯▀̿ ̿)",
		"(ง ͠° ͟ل͜ ͡°)ง",
		"ಠ_ಠ",
		"̿'̿'\\̵͇̿̿\\з=( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/'̿̿ ̿ ̿ ̿ ̿ ̿",
		"[̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]",
		"﴾͡๏̯͡๏﴿ O'RLY?",
		"[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅]",
		"(ᵔᴥᵔ)",
		"(¬‿¬)",
		"(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)",
		"(づ￣ ³￣)づ",
		"ლ(ಠ益ಠლ)",
		"ಠ╭╮ಠ",
		"♪~ ᕕ(ᐛ)ᕗ",
		"ヾ(⌐■_■)ノ♪",
		"◉_◉",
		"\\ (•◡•) /",
		"༼ʘ̚ل͜ʘ̚༽",
		"┬┴┬┴┤(･_├┬┴┬┴",
		"ᕦ(ò_óˇ)ᕤ",
		"┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻",
		"（╯°□°）╯︵( .o.)"
	];

	const phrases = 
	["Take it easy pal",
	"Whoa",
	"Why always me"
	,"Awesome, another table to unflip",
	"I will have my eyes on you ┬┴┬┴┤(･_├┬┴┬┴"];

	function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


	bot.on('message', message => {
		 if(message.content.includes("(╯°□°）╯︵ ┻━┻"))
		{
			var index = getRandomInt(0,4);
			message.channel.send(phrases[index]);
			message.channel.send("┬─┬﻿ ノ( ゜-゜ノ)");
		}
		else if(message.content.startsWith("!doubleflip"))
		{
			message.channel.send("┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻")
		}
		else if(message.content === "!moji")
	{
		var index = getRandomInt(0,24);
		message.channel.send(emojis[index]);
	}
	})

