const { RichEmbed } = require('discord.js')

module.exports = ({ msg }) => {
  const embed = new RichEmbed()
  embed.setTitle('Help')

  embed.setDescription(`To interact with me, you can prefix me (!) or mention me. When mentioning me,
you can use natural language to describe what you want.

!jokes dad
!jokes chuck
!xkcd latest
!xkcd random
!mic [something to say]`)

  msg.reply('hope this helps:', { embed })
}
