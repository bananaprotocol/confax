const Confax = require('../bot.js')
const math = require('mathjs')

Confax.registerCommand('math', 'default', (message, bot) => {
  let result
  try {
    result = math.evaluate(message.content)
  } catch (error) {
    console.log('Failed math calculation ' + message.content + '\nError: ' + e.stack)
    return 'Error while evaluating the math expression.'
  } finally {
    if (isNaN(parseFloat(result))) {
      return 'Invalid Calculation Expression'
    } else {
      return '**Result:** ' + result
    }
  }
}, ['calculate', 'calc', 'calculator'], 'Calculate a math expression', '<expression>')
