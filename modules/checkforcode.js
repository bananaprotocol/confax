/*  checkforcode.js by David Jerome @GlassToeStudio - GlassToeStudio@gmail.com

    20 July, 2017
    https://github.com/GlassToeStudio
    http://glasstoestudio.weebly.com/
    https://twitter.com/GlassToeStudio

    ------------------------------------------------------------------------
    Systematically search through Discord comments to find unformatted Code.

<<<<<<< HEAD
<<<<<<< HEAD
        * Search is based in chars in codeElements array.
            * Default:  [';', '{', '}', ')', '[', ']', '>']
        * Bot will parse the code line by line searching for
=======
        * Search is based in chars in codeElements array. 
            * Default:  [';', '{', '}', ')', '[', ']', '>']
        * Bot will parse the code line by line searching for 
>>>>>>> 8240259... USE VAR
=======
        * Search is based in chars in codeElements array.
            * Default:  [';', '{', '}', ')', '[', ']', '>']
        * Bot will parse the code line by line searching for
>>>>>>> 79ddf29... js standard
        * code elements and keep track of which line are code
        * and which are plain text.
        * The bot will do his best to only format a true code
        * block, leaving the plain text alone. One complete
<<<<<<< HEAD
<<<<<<< HEAD
        * the bot will add code block formatting around the
=======
        * the bot will add code block formatting around the 
>>>>>>> 8240259... USE VAR
=======
        * the bot will add code block formatting around the
>>>>>>> 79ddf29... js standard
        * code block, with the current code Lang 'csharp'.
        * The message will be posted anew as formatted code
        * and, if possible, the old message will be deleted.
        *
        * If the unformatted code is posted in a channel with
        * 'help' in the tile, then the new message is posted
        * there.
<<<<<<< HEAD
<<<<<<< HEAD
        * If the message is posted in any other channel, the
=======
        * If the message is posted in any other channel, the 
>>>>>>> 8240259... USE VAR
=======
        * If the message is posted in any other channel, the
>>>>>>> 79ddf29... js standard
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

    ```csharp
    [System.Serializable]
    using UnityEngine;

    /// <summary>
    /// Class summary
    /// </summary>
    public class MyClass
    {
        /// <summary>   Summary of myFloat. </summary>
        public float myFloat;
        /// <summary>   Summary of myOtherFloat.</summary>
        public float myOtherFLoat;

        // Default constructor
        public MyClass(float _myFloat, float _myOtherFLoat)
        {
            this.myFloat = _myFloat;
            this.myOtherFLoat = _myOtherFLoat;
        }
    }
    ```

    This is not code so it is not in the code block.

    ------------------------------------------------------------------------

    Discord Markdown 101 for more formatting guidelines:
    https://support.discordapp.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-?page=4
*/

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
/* jshint esversion: 6 */
/* jshint asi: true */

<<<<<<< HEAD
=======
const Discord = require('discord.js')
>>>>>>> refs/remotes/bananaprotocol/master
const GlassBot = require('../bot.js')
const bot = GlassBot.bot
=======
=======
/* jshint esversion: 6 */
/* jshint asi: true */
>>>>>>> 79ddf29... js standard

const GlassBot = require('../bot.js')
const bot = GlassBot.bot
<<<<<<< HEAD
const config = GlassBot.config
>>>>>>> 8240259... USE VAR
=======
>>>>>>> 79ddf29... js standard

// Salt to taste
const codeElements = [';', '{', '}', ')', '[', ']', '>'] // Could be in a config
const codeLang = 'csharp' // Could be in a config
const repostThreshold = 4 // Could be in a config
const selfDestructIn = 5
const formatBlock = '```'

var formatBlock = '```'

var formatBlock = '```'
=======
const GlassBot = require('../bot.js')
const bot = GlassBot.bot
const config = GlassBot.config

// Salt to taste
const codeElements = config.codeElements
const codeLang = config.codeLang
const repostThreshold = config.repostThreshold
const selfDestructIn = config.selfDestructIn
const formatBlock = config.formatBlock
>>>>>>> c11f391... Moved const variables to config file.

// Variables
var isFormatted = false
var totalLinesOfCode = 0
var hasFirstLine = false
<<<<<<< HEAD
var lastLineIndex = 0
=======
var lastLine = 0
<<<<<<< HEAD
var selfDestructIn = 5
<<<<<<< HEAD
>>>>>>> refs/remotes/bananaprotocol/master

// Lets begin
bot.on('message', message => {
  if (message.content.length > 1900) return
  if (message.author.bot) {
<<<<<<< HEAD
    // Self-destruct message
    if (message.content.includes('Your unformatted code')) {
      let usr = message.mentions.users.array()[0]
      let chnl = (message.guild.channels.find('name', 'programing_help') != null)
=======
        // Self-destruct message
    if (message.content.includes('Your unformatted code')) {
      let usr = message.mentions.users.array()[0]
      let chnl = (message.guild.channels.find('name', 'programing_help') !== null)
>>>>>>> refs/remotes/bananaprotocol/master
                ? message.guild.channels.find('name', 'programing_help')
                : message.channel
      callNTimes(5, 1000, EditBotMessage, message, chnl, usr)
    }
=======
=======
>>>>>>> c11f391... Moved const variables to config file.

// Lets begin
bot.on('message', message => {
  if (message.content.length > 1900) return
  if (message.author.bot) {
    // Self-destruct message
    if (message.content.includes('Your unformatted code')) {
      let usr = message.mentions.users.array()[0]
      let chnl = (message.guild.channels.find('name', 'programing_help') != null)
                ? message.guild.channels.find('name', 'programing_help')
                : message.channel
      callNTimes(selfDestructIn, 1000, EditBotMessage, message, chnl, usr)
    }
<<<<<<< HEAD
    ParseMessage(message)
>>>>>>> 8240259... USE VAR
=======
>>>>>>> 79ddf29... js standard
    return
  }
  ParseMessage(message)
})

/**
 * Loop through each line in message and check for
 * code-like characters. If code formatting is found
 * return, else keep checking.
 * @param  {string[]} lines
 * @param  {string[]} message
 */
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 79ddf29... js standard
function ParseMessage (message) {
  InitVariables()
  let lines = message.content.split('\n')
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].search(formatBlock) >= 0) {
      isFormatted = true
      return
<<<<<<< HEAD
<<<<<<< HEAD
    } else {
      FindCodeElements(i, lines[i], lines)
    }
  }
=======
    } else { FindCodeElements(i, lines[i], lines) }
  }

>>>>>>> refs/remotes/bananaprotocol/master
  CheckMessage(lines, message)
}

/**
 * Check if this is unformatted code, if so Create New Message
=======
function ParseMessage(message) {
    InitVariables()
    let lines = message.content.split('\n')
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].search(formatBlock) >= 0) {
            isFormatted = true
            return
        } else
            FindCodeElements(i, lines[i], lines)
=======
    } else {
      FindCodeElements(i, lines[i], lines)
>>>>>>> 79ddf29... js standard
    }
  }
  CheckMessage(lines, message)
}

/**
 * Check if this is unformatted code, if so Create New Message
 * @param  {string[]} lines
 * @param  {string[]} message
 */
function CheckMessage (lines, message) {
  if (IsBadCode() && !isFormatted) {
    lines[lastLine] = FormatLastLine(lines[lastLine])
    CreateNewMessage(lines, message)
  }
}

/**
 * Checks the last character in a string to see of it matches a code-like character
 * @param  {number} index
 * @param  {string} line
>>>>>>> 8240259... USE VAR
 * @param  {string[]} lines
 * @param  {string[]} message
 */
<<<<<<< HEAD
function CheckMessage (lines, message) {
  if (IsBadCode() && !isFormatted) {
<<<<<<< HEAD
    lines[lastLineIndex] = FormatLastLine(lines[lastLineIndex])
=======
    lines[lastLine] = FormatLastLine(lines[lastLine])
>>>>>>> refs/remotes/bananaprotocol/master
    CreateNewMessage(lines, message)
  }
}

/**
 * Checks the last character in a string to see of it matches a code-like character
 * @param  {number} index
 * @param  {string} line
 * @param  {string[]} lines
 */
function FindCodeElements (index, line, lines) {
  let lineLength = line.length - 1
  for (let i = 0; i < codeElements.length; i++) {
<<<<<<< HEAD
<<<<<<< HEAD
    if (line.charAt(lineLength).valueOf() === codeElements[i].valueOf()) {
=======
    if (line.charAt(lineLength).valueOf() == codeElements[i].valueOf()) {
>>>>>>> 79ddf29... js standard
=======
    if (line.charAt(lineLength).valueOf() === codeElements[i].valueOf()) {
>>>>>>> c11f391... Moved const variables to config file.
      if (!hasFirstLine) {
        lines[index] = FormatFirstLine(line)
        return
      } else {
<<<<<<< HEAD
<<<<<<< HEAD
        lastLineIndex = index
=======
        lastLine = index
>>>>>>> refs/remotes/bananaprotocol/master
        totalLinesOfCode += 1
        return
      }
    }
  }
=======
function FindCodeElements(index, line, lines) {
    let lineLength = line.length - 1
    for (let i = 0; i < codeElements.length; i++) {
        if (line.charAt(lineLength).valueOf() == codeElements[i].valueOf()) {
            if (!hasFirstLine) {
                lines[index] = FormatFirstLine(line)
                return
            } else {
                lastLine = index
                totalLinesOfCode += 1
                return
            }
        }
    }
    return
>>>>>>> 8240259... USE VAR
=======
        lastLine = index
        totalLinesOfCode += 1
        return
      }
    }
  }
>>>>>>> 79ddf29... js standard
}

/**
 * Recreate the new message with code formatting included
 * @param  {string[]} lines
 * @param  {string[]} message
 */
function CreateNewMessage (lines, message) {
  let newMessage = ''
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  for (let j = 0; j < lines.length; j++) {
    newMessage += lines[j] + '\n'
  }
=======
  for (let j = 0; j < lines.length; j++) { newMessage += lines[j] + '\n' }

>>>>>>> refs/remotes/bananaprotocol/master
=======
  for (let j = 0; j < lines.length; j++) { newMessage += lines[j] + '\n' }

>>>>>>> 79ddf29... js standard
=======
  for (let j = 0; j < lines.length; j++) {
    newMessage += lines[j] + '\n'
  }
>>>>>>> c11f391... Moved const variables to config file.
  PostNewMessage(message, newMessage)
}

/**
 * Post the formatted message in the appropriate channel
 * @param  {string[]} message
 * @param  {string} formattedMessage
 */
<<<<<<< HEAD
<<<<<<< HEAD
function PostNewMessage (message, formattedMessage) {
  let channel = message.guild.channels.find('name', 'programing_help')
  let isHelp = message.channel.name.indexOf('help') > 0
  // Move to new channel
  if (channel != null && channel !== message.channel && !isHelp) {
    // TODO: Would like to add some color to this message
    message.reply(':nerd: __`Your unformatted code has been formatted and moved to`__ ' + channel + '. :nerd:' +
            '\n\t*This message will self-destruct in ' + selfDestructIn + ' seconds*')
    channel.send(message.author + ', **★★ I have formatted your code and placed it here. Good Luck! ★★** ')
    channel.send(formattedMessage)
  // post is same channel
  } else {
    message.channel.send(message.author + ' **★★ I see you forgot to format your code... Let me help you. ★★** ')
    message.channel.send(formattedMessage)
  }
=======
=======
>>>>>>> 79ddf29... js standard
function PostNewMessage (message, newMessage) {
  let channel = message.guild.channels.find('name', 'programing_help')
  let isHelp = message.channel.name.indexOf('help') > 0
<<<<<<< HEAD
        // Move to new channel
<<<<<<< HEAD
<<<<<<< HEAD
  if (channel !== null && channel !== message.channel && !isHelp) {
        // TODO: Would like to add some color to this message
    message.reply(':nerd: __`Your unformatted code has been formatted and moved to`__ ' + channel + '. :nerd:' +
            '\n\t*This message will self-destruct in ' + selfDestructIn + ' seconds*')
    channel.send(message.author + ', **★★ I have formatted your code and placed it here. Good Luck! ★★** ')
    channel.send(newMessage)
=======
    if (channel != null && channel != message.channel && !isHelp) {
        // TODO: Would like to add some color to this message
        message.reply(':nerd: __`Your unformatted code has been formatted and moved to`__ ' + channel + '. :nerd:' +
            '\n\t*This message will self-destruct in ' + selfDestructIn + ' seconds*')
        channel.send(message.author + ', **★★ I have formatted your code and placed it here. Good Luck! ★★** ')
        channel.send(newMessage);
>>>>>>> 8240259... USE VAR
=======
  if (channel != null && channel != message.channel && !isHelp) {
        // TODO: Would like to add some color to this message
=======
    // Move to new channel
  if (channel != null && channel !== message.channel && !isHelp) {
    // TODO: Would like to add some color to this message
>>>>>>> c11f391... Moved const variables to config file.
    message.reply(':nerd: __`Your unformatted code has been formatted and moved to`__ ' + channel + '. :nerd:' +
                  '\n\t*This message will self-destruct in ' + selfDestructIn + ' seconds*')
    channel.send(message.author + ', **★★ I have formatted your code and placed it here. Good Luck! ★★** ')
    channel.send(newMessage)
<<<<<<< HEAD
>>>>>>> 79ddf29... js standard
        // post is same channel
=======
    // post is same channel
>>>>>>> c11f391... Moved const variables to config file.
  } else {
    message.channel.send(message.author + ' **★★ I see you forgot to format your code... Let me help you. ★★** ')
    message.channel.send(newMessage)
  }
<<<<<<< HEAD

<<<<<<< HEAD
>>>>>>> refs/remotes/bananaprotocol/master
  DeleteOldMessage(message)
=======
    DeleteOldMessage(message)
>>>>>>> 8240259... USE VAR
=======
  DeleteOldMessage(message)
>>>>>>> 79ddf29... js standard
}

/**
 * Deletes the old unformatted message if bot has permission
 * @param  {string[]} message
 */
function DeleteOldMessage (message) {
  let managePerms = message.guild.member(bot.user).hasPermission('MANAGE_MESSAGES')
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c11f391... Moved const variables to config file.
  if (managePerms) {
    message.delete()
  } else {
    message.channel.send('**`Tell the server\'s owner to grant me permission to delete your old message, thank\'s`** :wink:')
  }
<<<<<<< HEAD
=======
  if (managePerms) { message.delete() } else { message.channel.send('**`Tell the server\'s owner to grant me permission to delete your old message, thank\'s`** :wink:') }
>>>>>>> refs/remotes/bananaprotocol/master
=======
  if (managePerms) { message.delete() } else { message.channel.send('**`Tell the server\'s owner to grant me permission to delete your old message, thank\'s`** :wink:') }
>>>>>>> 79ddf29... js standard
=======
>>>>>>> c11f391... Moved const variables to config file.
}

/**
 *  Adds code formatting block start to the first line of code
 * @param  {string} firstLine
 */
<<<<<<< HEAD
<<<<<<< HEAD
function FormatFirstLine (firstLine) {
    /*
    What if the first line of code has some regular text at the beginning?
        "Here is my code: public int myInt = 0;"
        "Here is my code" will also be formatted.
        We do not want this.
     */
<<<<<<< HEAD
  hasFirstLine = true
  return formatBlock + codeLang + '\n' + firstLine
=======
=======
function FormatFirstLine(firstLine) {
>>>>>>> 7472f97... minor edits
    hasFirstLine = true
        /*
        What if the first line of code has some regular text at the beginning?
            "Here is my code: public int myInt = 0;"
            "Here is my code" will also be formatted.
            We do not want this.
            There are too many possibilites for what could be
            the actual first word of the first line of code:
                - public
                - private
                - int
                - string
                - list
         */
    return formatBlock + codeLang + '\n' + firstLine
>>>>>>> 8240259... USE VAR
=======
function FormatFirstLine (firstLine) {
  /*
  What if the first line of code has some regular text at the beginning?
      "Here is my code: public int myInt = 0;"
      "Here is my code" will also be formatted.
      We do not want this.
  */
  hasFirstLine = true
  return formatBlock + codeLang + '\n' + firstLine
>>>>>>> 79ddf29... js standard
}

/**
 * Add formatting code bock end to the last line of code
 * @param  {string} lastLine
 */
<<<<<<< HEAD
<<<<<<< HEAD
function FormatLastLine (lastLine) {
  return lastLine + '\n' + formatBlock
=======
function FormatLastLine(lastLine) {
    return lastLine + '\n' + formatBlock
>>>>>>> 8240259... USE VAR
=======
function FormatLastLine (lastLine) {
  return lastLine + '\n' + formatBlock
>>>>>>> 79ddf29... js standard
}

/**
 * If total line of code is greater than repostThreshold return true
 */
function IsBadCode () {
  return (totalLinesOfCode >= repostThreshold)
}

/**
 * Initialize variables
 */
<<<<<<< HEAD
<<<<<<< HEAD
function InitVariables () {
  isFormatted = false
  hasFirstLine = false
<<<<<<< HEAD
  lastLineIndex = 0
  totalLinesOfCode = 0
=======
  lastLine = 0
  totalLinesOfCode = 0
<<<<<<< HEAD
  selfDestructIn = 5
>>>>>>> refs/remotes/bananaprotocol/master
=======
function InitVariables() {
    isFormatted = false
    hasFirstLine = false
    lastLine = 0
    totalLinesOfCode = 0
    selfDestructIn = 5
>>>>>>> 8240259... USE VAR
=======
function InitVariables () {
  isFormatted = false
  hasFirstLine = false
  lastLine = 0
  totalLinesOfCode = 0
  selfDestructIn = 5
>>>>>>> 79ddf29... js standard
=======
>>>>>>> c11f391... Moved const variables to config file.
}

/**
 * Edits the instruction message once a second, decrementing the time variable by 1
 * @param  {string} usr
 * @param  {string[]} message
 * @param  {string} channel
 * @param  {number} t
 */
function EditBotMessage (usr, message, channel, t) {
  message.edit(usr + ', :nerd: __`Your unformatted code has been formatted and moved to`__ ' + channel + '. :nerd:' +
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
               '\n\t*This message will self-destruct in ' + t + ' seconds*')
=======
=======
>>>>>>> 79ddf29... js standard
        '\n\t*This message will self-destruct in ' + t + ' seconds*')
>>>>>>> refs/remotes/bananaprotocol/master
=======
               '\n\t*This message will self-destruct in ' + t + ' seconds*')
>>>>>>> c11f391... Moved const variables to config file.
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
function callNTimes (n, time, fn, msg, chnl, usr) {
  function callFn () {
    if (--n < 1) {
      usr = null
      msg.delete()
<<<<<<< HEAD
<<<<<<< HEAD
        .then(m => console.log(`Deleted message from ${m.author}`))
        .catch(console.error)
=======
                .then(m => console.log(`Deleted message from ${m.author}`))
                .catch(console.error)
>>>>>>> refs/remotes/bananaprotocol/master
      return
    }
<<<<<<< HEAD
=======
          .then(m => console.log(`Deleted message from ${m.author}`))
          .catch(console.error)
      return
    }
>>>>>>> 79ddf29... js standard
    fn(usr, msg, chnl, n)
    setTimeout(callFn, time)
  }
  setTimeout(callFn, time)
}
<<<<<<< HEAD
=======
    setTimeout(callFn, time);
}
>>>>>>> 8240259... USE VAR
=======
>>>>>>> 79ddf29... js standard
