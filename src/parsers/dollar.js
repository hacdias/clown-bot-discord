module.exports = (msg) => {
  if (!msg.content.startsWith('$')) {
    return null
  }

  if (msg.content.startsWith('$mic')) {
    return {
      intent: 'mic',
      args: [
        msg.content.slice(4).trim()
      ]
    }
  }

  return {
    intent: msg.content.slice(1).replace(' ', '.')
  }
}
