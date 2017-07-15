/*  checkforcode.js by David Jerome @GlassToeStudio - GlassToeStudio@gmail.com

    14 July, 2017 
    https://github.com/GlassToeStudio
    http://glasstoestudio.weebly.com/
    https://twitter.com/GlassToeStudio

    ------------------------------------------------------------------------
    Systematically search through Discord comments to find unformatted Code.

        * Look for lines ending in ; { } )

        * If found, Locate the first Code Block Line
        * If found, Locate the last Code Block Line
        * 
        * RePost the message surrounded by code formatting ```csharp ```


    EXAMPLE-----------------------------------------------------------------

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
    ------------------------------------------------------------------------

    Discord Markdown 101 for more formatting guidelines:
    https://support.discordapp.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-?page=4
*/

const Discord = require('discord.js');
const GlassBot = require('../bot.js')
const bot = GlassBot.bot
const config = GlassBot.config

// Salt to taste
var codeElements = [';', '{', '}', ')'] // Could be in config
var repostThreshold = 4
var codeLang = 'csharp'

// Variables
var isFormatted = false
var totalLinesOfCode = 0
var firstLine = false
var lastLine = 0

bot.on('message', message => {
    if(message.author.bot || message.content.length > 1900) return

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
    let channel = oldMessage.guild.channels.find("name", "programing_help")
    let channelName = oldMessage.channel.name
    let isHelp = channelName.indexOf('help') > 0 

    if(channel != null && channel != oldMessage.channel && !isHelp){
        // TODO: Would like to add some color to this message
        oldMessage.channel.send(':nerd: __`Your unformatted code has been formatted and moved to`__ ' + channel + '. `Which makes sense...` :nerd:')
        channel.send(oldMessage.author + ' **★★ I have formatted your code and placed it here. Good Luck! ★★**')
        channel.send(newMessage);
    }else{
        oldMessage.channel.send(oldMessage.author + ' **★★ I see you forgot to format your code... Let me help you. ★★**')
        oldMessage.channel.send(newMessage)
    }

    DeleteOldMessage(message)
}

// Deletes the old unformatted messge if bot has permission
function DeleteOldMessage(message){
    let managePerms = message.guild.member(bot.user).hasPermission('MANAGE_MESSAGES')
    if(managePerms){
        console.log("Gonna delete your messge son")
        message.delete()
    }else{
        console.log("Bot cannot delete your message")
        message.channel.send('**`Tell the server\'s owner to grant me permission to delete your old message, thank\'s`** :wink:')
    }
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