const { creationChannel } = require('../config');
const VCManager = require('../Classes/VCManager');

module.exports = (bot) => {
  bot.on('voiceChannelSwitch', async (member, newChannel, oldChannel) => {
    if (VCManager.isReadyToDelete(oldChannel)) {
      VCManager.deleteChannel(oldChannel);
    }

    if (newChannel.id === creationChannel) {
      await VCManager.createChannel(newChannel, member);
    }
  });
};
