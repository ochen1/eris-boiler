const { SettingCommand } = require('../../lib')

module.exports = new SettingCommand({
  name: 'prefix',
  description: 'set prefix for server',
  options: {
    parameters: [ 'desired prefix' ]
  },
  displayName: 'Prefix',
  getValue: async (bot, { channel }) => {
    const dbGuild = await bot.dbm.newQuery('guild').get(channel.guild.id)
    return (dbGuild.get('prefix') || bot.ora.defaultPrefix) + "do `"+(dbGuild.get('prefix') || bot.ora.defaultPrefix)+" settings prefix new_prefix` to change the prefix!"
  },
  run: async (bot, { msg, params }) => {
    const fullParam = params.join(' ')
    if (!fullParam) {
      return 'Please provide a prefix!'
    }

    const dbGuild = await bot.SQLHandler.getGuild(msg.guildID);
    if (fullParam === dbGuild.prefix) {
      return `Prefix is already set to "${fullParam}"`
    }

    await bot.SQLHandler.updateGuild(msg.guildID,{ prefix: fullParam })
    return 'Prefix set!'
  }
})
