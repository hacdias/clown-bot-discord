const Discord = require('discord.js')
const debug = require('debug')('bot:discord')

const client = new Discord.Client()

const onReady = () => {
  debug(`Logged in as ${client.user.tag}!`)
}

const onMessage = async (msg, repliers, manager) => {
  if (msg.author.id === client.user.id) {
    // ignore itself
    return
  }

  if (msg.content.startsWith('!meta')) {
    msg.reply('TODO: meta commands')
    return
  }

  const res = await manager.process('en', msg.content)

  if (repliers[res.intent]) {
    repliers[res.intent](msg, res)
  }
}

module.exports = async (token, repliers, manager) => {
  client.on('ready', onReady)
  client.on('message', (msg) => onMessage(msg, repliers, manager))
  client.login(token)
}
