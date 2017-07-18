/*  checkforcode.js by David Jerome @GlassToeStudio - GlassToeStudio@gmail.com

    14 July, 2017 
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
        * block, leaving the plain text alone. One complete
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

/*jshint esversion: 6 */
/*jshint asi: true */

const Discord = require('discord.js');
const GlassBot = require('../bot.js')
const bot = GlassBot.bot
const config = GlassBot.config

// Salt to taste
const codeElements = [';', '{', '}', ')', '[', ']', '>'] // Could be in a config
const codeLang = 'csharp' // Could be in a config
const repostThreshold = 4 // Could be in a config

var formatBlock = '```'

// Variables
var isFormatted = false
var totalLinesOfCode = 0
var hasFirstLine = false
var lastLine = 0
var selfDestructIn = 5

// Lets begin
bot.on('message', message => {
    if (message.content.length > 1900) return
    if (message.author.bot) {
        // Self-destruct message
        if (message.content.includes('Your unformatted code')) {
            let usr = message.mentions.users.array()[0]
            let chnl = (message.guild.channels.find("name", "programing_help") != null) ?
                message.guild.channels.find("name", "programing_help") :
                message.channel
            callNTimes(5, 1000, EditBotMessage, message, chnl, usr)
        }
        return
    }
    ParseMessage(message)
    return
});

/**
 * Loop through each line in message and check for 
 * code-like characters. If code formatting is found
 * return, else keep checking.
 * @param  {string[]} lines
 * @param  {string[]} message
 */
function ParseMessage(message) {
    InitVariables()
    let lines = message.content.split('\n')
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].search(formatBlock) >= 0) {
            isFormatted = true
            return
        } else
            FindCodeElements(i, lines[i], lines)
    }

    CheckMessage(lines, message)
    return
}

/**
 * Check if this is unformatted code, if so Create New Message
 * @param  {string[]} lines
 * @param  {string[]} message
 */
function CheckMessage(lines, message) {
    if (IsBadCode() && !isFormatted) {
        lines[lastLine] = FormatLastLine(lines[lastLine])
        CreateNewMessage(lines, message)
    }
    return
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
}

/**
 * Recreate the new message with code formatting included
 * @param  {string[]} lines
 * @param  {string[]} message
 */
function CreateNewMessage(lines, message) {
    let newMessage = ""
    for (let j = 0; j < lines.length; j++)
        newMessage += lines[j] + '\n'

    PostNewMessage(message, newMessage)
}

/**
 * Post the formatted message in the appropriate channel
 * @param  {string[]} message
 * @param  {string} newMessage
 */
function PostNewMessage(message, newMessage) {
    let channel = message.guild.channels.find("name", "programing_help")
    let isHelp = message.channel.name.indexOf('help') > 0
        // Move to new channel
    if (channel != null && channel != message.channel && !isHelp) {
        // TODO: Would like to add some color to this message
        message.reply(':nerd: __`Your unformatted code has been formatted and moved to`__ ' + channel + '. :nerd:' +
            '\n\t*This message will self-destruct in ' + selfDestructIn + ' seconds*')
        channel.send(message.author + ', **★★ I have formatted your code and placed it here. Good Luck! ★★** ')
        channel.send(newMessage);
        // post is same channel
    } else {
        message.channel.send(message.author + ' **★★ I see you forgot to format your code... Let me help you. ★★** ')
        message.channel.send(newMessage)
    }

    DeleteOldMessage(message)
}

/**
 * Deletes the old unformatted message if bot has permission
 * @param  {string[]} message
 */
function DeleteOldMessage(message) {
    let managePerms = message.guild.member(bot.user).hasPermission('MANAGE_MESSAGES')
    if (managePerms)
        message.delete()
    else
        message.channel.send('**`Tell the server\'s owner to grant me permission to delete your old message, thank\'s`** :wink:')
}

/**
 *  Adds code formatting block start to the first line of code
 * @param  {string} firstLine
 */
function FormatFirstLine(firstLine) {
    /*
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
    return lastLine + '\n' + formatBlock
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
    selfDestructIn = 5
}

// Bot self destruct message functions

/**
 * Edits the instruction message once a second, decrementing the time variable by 1
 * @param  {string} usr
 * @param  {string[]} message
 * @param  {string} channel
 * @param  {number} t
 */
function EditBotMessage(usr, message, channel, t) {
    message.edit(usr + ', :nerd: __`Your unformatted code has been formatted and moved to`__ ' + channel + '. :nerd:' +
        '\n\t*This message will self-destruct in ' + t + ' seconds*')
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
function callNTimes(n, time, fn, msg, chnl, usr) {
    function callFn() {
        if (--n < 1) {
            usr = null
            msg.delete()
                .then(m => console.log(`Deleted message from ${m.author}`))
                .catch(console.error);
            return;
        }
        fn(usr, msg, chnl, n);
        setTimeout(callFn, time);
    }
    setTimeout(callFn, time);
}