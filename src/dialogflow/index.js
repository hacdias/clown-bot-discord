const dialogflow = require('dialogflow')
const sessionClient = new dialogflow.SessionsClient()
const sessions = {}
const debug = require('debug')('bot:dialogflow')

module.exports = async (id, query) => {
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

    return {
      answer: result.fulfillmentText,
      intent: result.intent ? result.intent.displayName : null
    }
  } catch (e) {
    debug(e)
    return {
      answer: 'sorry, but something wrong happened 😢',
      intent: null
    }
  }
}
