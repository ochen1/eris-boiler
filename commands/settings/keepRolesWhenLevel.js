const { SettingCommand } = require('../../lib')

module.exports = new SettingCommand({
  name: 'keeproleswhenlevel',
  description: 'Set Whether or not to keep old level awards for the server, ignore if you are not using levelling,defaults to `Yes`',
  options: {
    parameters: [ 'Keep Old Levels? yes/no' ],
    // permission
  },
  displayName: 'Keep Old Role Levels',
  getValue: async (bot, { channel }) => {
    const dbGuild = await bot.SQLHandler.getGuild(channel.guild.id);
    const roleId = dbGuild.djRole

    if (!roleId) {
      return 'Yes'
    }

    return roleId == 1? "Yes":"No";
  },
  run: async (bot, { msg, params }) => {
    const [ roleId ] = params
    const fullParam = params.join(' ').toLowerCase()

    const guild = msg.channel.guild
    const role = fullParam.includes("yes") || fullParam.includes("no") ? (fullParam === "yes"? 1:0):false
    if (role === false) return "Choice must be either `yes` or `no`"
    const dbGuild = await bot.SQLHandler.getGuild(msg.guildID);
    if (role === dbGuild.keepRolesWhenLevel) {
      return 'Keep Roles when level was already set to that!'
    }

    await bot.SQLHandler.updateGuild(msg.guildID,{ keepRolesWhenLevel: role });
    return 'Keep Roles When Level now ' + (role? "on":"off");
  }
})
