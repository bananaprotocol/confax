/*
    Systematically search through Discord comments to find unformatted Code.

    * Look for lines ending in ;
    * Look for lines ending in )
    * Look for lines ending in { or }
    * If found, Locate the first Code Block Line
    * If found, Locate the last Code Block Line
    * RePost the message surrounded by ```csharp ```


    EXAMPLE

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
            this.myFloat = _newAngle;
            this.myOtherFLoat = _changeTime;
        }
    }
    ```
*/

// Import the discord.js module
const Discord = require('discord.js');

// Guess this was for name and whatnot
const Confax = require('../bot.js')

// This is the bot
const bot = Confax.bot

// Prob dont need config
const config = Confax.config



var isFormatted = false
var totalLinesOfCode = 0
var originalLines = [] 

var lines = []
var codeLines = []

// Create an event listener for messages to parse
bot.on('message', message => {
    if (message.author.bot){
        //console.log("This is a bot message :D")
        return
    }
    if(message.content.length > 1900){
        return
    }

    isFormatted = false
    totalLinesOfCode = 0;  

    lines = message.content.split('\n')
    originalLines = message.content.split('\n')
    
    checkMessageForCode(lines)
    
    if(isBadCode() && !isFormatted){

        let firstLine = Math.min.apply(Math, codeLines)
        let lastLine  = Math.max.apply(Math, codeLines) + 2
        console.log("First Line is: " _ firstLine)
        originalLines.splice(firstLine, 0, '```csharp\n')
        originalLines.splice(lastLine,  0, '\n```\n'    )

        let strmessage = ""

        for (let j = 0; j < originalLines.length; j++){
           strmessage += originalLines[j] + '\n'
        }

        // TODO: Check if channel name contains help, if so just paste the new code here
        // else paste it in programing_help
        let channel = message.guild.channels.find("name", "programing_help")

        if(channel != null && channel != message.channel){
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
        return
    }
    return

});


// Loop through each line in message and check for 
// code-like characters. If code formaatting is found
// return else keep checking.
function checkMessageForCode(inputLines){
    for(let i = 0; i < inputLines.length; i++){
        //let line = inputLines[i].replace(/\s"/,'')
        let line = inputLines[i]
        if(line.search("```") >= 0){
            isFormatted = true
            return
        }
        else{
            checkLastCharacter(i, line, ';')
            checkLastCharacter(i, line, '{')
            checkLastCharacter(i, line, '}')
            checkLastCharacter(i, line, ')')
        }
    }
    return
}


// Checks the last character in a string to see of it machess a code-like character (inChar)
function checkLastCharacter(index, inLine, inChar){
    if(inLine.charAt(inLine.length-1).valueOf() == inChar.valueOf()){
        codeLines.push(index)
        console.log(inLine)
        totalLinesOfCode += 1
        console.log("Total Lines of Code: " + totalLinesOfCode)
        return
    }  
    return  
}

// Checks the total number of code like elements in an unformatted
// code block. If greater than 5 than this is bad code lol, return true
function isBadCode(){
    if (totalLinesOfCode >= 5){
        //console.log("Bad code")
        return true
    }
    else{
        return false
    }
}