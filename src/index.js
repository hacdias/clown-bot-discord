const getParsers = require('./parsers')
const getRepliers = require('./repliers')
const getBot = require('./discord')

const start = async () => {
  const parsers = await getParsers()
  const repliers = await getRepliers()
  await getBot(process.env.DISCORD_BOT, parsers, repliers)
}

start()
