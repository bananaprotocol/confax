/*  checkforcode.js by David Jerome @GlassToeStudio - GlassToeStudio@gmail.com

    26 May, 2018
    https://github.com/GlassToeStudio
    http://glasstoestudio.weebly.com/
    https://twitter.com/GlassToeStudio

    ------------------------------------------------------------------------
    Systematically search through Discord comments to find unformatted Code.

        * Search is based in chars in codeElements array.
            * Default:  [';', '{', '}', ')', '[', ']', '>']
        * Bot will parse the code line by line searching for
        * code elements and keep track of which line are code
        * and which are plain text.
        * The bot will do his best to only format a true code
        * block, leaving the plain text alone. Once complete
        * the bot will add code block formatting around the
        * code block, with the current code Lang 'csharp'.
        * The message will be posted anew as formatted code
        * and, if possible, the old message will be deleted.
        *
        * If the unformatted code is posted in a channel with
        * 'help' in the tile, then the new message is posted
        * there.
        * If the message is posted in any other channel, the
        * new message will be posted in #programing_help (if it exists)
        * If there is no programing_help channel, the message is
        * posted in the original channel.
        *
        * When a new message is posted in a new channel, the user
        * is notified that the post has been moved, with a link
        * to the channel. The new post in the new channel will
        * also mention the user, as an added bonus to help
        * the user navigate to the new message.

    EXAMPLE-----------------------------------------------------------------

    This is not code so it is not in the code block.

    [System.Serializable]
    using UnityEngine;

    /// <summary>
    /// Class summary
    /// </summary>
    public class MyClass
    {
        /// <summary>   Summary of myFloat. </summary>
        public float myFloat;
        /// <summary>   Summary of myOtherFloat. </summary>
        public float myOtherFLoat;

        // Default constructor
        public MyClass(float _myFloat, float _myOtherFLoat)
        {
            this.myFloat = _myFloat;
            this.myOtherFLoat = _myOtherFLoat;
        }
    }

    This is not code so it is not in the code block.

    ------------------------------------------------------------------------

    Discord Markdown 101 for more formatting guidelines:
    https://support.discordapp.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-?page=4
*/

const Confax = require('../bot.js')
const bot = Confax.bot
const config = Confax.config

// Salt to taste (config.json)
const codeElements = config.codeElements
const codeLang = config.codeLang
const repostThreshold = config.repostThreshold
const selfDestructIn = config.selfDestructIn
const formatBlock = config.formatBlock
const autoPost = config.autoPost
var emojiName = config.emojiName
const backupEmojiName = config.backupEmojiName
const timeToReact = 60000 // could be in config

// Messages
const hereIsYourCode = ' **Here is your formatted code, I hope I did this right.** '
const helpChannelname = 'programming_help'
const yourUnformattedCode = '`Your unformatted code has been formatted and moved to` '

// Variables
var isFormatted = false
var totalLinesOfCode = 0
var hasFirstLine = false
var lastLine = 0
var firstReply
var reactEmoji


// Lets begin
bot.on('message', message => {
  if (message.content.length > 1950) return // This message may be too long to post, once formatted.
  if (message.author.bot) {
    // Self-destruct message
    if (message.content.includes('Your unformatted code')) {
      let usr = message.mentions.users.array()[0]
      let chnl = (message.guild.channels.find('name', helpChannelname) != null)
        ? message.guild.channels.find('name', helpChannelname)
        : message.channel
      CallNTimes(selfDestructIn, 1000, EditBotMessage, message, chnl, usr)
    }
    return
  }
  ParseMessage(message)
})

/**
 * Loop through each line in message and check for
 * code-like characters. If code formatting is found
 * return, else keep checking.
 * @param  {string[]} message
 */
function ParseMessage(message) {
  InitVariables()
  let lines = message.content.split('\n')
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].search(formatBlock) >= 0) {
      isFormatted = true
      return
    } else {
      let line = lines[i].replace(/`/g, '')
      lines[i] = line
      line = line.trim()
      FindCodeElements(i, line, lines)
    }
  }
  if (!isFormatted) CheckMessage(lines, message)
}

/**
 * Check if this is unformatted code, if so listen for emoji reactions or auto post new message.
 * @param  {string[]} lines
 * @param  {string} message
 */
function CheckMessage(lines, message) {
  if (IsBadCode() && !isFormatted) {
    lines[lastLine] = FormatLastLine(lines[lastLine])
    if (!autoPost) { // Either listen for a react or just post the new message
      reactEmoji = message.guild.emojis.find(emoji => emoji.name === emojiName)
      try {
        message.react(reactEmoji)
      } catch (error) {
        reactEmoji = backupEmojiName
        emojiName = reactEmoji
        message.react(reactEmoji)
      }
      message.reply(' ⬆ *If this is a block of code, please click the emoji on the message to auto format it, thanks.*')
        .then(msg => {
          firstReply = msg
          msg.delete(timeToReact)
            .catch(() => {
              console.log("Message is already deleted")
            })
        })
        .then(() => {
          ListenForReacts(lines, message)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    else {
      CreateNewMessage(lines, message)
    }
  }
}

/**
 * Checks the last character in a string to see of it matches a code-like character
 * @param  {number} index
 * @param  {string} line
 * @param  {string[]} lines
 */
function FindCodeElements(index, line, lines) {
  let lineLength = line.length - 1
  for (let i = 0; i < codeElements.length; i++) {
    if (line.charAt(lineLength).valueOf() === codeElements[i].valueOf() || line.includes('public') || line.includes('class')) {
      if (!hasFirstLine) {
        lines[index] = FormatFirstLine(lines[index])
        return
      } else {
        lastLine = index
        totalLinesOfCode += 1
        return
      }
    }
  }
}

/**
 * Listen for a 'FormatMe' reaction. If so, Create new message.
 * @param  {string[]} lines
 * @param  {string[]} message
 */
function ListenForReacts(lines, message) {
  const filter = (reaction, user) => {
    return [emojiName].includes(reaction.emoji.name) && reaction.count > 1;
  }
  message.awaitReactions(filter, { max: 1, time: timeToReact, errors: ['time'] })
    .then(collected => {
      const reaction = collected.first()
      if (reaction.emoji.name === emojiName) {
        firstReply.delete()
          .catch(() => {
            console.log("Message is already deleted")
          })
        CreateNewMessage(lines, message)
      }
    })
    .catch(() => {
      message.clearReactions()
    })
}

/**
 * Recreate the new message with code formatting included, then post it.
 * @param  {string[]} lines
 * @param  {string[]} message
 */
function CreateNewMessage(lines, message) {
  let newMessage = ''
  for (let j = 0; j < lines.length; j++) {
    newMessage += lines[j] + '\n'
  }
  PostNewMessage(message, newMessage)
}

/**
 * Post the formatted message in the appropriate channel
 * @param  {string[]} message
 * @param  {string} newMessage
 */
function PostNewMessage(message, newMessage) {
  let channel = message.guild.channels.find('name', helpChannelname)
  let isHelp = message.channel.name.indexOf('help') > 0
  // Move to new channel
  if (channel != null && channel !== message.channel && !isHelp) {
    message.reply(yourUnformattedCode + channel + '.' +
      '\n\tThis message will self-destruct in *' + selfDestructIn + '* seconds')
    channel.send(message.author + hereIsYourCode)
    channel.send(newMessage)
    // post in same channel
  } else {
    message.channel.send(message.author + hereIsYourCode)
    message.channel.send(newMessage)
  }
  DeleteOldMessage(message)
}

/**
 * Deletes the old unformatted message if bot has permission
 * @param  {string} message
 */
function DeleteOldMessage(message) {
  let managePerms = message.guild.member(bot.user).hasPermission('MANAGE_MESSAGES')
  if (managePerms) {
    message.delete()
  } else {
    message.channel.send('**`Tell the server\'s owner to grant me permission to delete your old message, thank\'s`** :wink:')
  }
}

/**
 *  Adds code formatting block start to the first line of code
 * @param  {string} firstLine
 */
function FormatFirstLine(firstLine) {
  /* TODO:
  What if the first line of code has some regular text at the beginning?
      "Here is my code: public int myInt = 0;"
      "Here is my code" will also be formatted.
      We do not want this.
  */
  hasFirstLine = true
  return formatBlock + codeLang + '\n' + firstLine
}

/**
 * Add formatting code bock end to the last line of code
 * @param  {string} lastLine
 */
function FormatLastLine(lastLine) {
  return lastLine.replace(/`/g, '') + '\n' + formatBlock
}

/**
 * If total line of code is greater than repostThreshold return true
 */
function IsBadCode() {
  return (totalLinesOfCode >= repostThreshold)
}

/**
 * Initialize variables
 */
function InitVariables() {
  isFormatted = false
  hasFirstLine = false
  lastLine = 0
  totalLinesOfCode = 0
  firstReply = undefined
  reactEmoji = ''
}

/**
 * Edits the instruction message once per second, decrementing the time variable by 1
 * @param  {string} usr
 * @param  {string[]} message
 * @param  {string} channel
 * @param  {number} t
 */
function EditBotMessage(usr, message, channel, t) {
  message.edit(usr + ', ' + yourUnformattedCode + channel + '.' +
    '\n\tThis message will self-destruct in *' + t + '* seconds')
}

/**
 * Call the passed function n times every time step.
 * @param  {number} n
 * @param  {number} time
 * @param  {function} fn
 * @param  {string[]} msg
 * @param  {string} chnl
 * @param  {string} usr
 */
function CallNTimes(n, time, fn, msg, chnl, usr) {
  function callFn() {
    if (--n < 1) {
      usr = null
      msg.delete()
        .then(m => console.log(`Deleted message from ${m.author.name}`))
        .catch(console.error)
      return
    }
    fn(usr, msg, chnl, n)
    setTimeout(callFn, time)
  }
  setTimeout(callFn, time)
}
