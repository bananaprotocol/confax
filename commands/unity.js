/*  unity.js by David Jerome @GlassToeStudio - GlassToeStudio@gmail.com

    12 September, 2017
    https://github.com/GlassToeStudio
    http://glasstoestudio.weebly.com/
    https://twitter.com/GlassToeStudio

    ------------------------------------------------------------------------
    Allow a user to input a Unity c# script reference
    a link to the Unity documentation online.

    Usage:
      !unity <term>

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
const notFound = ' was not found. Either it does not exist or it is mispelled.'

var isFound = false

Confax.registerCommand('unity', 'default', (message, bot) => {
  let channel = message.guild.channels.find('name', 'vip_members')
  if (channel === null || channel !== message.channel) { return }
  isFound = false
  let name = message.content.toString()
  //  Start the request to get the toc js object
  request(TOCAddress, function (error, response, body) {
    if (error) { return }
    //  remove var toc =
    let tableOfContents = JSON.parse(body.slice(9))
    SearchAll(tableOfContents.children, name, message)
    if (!isFound) {
      message.channel.send('__**' + name + '**__' + notFound)
      TellDevThisFailed(name, message)
    }
  })
}, ['Unity', 'unity3D', 'U3D', 'u3d', 'script', 'ref'], 'Look up Unity terms in the online script reference.', '<term>')

/**
 * Recursive search through each child node of the toc object
 * return if search item is found.
 * @param  {} tocLevel
 * @param  {} name
 * @param  {} message
 */
function SearchAll (tocLevel, name, message) {
  for (let child = 0; child < tocLevel.length; child++) {
    if (tocLevel[child].title.toLowerCase() === name.toLowerCase()) {
      isFound = true
      CheckLink(docAddress + tocLevel[child].link, name, message)
    } else if (tocLevel[child].children !== null) SearchAll(tocLevel[child].children, name, message)
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
      message.channel.send('__**' + name + '**__' + notFound)
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
  GlassToe.send(message.author + ' Tried to search __**' + name + '**__ But it failed.')
}
