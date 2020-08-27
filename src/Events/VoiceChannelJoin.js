const { creationChannel } = require('../config');
const VCManager = require('../Classes/VCManager');

module.exports = (bot) => {
  bot.on('voiceChannelJoin', async (member, channel) => {
    if (channel.id === creationChannel) {
      await VCManager.createChannel(channel, member);
    }
  });
};
