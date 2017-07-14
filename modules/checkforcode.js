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
    /// Class for holding Navigation variables. Used for the main game
    /// logic by PlayerNavigate to
    /// </summary>
    public class ChangeDirection
    {
        /// <summary>   The angle by which we should rotate. </summary>
        public float newAngle;
        /// <summary>   The time at which we should change direction.</summary>
        public float changeTime;

        public ChangeDirection(float _newAngle, float _changeTime)
        {
            this.newAngle = _newAngle;
            this.changeTime = _changeTime;
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
    isFormatted = false
    totalLinesOfCode = 0;  

    lines = message.content.split('\n')
    originalLines = message.content.split('\n')
    
    checkMessageForCode(lines)
    
    if(isBadCode() && !isFormatted){

        let firstLine = Math.min.apply(Math, codeLines)
        let lastLine = Math.max.apply(Math, codeLines) + 2
          
        originalLines.splice(firstLine, 0, '```csharp\n')
        originalLines.splice(lastLine, 0, '\n```\n')

        let strmessage = ""

        for (let j = 0; j < originalLines.length; j++){
           strmessage += originalLines[j]+'\n'
        }


        message.channel.send('`I see you forgot to format your code... Let me help you.` :doggo:')
        //message.channel.send('```csharp\n' + message.content + '\n```')
        message.channel.send(strmessage)
        return
    }
    return

});

function checkMessageForCode(inputLines){
    //console.log("Starting to check for code")
    for(let i = 0; i < inputLines.length; i++){
        let line = inputLines[i].replace(/\s"/,'')
        if(line.search("```") >= 0){
            //console.log("This code is A Okay!")
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

function checkLastCharacter(index, inLine, inChar){
    if(inLine.charAt(inLine.length-1).valueOf() == inChar.valueOf()){
        codeLines.push(index)
        //console.log(inLine)
        totalLinesOfCode += 1
        //console.log("Total Lines of Code: " + totalLinesOfCode)
        return
    }  
    return  
}

function isBadCode(){
    if (totalLinesOfCode >= 5){
        //console.log("Bad code")
        return true
    }
    else{
        return false
    }
}