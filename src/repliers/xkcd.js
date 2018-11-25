const fetch = require('node-fetch')
const Discord = require('discord.js')

let latestData = null
let latestFetchTime = null
const cache = {}

const fetchLatest = async () => {
  if (!latestData || Date.now() - latestFetchTime >= 60 * 60 * 1000) {
    const res = await fetch('https://xkcd.com/info.0.json')
    latestData = await res.json()
    latestFetchTime = Date.now()
    cache[latestData.num] = latestData
  }
}

const makeEmbed = (data) => {
  const embed = new Discord.RichEmbed()
  embed.setTitle(data.title)
  embed.setImage(data.img)
  embed.setDescription(data.alt)
  return embed
}

const latest = async (msg) => {
  await fetchLatest()

  msg.reply('here\'s the latest XKCD comic', {
    embed: makeEmbed(latestData)
  })
}

const random = async (msg) => {
  await fetchLatest()

  const num = Math.floor(Math.random() * latestData.num) + 1
  let data

  if (cache[num]) {
    data = cache[num]
  } else {
    const res = await fetch(`https://xkcd.com/${num}/info.0.json`)
    data = await res.json()
  }

  msg.reply('here\'s a XKCD comic', {
    embed: makeEmbed(data)
  })
}

module.exports = {
  latest,
  random
}
