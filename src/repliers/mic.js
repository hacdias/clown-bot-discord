module.exports = ({ msg, query }) => {
  msg.channel.send(query, { tts: true })
}
