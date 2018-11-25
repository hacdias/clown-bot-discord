const { NlpManager } = require('node-nlp')
const { join } = require('path')
const { readJson } = require('fs-extra')

module.exports = async () => {
  const manager = new NlpManager({ languages: ['en'] })

  const documents = await readJson(join(__dirname, 'data/documents.json'))
  const answers = await readJson(join(__dirname, 'data/answers.json'))

  for (const intent of Object.keys(documents)) {
    for (const msg of documents[intent]) {
      manager.addDocument('en', msg, intent)
    }
  }

  for (const intent of Object.keys(answers)) {
    for (const msg of answers[intent]) {
      manager.addAnswer('en', msg, intent)
    }
  }

  await manager.train()
  // TODO: save and load
  return manager
}
