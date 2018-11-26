const fs = require('fs-extra')
const debug = require('debug')('bot:repliers')

const wrapLog = (fn) => async (ctx) => {
  try {
    await fn(ctx)
  } catch (e) {
    debug(e)
    ctx.msg.reply('sorry, but something wrong happened 😢')
  }
}

module.exports = async () => {
  debug('Loading')

  const repliers = {}

  for (const file of await fs.readdir(__dirname)) {
    if (file === 'index.js') continue
    const name = file.replace('.js', '')
    repliers[name] = wrapLog(require(`./${file}`))
  }

  debug('Loaded %o', repliers)
  return repliers
}
