const { SettingCommand } = require('../../lib')
const { owner: permission } = require('../../permissions')

module.exports = new SettingCommand({
  name: 'everyone',
  description: 'Set the base Permissions for the server',
  options: {
    parameters: [ 'List of permissions that everyone has' ],
    permission
  },
  displayName: 'Base Permissions Role',
  getValue: async (bot, { channel }) => {
    const perms = await bot.permissionsHandler.getPermissions(channel.guild.id,"everyone")
    // const roleId = dbGuild.adminRole
    return "Permissions: "+ perms.join(" , ");
  },
  run: async (bot, { msg, params }) => {
   

    if (params.length == 0){
      return "Base permissions have been reset to the default!";
    }
    let arrs = params.join(",").split(",").filter(x=>x);

    const dbGuild = await bot.SQLHandler.getGuild(msg.guildID);
    if (arrs.sort() === dbGuild.everyonePerms.split(",").sort()) {
      return 'Base Permissions is already set to that!'
    }
    let permsList = bot.permissionsHandler.allPerms;
    let unknowns = arrs.filter(x=>!permsList.includes(x))
    if (unknowns.length) return "Sorry! I dont understand the permission node(s) `"+unknowns.join()+"`";
    await bot.SQLHandler.updateGuild(msg.guildID,{ everyonePerms: arrs.join(",") });
    return 'Base Permissions set, Perms allowed: ' + arrs.join(" , ");
  }
})
