const VCManager = require('../Classes/VCManager');

module.exports = (bot) => {
  bot.on('disconnect', () => {
    console.log('VCBot disconnected, reconnecting...');
    VCManager.clearChannels();
  });
};
