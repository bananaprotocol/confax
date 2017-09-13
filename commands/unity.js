/*  unity.js by David Jerome @GlassToeStudio - GlassToeStudio@gmail.com

    12 September, 2017
    https://github.com/GlassToeStudio
    http://glasstoestudio.weebly.com/
    https://twitter.com/GlassToeStudio

    ------------------------------------------------------------------------
    Allow a user to input a Unity c# class and retrieve
    a link to the Unity documentation online.

    Usage:
      !unity <ClassName>

    Example:
      !unity Collider

      https://docs.unity3d.com/ScriptReference/Collider

    ------------------------------------------------------------------------
*/
const Confax = require('../bot.js')
const config = Confax.config
const DevID = config.GlassToeID
const request = require('request')
const docAddress = 'https://docs.unity3d.com/ScriptReference/'
const TOCAddress = 'https://docs.unity3d.com/ScriptReference/docdata/toc.js'
const notFound = ' was not found. Either it does not exist or it is mispelled (or it\'s not a Class).'

var isFound = false

GlassBot.registerCommand('unity', 'default', (message, bot) => {
  let channel = message.guild.channels.find('name', 'vip_members')
  if (channel === null || channel !== message.channel) { return }
  isFound = false
  let name = message.content.toString()
  //  Start the request to get the toc js object
  request(TOCAddress, function (error, response, body) {
    if (error) { return }
    let tableOfContents = JSON.parse(body.slice(9))
    for (let i = 0; i < tableOfContents.children.length; i++) {
      if (tableOfContents.children[i].title === 'UnityEngine') {
        let UnityEngine = tableOfContents.children[i]
        for (let j = 0; j < UnityEngine.children.length; j++) {
          let NameSpace = UnityEngine.children[j]
          if (NameSpace.title === 'Classes') {
            SearchClass(NameSpace, name, message, NameSpace)
          }
          for (let k = 0; k < NameSpace.children.length; k++) {
            let Classes = NameSpace.children[k]
            if (Classes.title === 'Classes') {
              SearchClass(Classes, name, message, NameSpace)
            }
          }
        }
      }
    }
    if (!isFound) {
      message.channel.send('**' + name + '**' + notFound)
      TellDevThisFailed(name, message)
    }
  })
}, ['Unity', 'unity3D', 'U3D', 'u3d', 'script', 'ref'], 'Look up Unity Classes in the online script reference.', '<ClassName>')

/**
 * @param  {string[]} classes
 * @param  {string} name
 * @param  {string} message
 * @param  {string[]} namespace
 */
function SearchClass (classes, name, message, namespace) {
  for (let c = 0; c < classes.children.length; c++) {
    if (classes.children[c].title.toLowerCase() === name.toLowerCase()) {
      isFound = true
      console.log(docAddress + classes.children[c].link)
      CheckLink(docAddress + classes.children[c].link, name, message)
    }
  }
}

/**
 * @param  {string} address
 * @param  {string} name
 * @param  {string} message
 */
function CheckLink (address, name, message) {
  request(address, function (error, response, body) {
    if (error) { return false }
    console.log('Status code:', response && response.statusCode)
    if (response.statusCode.toString() === '404') {
      message.channel.send('**' + name + '**' + notFound)
      TellDevThisFailed(name, message)
    } else {
      message.channel.send(address)
    }
  })
}

/**
 * Send DM to dev notifying of an error.
 * @param  {string} name
 * @param  {string} message
 */
function TellDevThisFailed (name, message) {
  console.log(message.author.username + ' Tried to search **' + name + '** But it failed.')
  let GlassToe = message.client.users.get(DevID)
  GlassToe.send(message.author + ' Tried to search **' + name + '** But it failed.')
}
