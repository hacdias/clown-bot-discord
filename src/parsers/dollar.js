module.exports = (msg) => {
  if (!msg.content.startsWith('!')) {
    return null
  }

  const intent = msg.content.slice(1).split(' ', 1)[0]
  const query = msg.content.slice(intent.length + 1).trim()

  return { intent, query }
}
