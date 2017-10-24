const Confax = require('../bot.js')

Confax.registerCommand('instructions', 'default', (message, bot) => {
    return("\nSIMPLE INSTRUCTIONS:\n"  +
    "``` \n" +
    "1. Go to Hastenbin/Pastebin\n" +
    "2. Paste your FULL script\n" +
    "3. Click save and generate link\n" +
    "4. Paste link here.\n" +
    "```" )
}, ['paste', 'haste', 'pastebin', 'hastebin'], 'Simple Instuctions to post a link to your code', '<!haste>')
