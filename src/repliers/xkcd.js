const fetch = require('node-fetch')
const Discord = require('discord.js')

const latest = async (msg, npl) => {
  const res = await fetch('https://xkcd.com/info.0.json')
  const json = await res.json()

  const embed = new Discord.RichEmbed()
  embed.setTitle(json.title)
  embed.setImage(json.img)
  embed.setDescription(json.alt)

  msg.reply('here\'s the latest XKCD comic', { embed })
}

module.exports = {
  latest
}
