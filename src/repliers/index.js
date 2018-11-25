const fs = require('fs-extra')
const debug = require('debug')('bot:repliers')

const wrapLog = (fn) => async (msg) => {
  try {
    await fn(msg)
  } catch (e) {
    debug(e)
    msg.reply('sorry, but something wrong happened 😢')
  }
}

module.exports = async () => {
  debug('Loading')

  let files = await fs.readdir(__dirname)
  files = files.filter(name => name !== 'index.js')
  files = files.map(name => name.replace('.js', ''))

  const repliers = {}

  for (const file of files) {
    const mod = require(`./${file}.js`)

    if (typeof mod === 'function') {
      repliers[file] = mod
      continue
    }

    for (const fn of Object.keys(mod)) {
      repliers[`${file}.${fn}`] = wrapLog(mod[fn])
    }
  }

  debug('Loaded')
  return repliers
}
