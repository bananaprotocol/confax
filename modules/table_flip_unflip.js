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

const Discord = require('discord.js')
const Confax = require('../bot.js')
const bot = Confax.bot
const config = Confax.config


const emojis = 
[
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
		"（╯°□°）╯︵( .o.)",
		"ಠ‿↼",
		"◔ ⌣ ◔",
		"(ノಠ益ಠ)ノ彡┻━┻",
		"(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)",
		"̿ ̿ ̿'̿'\̵͇̿̿\з=(•_•)=ε/̵͇̿̿/'̿'̿ ̿",
		"(;´༎ຶД༎ຶ`)",
		"♥‿♥",
		"ᕦ(ò_óˇ)ᕤ",
		"(•_•) ( •_•)>⌐■-■ (⌐■_■)",
		"⌐╦╦═─ ಠ_ಠ , (¬‿¬)",
		"˙ ͜ʟ˙",
		":')",
		"(°ロ°)☝",
		"ಠ⌣ಠ",
		"(；一_一)",
		"( ⚆ _ ⚆ )",
		"☜(⌒▽⌒)☞",
		"(ʘᗩʘ')",
		"¯\\(°_o)/¯",
		"ლ,ᔑ•ﺪ͟͠•ᔐ.ლ",
		"(ʘ‿ʘ)",
		"ಠ~ಠ",
		"ಠ_ಥ",
		"ಠ‿↼",
		"(>ლ)",
		"(ღ˘⌣˘ღ)",
		"ಠoಠ",
		"ರ_ರ",
		"◔ ⌣ ◔",
		"(✿´‿`)",
		"ب_ب",
		"┬─┬﻿ ︵ /(.□. ）",
		"☼.☼",
		"^̮^",
		"(>人<)",
		">_>",
		"(/) (°,,°) (/)",
		"(･.◤)",
		"=U",
		"~(˘▾˘~)",
		"| (• ◡•)| (❍ᴥ❍ʋ)"
];
	const deep_quotes =
	[
		'"How can mirrors be real if our eyes aren\'t real?"',
		"It's true that we don't know what we've got until we lose it, but it's also true that we don't know what we've been missing until it arrives.",
		'"Tomorrow is the first day of the rest of your life"',
		"\"The ballparks have gotten too crowded. That's why nobody goes to see the game anymore.\"",
		"The similarities between me and my father are different.",
		"You guys pair up in groups of three, then line up in a circle",
		"I play football. I'm not trying to be a professor. The tests don't seem to make sense to me, measuring your brain on stuff I haven't been through in school.",
		"I'm going to graduate on time, no matter how long it takes.",
		"If I did that, I'd be sticking my head in a moose",
		"Smoking kills, and if you're killed, you've lost a very important part of your life.",
		"\"Who in their right mind would ever need more than 640k of ram!? - Bill Gates 1981\"",
		"The average woman would rather have beauty than brains, because the average man can see better than he can think.",
		"One of the great things about books is sometimes there are some fantastic pictures",
		"Always remember: you're unique, just like everyone else.",
		"The road to success is always under construction.",
		"When everything's coming your way, you're in the wrong lane.",
		"Everybody wants to go to heaven, but nobody wants to die.",
		"He who laughs last, didn't get it.",
		"Half of the people in the world are below average.",
		"Chuck Norris frequently donates blood to the Red Cross. Just never his own.",
		"Middle age is when your age starts to show around your middle.",
		"I am so clever that sometimes I don't understand a single word of what I am saying.",
		"When it comes to thought, some people stop at nothing.",
		"Happiness is having a large, loving, caring, close-knit family in another city.",
		"Don't tell me the sky is the limit when there are footprints on the moon.",
		"Why do psychics have to ask you for your name?",
		"I get enough exercise pushing my luck.",
		"The more people I meet, the more I like my dog.",
		"There are three kinds of people in this world: those who can count and those who can't.",
		"When life hands you lemons, make lemonade, find the person that life handed vodka to, and have a party.",
		"God created the world, everything else is made in China.",
		"Before you criticize someone, walk a mile in their shoes. That way, you’ll be a mile from them, and you’ll have their shoes.",
		"You never truly understand something unless you can explain it to your grandmother.",
		"Error. No keyboard. Press F1 to continue.",
		"Experience is what you get when you didn’t get what you wanted.",
		"hey occifer i swear to drunk im not as god as you think i am.",
		"Change is good, but dollars are better.",
		"Solution to two of the world’s problem: feed the homeless to the hungry.",
		"When life gives you melons . . . you might be dyslexic.",
		"Those who criticize our generation seem to forget who raised it!",
		"Children in the back seat cause accidents, accidents in the back seat cause children!",
		"How do you know when you are too drunk to drive? When you swerve to miss a tree . . . and then realize it was your air-freshener.",
		"Alcohol, what's that? It's not in my vodkabulary, but let me check in whiskypedia.",
		"I solemnly swear that I am up to no good.",
		"An apple a day keeps anyone anyway, if you throw it hard enough.",
		"When my boss asked me who is the stupid one, me or him? I told him everyone knows he doesn't hire stupid people.",
		"No matter how smart you are you can never convince someone stupid that they are stupid.",
		'A cop pulled me over and told me "Papers", so I said "Scissors, I win!" and drove off.',
		"If you think your boss is stupid, remember: you wouldn't have a job if he was any smarter.",
		"How can my feet smell if they don't have a nose?"
	];

	function getRandomInt(min, max) 
	{
    	return Math.floor(Math.random() * (max - min + 1)) + min; 
	}


	bot.on('message', message => {
		
		if(message.content.includes("(╯°□°）╯︵ ┻━┻"))
		{
			message.channel.send("┬─┬﻿ ノ( ゜-゜ノ)");
		}
		else if(message.content.startsWith("!doubleflip"))
		{
			message.channel.send("┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻");
		}
		else if(message.content.startsWith('!moji'))
		{
			var index = getRandomInt(0,65);
			message.channel.send(emojis[index]);
		}
		else if(message.content.startsWith('!deep'))
		{
			var index = getRandomInt(0,49);
			message.channel.send(deep_quotes[index]);
		}
	})

