const dialogflow = require('dialogflow')
const sessionClient = new dialogflow.SessionsClient()
const sessions = {}
const debug = require('debug')('bot:dialogflow')
const { client } = require('../discord')

module.exports = async (msg) => {
  if (!msg.isMentioned(client.user.id)) {
    return
  }

  const id = msg.author.username
  const query = msg.content

  try {
    if (!sessions[id]) {
      sessions[id] = sessionClient.sessionPath(process.env.PROJECT_ID, id)
    }

    const request = {
      session: sessions[id],
      queryInput: {
        text: {
          text: query,
          languageCode: 'en-US'
        }
      }
    }

    const response = await sessionClient.detectIntent(request)
    const result = response[0].queryResult
    const rawIntent = result.intent ? result.intent.displayName : null
    const intent = rawIntent ? rawIntent.split(' ', 1)[0] : null

    return {
      answer: result.fulfillmentText,
      intent: intent,
      query: rawIntent ? rawIntent.slice(intent.length).trim() : null
    }
  } catch (e) {
    debug(e)
    return {
      answer: 'sorry, but something wrong happened 😢',
      intent: null
    }
  }
}
