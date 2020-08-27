const VCManager = require('../Classes/VCManager');

module.exports = (bot) => {
  bot.on('voiceChannelLeave', (member, channel) => {
    if (!VCManager.isReadyToDelete(channel)) {
      return;
    }

    VCManager.deleteChannel(channel);
  });
};
