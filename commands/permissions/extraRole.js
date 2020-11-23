const { SettingCommand } = require('../../lib')
// const { owner: permission } = require('../../permissions')

module.exports = new SettingCommand({
  name: 'extrarole',
  description: 'Set the Extra Role Permissions for the server',
  options: {
    parameters: [ 'List of permissions that the role has or "none" to clear' ],
    permission
  },
  displayName: 'Extra Role Permissions',
  getValue: async (bot, { channel }) => {
    const perms = await bot.permissionsHandler.getPermissions(channel.guild.id,"everyone")
    // const roleId = dbGuild.adminRole
    return "Permissions: "+ perms.join("\n");
  },
  run: async (bot, { msg, params }) => {
   

    if (params[0].toLowerCase() === "none"){
      return "Extra Role permissions have been reset to the default!";
    }
    let arrs = params.join(",").split(",").filter(x=>x);

    const dbGuild = await bot.SQLHandler.getGuild(msg.guildID);
    if (arrs.sort() === dbGuild.everyonePerms.split(",").sort()) {
      return 'Extra Role Permissions is already set to that!'
    }
    let permsList = bot.permissionsHandler.allPerms;
    let unknowns = arrs.filter(x=>!permsList.includes(x))
    if (unknowns.length) return "Sorry! I dont understand the permission node(s) `"+unknowns.join()+"`";
    await bot.SQLHandler.updateGuild(msg.guildID,{ everyonePerms: arrs.join(",") });
    return 'Extra Role Permissions set, Perms allowed: ' + arrs.join(" , ");
  }
})
