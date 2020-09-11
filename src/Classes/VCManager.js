const { creationChannel, general } = require('../config');

class VCManager {
  constructor() {
    this.voiceChannels = new Map();
  }

  /**
   * Creates a new voice channel.
   * @param {VoiceChannel} voiceChannel The voice channel new channels are created from.
   * @param {member} member 
   */
  async createChannel(voiceChannel, member) {
    const channelName = this.generateVoiceChannelName(member.nick || member.username);

    const channel = await voiceChannel.guild.createChannel(channelName, 2, {
      'parentID': voiceChannel.parentID,
      'permissionOverwrites': [
        {
          id: member.id,
          type: 'member',
          allow: 268435472,
          deny: 0
        }
      ]
    }).catch((error) => {
      console.error(error);
    });

    this.voiceChannels.set(channel.id, channel);

    await member.edit({
      'channelID': channel.id
    });
  }

  /**
   * Generates a voice channel name.
   * @param {string} name The name to create the voice channel name with.
   * @returns {string} 
   */
  generateVoiceChannelName(name) {
    return `${name}-VC`;
  }

  /**
   * Check if the channel is inactive to be deleted.
   * @param {VoiceChannel} voiceChannel 
   * @returns {boolean}
   */
  isReadyToDelete(voiceChannel) {
    return this.voiceChannels.has(voiceChannel.id)
      && voiceChannel.voiceMembers.size == 0;
  }

  /**
   * Deletes a voice channel
   * @param {VoiceChannel} voiceChannel 
   */
  async deleteChannel(voiceChannel) {
    await voiceChannel.delete('All users have left the channel');
    this.voiceChannels.delete(voiceChannel.id);
  }

  /**
   * Clears the voice channel cache.
   */
  clearChannels() {
    this.voiceChannels.clear();
  }

  /**
   * Populates the voice channel cache after downtime.
   * @param {CategoryChannel} category 
   */
  populateChannels(category) {
    const categoryChannels = category.channels.values();

    for (const channel of categoryChannels) {
      if (channel.type !== 2 || channel.id === creationChannel || channel.id === general) {
        continue;
      }

      this.voiceChannels.set(channel.id, channel);

      if (this.isReadyToDelete(channel)) {
        this.deleteChannel(channel);
      }
    }
  }
}

module.exports = new VCManager();
