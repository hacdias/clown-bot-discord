const fetch = require('node-fetch')

const chuck = async (msg, answer) => {
  const username = msg.author.username
  const parts = username.split(' ')
  let url = 'http://api.icndb.com/jokes/random'

  if (parts.length === 2) {
    url += `?firstName=${parts[0]}&lastName=${parts[1]}`
  }

  const res = await fetch(url)
  const data = await res.json()
  let reply = data.value.joke

  if (answer) {
    reply = `${answer} ${reply}`
  }

  msg.reply(reply)
}

const dad = async (msg, answer) => {
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: { 'Accept': 'application/json' }
  })
  const data = await res.json()
  let reply = data.joke

  if (answer) {
    reply = `${answer} ${reply}`
  }

  msg.reply(reply)
}

module.exports = {
  'chuck': chuck,
  'chuck.more': chuck,
  'dad': dad,
  'dad.more': dad
}
