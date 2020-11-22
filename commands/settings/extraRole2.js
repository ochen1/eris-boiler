const { SettingCommand } = require('../../lib')
const { owner: permission } = require('../../permissions')

module.exports = new SettingCommand({
  name: 'extrarole2',
  description: 'Set the Second Extra Permissions Role for the server',
  options: {
    parameters: [ 'Second Extra Permissions Role name/id/mention' ],
    permission
  },
  displayName: 'Second Extra Permissions Role',
  getValue: async (bot, { channel }) => {
    const dbGuild = await bot.SQLHandler.getGuild(channel.guild.id);
    const roleId = dbGuild.djRole

    if (!roleId) {
      return 'None'
    }

    return `<@&${roleId}>`
  },
  run: async (bot, { msg, params }) => {
    const [ roleId ] = params
    const fullParam = params.join(' ')

    const guild = msg.channel.guild
    const role = guild.roles.get(roleId) || guild.roles.find((r) => r.name === fullParam || (fullParam.includes("<@&") && r.id === (fullParam.split("<@&")[1].split(">")[0])));

    if (!role) {
      return `Could not find role "${fullParam}"`
    }

    const dbGuild = await bot.SQLHandler.getGuild(msg.guildID);
    if (role.id === dbGuild.djRole) {
      return 'DJ Permissions is already set to that role!'
    }

    await bot.SQLHandler.updateGuild(msg.guildID,{ djRole: role.id });
    return 'DJ Permissions set!'
  }
})
