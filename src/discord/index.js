const Discord = require('discord.js')
const debug = require('debug')('bot:discord')
const getResponse = require('../dialogflow')
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

const onMessage = async (msg, repliers) => {
  if (msg.author.id === client.user.id) {
    // ignore itself
    return
  }

  let answer
  let intent

  if (msg.content.startsWith('$')) {
    const query = msg.content.slice(1)
    intent = query.replace(' ', '.')
  } else if (!msg.isMentioned(client.user.id)) {
    // ignore where not mentioned
    console.log('ignoring')
    return
  } else {
    const res = await getResponse(msg.author.username, msg.content)
    answer = res.answer
    intent = res.intent
  }

  if (repliers[intent]) {
    repliers[intent](msg)
  } else if (answer) {
    msg.reply(answer)
  }
}

module.exports = async (token, repliers, manager) => {
  debug('Starting Discord bot')
  client.on('ready', onReady)
  client.on('message', (msg) => onMessage(msg, repliers, manager))
  client.login(token)
}
