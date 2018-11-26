const fetch = require('node-fetch')
const { RichEmbed } = require('discord.js')

const chuck = async ({ msg }) => {
  const username = msg.author.username
  const parts = username.split(' ')
  let url = 'http://api.icndb.com/jokes/random'

  if (parts.length === 2) {
    url += `?firstName=${parts[0]}&lastName=${parts[1]}`
  }

  const res = await fetch(url)
  const data = await res.json()

  return {
    joke: data.value.joke,
    source: 'icndb.com',
    defaultAnswer: `here's a chuck norris joke:`
  }
}

const dad = async () => {
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: { 'Accept': 'application/json' }
  })

  return {
    joke: (await res.json()).joke,
    source: 'icanhazdadjoke.com',
    defaultAnswer: `here's a dad joke:`
  }
}

module.exports = async (ctx) => {
  const { msg, query, answer } = ctx
  const type = query.split(' ', 1)[0]
  let data = null

  if (type === 'chuck') {
    data = await chuck(ctx)
  } else if (type === 'dad') {
    data = await dad(ctx)
  } else {
    return
  }

  const embed = new RichEmbed()
  embed.setDescription(data.joke)
  embed.setColor('RANDOM')
  embed.setFooter(`Source: ${data.source}`)
  msg.reply(answer || data.defaultAnswer, { embed })
}
