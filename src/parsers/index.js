const fs = require('fs-extra')
const debug = require('debug')('bot:parser')

module.exports = async () => {
  debug('Loading')

  const parsers = (await fs.readdir(__dirname))
    .filter(name => name !== 'index.js')
    .map(name => require(`./${name}`))

  debug('Loaded')
  return parsers
}
