const getRepliers = require('./repliers')
const getBot = require('./discord')

const start = async () => {
  const repliers = await getRepliers()
  await getBot(process.env.DISCORD_BOT, repliers)
}

start()
