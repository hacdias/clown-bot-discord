const getRepliers = require('./repliers')
const getManager = require('./nlp')
const getBot = require('./discord')

const start = async () => {
  const repliers = await getRepliers()
  const manager = await getManager()
  await getBot(require('./auth.json').token, repliers, manager)
}

start()
