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
*/

const Discord = require('discord.js');
const GlassBot = require('../bot.js')
const bot = GlassBot.bot
const config = GlassBot.config

var isFormatted = false
var totalLinesOfCode = 0
var lines = []
var codeLines = []
var codeElements = [';', '{', '}', ')'] 
var repostThreshold = 4

bot.on('message', message => {
    if (message.author.bot){
        return
    }

    if(message.content.length > 1900){
        return
    }

    isFormatted = false
    totalLinesOfCode = 0;  

    lines = message.content.split('\n')
    
    checkMessageForCode(lines)
    
    if(isBadCode() && !isFormatted){

        let firstLine = Math.min.apply(Math, codeLines)
        let lastLine  = Math.max.apply(Math, codeLines) + 2

        lines.splice(firstLine, 0, '```csharp\n')
        lines.splice(lastLine,  0, '\n```\n'    )

        let strmessage = ""
        // Recreate the message.content with the code wrapped in ```
        for (let j = 0; j < lines.length; j++){
           strmessage += lines[j] + '\n'
        }

        // TODO: Check if channel name contains help, if so just paste the new code here
        // else paste it in programing_help
        let channel = message.guild.channels.find("name", "programing_help")
        let channelName = message.channel.name
        let isHelp = channelName.index('help') > 0 

        if(channel != null && channel != message.channel && !isHelp){
            // TODO: Would like to add alink to #programming help for user friendliness :D
            // TODO: Would like to add some color to this message also
            // Maybe make it bold
            message.channel.send('__`Your unformatted code has been formatted and moved to`__ ' + '#'+ channel.name + '.\n`Which makes sense...`')
            channel.send('**`I have formated your code and placed it here. Good Luck!.`**')
            channel.send(strmessage);
        }
        else{
                message.channel.send('**`I see you forgot to format your code... Let me help you.`**')
                message.channel.send(strmessage)
            }
    }
    return
});


// Loop through each line in message and check for 
// code-like characters. If code formaatting is found
// return else keep checking.
function checkMessageForCode(inputLines){
    for(let i = 0; i < inputLines.length; i++){
        //let line = inputLines[i].replace(/\s"/,'')
        if(inputLines[i].search("```") >= 0){
            isFormatted = true
            return
        }
        else{ 
            checkLastCharacter(i, inputLines[i]) 
        }
    }
    return
}


// Checks the last character in a string to see of it machess a code-like character (inChar)
function checkLastCharacter(index, inLine){
    let lineLength = inLine.length - 1
    for(let i = 0; i < codeElements.length; i++){
        if(inLine.charAt(lineLength).valueOf() == codeElements[i].valueOf()){
            codeLines.push(index)
            totalLinesOfCode += 1
            return
        }
    }
    return  
}

// Checks the total number of code like elements in an unformatted
// code block. If greater than repostThreshold than this is bad code lol, return true
function isBadCode(){
    if (totalLinesOfCode >= repostThreshold){
        return true
    }
    else{
        return false
    }
}