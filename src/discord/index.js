const Discord = require('discord.js')
const debug = require('debug')('bot:discord')
const client = new Discord.Client()

const onReady = () => {
  debug(`Logged in as ${client.user.tag}!`)

  client.user.setPresence({
    game: {
      name: 'with your life',
      type: 'PLAYING'
    },
    status: 'online'
  })
}

const onMessage = async (msg, parsers, repliers) => {
  if (msg.author.id === client.user.id) {
    // ignore itself
    return
  }

  let res = null

  for (const parser of parsers) {
    if ((res = await parser(msg)) !== null) {
      break
    }
  }

  if (!res) {
    return
  }

  res = Object.assign({
    intent: null,
    answer: null,
    args: []
  }, res)

  if (repliers[res.intent]) {
    repliers[res.intent](msg, ...res.args)
  } else if (res.answer) {
    msg.reply(res.answer)
  }
}

module.exports = async (token, parsers, repliers) => {
  debug('Starting Discord bot')
  client.on('ready', onReady)
  client.on('message', (msg) => onMessage(msg, parsers, repliers))
  client.login(token)
}

module.exports.client = client
