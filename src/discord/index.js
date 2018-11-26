const Discord = require('discord.js')
const debug = require('debug')('bot:discord')
const client = new Discord.Client()

const onReady = () => {
  debug(`Logged in as ${client.user.tag}!`)

  client.user.setPresence({
    game: {
      name: 'you',
      type: 'WATCHING'
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

  msg.channel.startTyping()

  res = Object.assign({
    intent: null,
    answer: null,
    query: null
  }, res)

  if (repliers[res.intent]) {
    await repliers[res.intent]({
      query: res.query,
      answer: res.answer,
      msg: msg
    })
  } else if (res.answer) {
    msg.reply(res.answer)
  } else {
    msg.reply('sorry, I did not quite understand you 😢')
  }

  msg.channel.stopTyping()
}

module.exports = async (token, parsers, repliers) => {
  debug('Starting Discord bot')
  client.on('ready', onReady)
  client.on('message', (msg) => onMessage(msg, parsers, repliers))
  client.login(token)
}

module.exports.client = client
