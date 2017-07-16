/*  checkforcode.js by David Jerome @GlassToeStudio - GlassToeStudio@gmail.com

    14 July, 2017 
    https://github.com/GlassToeStudio
    http://glasstoestudio.weebly.com/
    https://twitter.com/GlassToeStudio

    ------------------------------------------------------------------------
    Systematically search through Discord comments to find unformatted Code.

        * Search is based in chars in codeElements array. 
            * Default:  [';', '{', '}', ')'] 
        * Bot will parse the code line by line searchig for 
        * code elements and keep track of which line are code
        * and which are plain text. 
        * The bot will do his best to only format a true code
        * block, leaveing the plain text alone. One complte
        * the bot will add code block formattign aroind the 
        * code block, with the current code lang 'csharp'.
        * The message will be posted anew as formatted code
        * and, if possible, the old message will be deleted.
        *
        * If the informatted code is posted in a channel with
        * 'help' in the tile, then the new messge is posted
        * there.
        * If the message is posted in any other chnannel, the 
        * new message will be posted in #programing_help (if it exists)
        * If there is no programing_help channel, the message is
        * posted in the original channel.
        *
        * When a new message is posted in a new channel, the user
        * is notified that the post has been moved, with a link
        * to the channel. The new post in the new channel will
        * also mention the user, as an added bonus to help
        * the user navigate the newmessage.

    EXAMPLE-----------------------------------------------------------------

    THis is not code so it is not in the code block.

    ```csharp
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

    THis is not code so it is not in the code block.

    ------------------------------------------------------------------------

    Discord Markdown 101 for more formatting guidelines:
    https://support.discordapp.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-?page=4
*/

const Discord = require('discord.js');
const GlassBot = require('../bot.js')
const bot = GlassBot.bot
const config = GlassBot.config

// Salt to taste
const codeElements = [';', '{', '}', ')'] // Could be in config
const codeLang = 'csharp'
const repostThreshold = 4

// Variables
var isFormatted = false
var totalLinesOfCode = 0
var firstLine = false
var lastLine = 0

// Lets begin
bot.on('message', message => {
    if(message.author.bot){
        // If this is our reply to the user, delete after 3 seconds
        if(message.content.includes('Your unformatted code')){
            message.delete(300)
            .then(msg => console.log(`Deleted message from ${msg.author}`))
            .catch(console.error);
        }
        return
    }
    if(message.content.length > 1900) return
    InitVariables()

    let lines = message.content.split('\n')

    ParseMessage(lines)
    
    if(IsBadCode() && !isFormatted){

        lines[lastLine] = FormatLastLine(lines[lastLine])

        CreateNewMessage(lines, message)
    }
    return
});


// Loop through each line in message and check for 
// code-like characters. If code formatting is found
// return, else keep checking.
function ParseMessage(lines){
    for(let i = 0; i < lines.length; i++){
        if(lines[i].search("```") >= 0){
            isFormatted = true
            return
        }else
            FindCodeElements(i, lines[i], lines) 
    }
    return
}

// Checks the last character in a string to see of it machess a code-like character
function FindCodeElements(index, line, lines){
    let lineLength = line.length - 1
    for(let i = 0; i < codeElements.length; i++){
        if (line.charAt(lineLength).valueOf() == codeElements[i].valueOf()){
            if(!firstLine){
                lines[index] = FormatFirstLine(line)
                return
            }else{
                lastLine = index
                totalLinesOfCode += 1
                return
            }
        }
    }
    return  
}

// Recreate the new message with code formatting included
function CreateNewMessage(lines, message){
    let newMessage = ""
    for(let j = 0; j < lines.length; j++)
       newMessage += lines[j] + '\n'

    PostNewMessage(message, newMessage)
}

// Post the formatted message in the appropriate channel
function PostNewMessage(message, newMessage){
    let channel = message.guild.channels.find("name", "programing_help")
    let isHelp = message.channel.name.indexOf('help') > 0 

    if(channel != null && channel != message.channel && !isHelp){
        // TODO: Would like to add some color to this message
        message.reply(':nerd: __`Your unformatted code has been formatted and moved to`__ ' + channel + '. :nerd:')
        channel.send(message.author + ' **★★ I have formatted your code and placed it here. Good Luck! ★★** ')
        channel.send(newMessage);
    }else{
        message.reply(' **★★ I see you forgot to format your code... Let me help you. ★★** ')
        message.channel.send(newMessage)
    }

    DeleteOldMessage(message)
}

// Deletes the old unformatted messge if bot has permission
function DeleteOldMessage(message){
    let managePerms = message.guild.member(bot.user).hasPermission('MANAGE_MESSAGES')
    if(managePerms)
        message.delete()
    else
        message.channel.send('**`Tell the server\'s owner to grant me permission to delete your old message, thank\'s`** :wink:')
}

// Adds code formatting block start to the first line of code
function FormatFirstLine(inLine){
    firstLine = true
    return '```' + codeLang + '\n' + inLine
}

// Add formatting code bock end to the last line of code
function FormatLastLine(inLine){
    return inLine + '\n```'
}

// If total line of code is greater than repostThreshold return true
function IsBadCode(){
    return (totalLinesOfCode >= repostThreshold)
}

// Initalize variables
function InitVariables(){
    isFormatted = false
    totalLinesOfCode = 0; 
    firstLine = false
    lastLine = 0
}