const fs = require('fs-extra')
const debug = require('debug')('bot:repliers')

const wrapLog = (fn) => async (msg, npl) => {
  try {
    await fn(msg, npl)
  } catch (e) {
    debug(e)
    msg.reply('sorry, but something wrong happened 😢')
  }
}

module.exports = async () => {
  let files = await fs.readdir(__dirname)
  files = files.filter(name => name !== 'index.js')
  files = files.map(name => name.replace('.js', ''))

  let intents = {}

  for (const file of files) {
    const mod = require(`./${file}.js`)

    for (const fn of Object.keys(mod)) {
      intents[`${file}.${fn}`] = wrapLog(mod[fn])
    }
  }

  return intents
}
