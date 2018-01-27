const Confax = require('../bot.js')

Confax.registerCommand('instructions', 'default', (message, bot) => {
  return ('\nSIMPLE INSTRUCTIONS:\n' +
          '``` \n' +
          '1. Go to Codeshare.io\n' +
          '2. Click "Share Code Now"' +
          '3. Paste your FULL script\n' +
          '3. Click the little gear on the right and choose your code language\n' +
          '4. Copy the URL and Paste link here.\n' +
          '```')
}, ['paste', 'codeshare'], 'Simple Instuctions to post a link to your code', '<!haste>')
