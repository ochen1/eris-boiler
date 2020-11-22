const { owner } = require('eris-boiler/permissions')
const { GuildCommand } = require('../../lib')
const { vip: permission } = require('../../permissions')

const prefix = require('./prefix')
const mod = require('./vip')

module.exports = new GuildCommand({
  name: 'settings',
  description: 'Change some settings for your server :)',
  options: {
    permission,
    subCommands: [
      prefix,
      mod,
      dj,
      owner,
    ]
  },
  run: async function (bot, context) {
    return {
      embed: {
        description: ':gear: Settings',
        thumbnail: { url: bot.user.avatarURL },
        timestamp: require('dateformat')(Date.now(), 'isoDateTime'),
        color: 0x3498db,
        fields: await Promise.all(this.subCommands.map(async (sub) => ({
          name: sub.displayName,
          value: await sub.getValue(bot, context),
          inline: true
        })))
      }
    }
  }
})
