const { Permission } = require('../classes')

module.exports = new Permission({
  name: 'Admin',
  level: 100,
  check: async (member, bot) => member.id === bot.ownerID
})
