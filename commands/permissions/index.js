
const { GuildCommand } = require('../../lib')

// const prefix = require('./prefix')
const mod = require('./mod')
const everyone = require('./everyone')
const dj = require('./dj')
const extraRole = require("./extraRole")
const extraRole2 = require("./extraRole2")

// const keeproleswhenlevel = require("./keepRolesWhenLevel");
module.exports = new GuildCommand({
  name: 'permissions',
  description: 'Change some permissions for your server :)',
  options: {
    subCommands: [
      // prefix,
      everyone,
      mod,
      dj,
  // ,
      extraRole,
      extraRole2,
      // keeproleswhenlevel,
    ],
    aliases: ["perms"]
  },
  run: async function (bot, context) {
    return {
      embed: {
        description: 'Permissions :tools:',
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
