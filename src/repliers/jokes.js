const fetch = require('node-fetch')

const chuck = async (msg) => {
  const username = msg.author.username
  const parts = username.split(' ')
  let url = 'http://api.icndb.com/jokes/random'

  if (parts.length === 2) {
    url += `?firstName=${parts[0]}&lastName=${parts[1]}`
  }

  const res = await fetch(url)
  const data = await res.json()
  msg.reply(data.value.joke)
}

const dad = async (msg) =>{
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: { 'Accept': 'application/json' }
  })
  const data = await res.json()
  msg.reply(data.joke)
}

module.exports = {
  chuck,
  dad
}
