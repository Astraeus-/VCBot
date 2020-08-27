const {guild, category} = require('../config');
const VCManager = require('../Classes/VCManager');

module.exports = (bot) => {
  bot.on('ready', () => {
    console.log('VCbot connected');

    const server = bot.guilds.get(guild);
    if (server) {
      const categoryChannel = server.channels.get(category);
      VCManager.populateChannels(categoryChannel);
    }    
  });
};
