const Eris = require('eris');
const fs = require('fs').promises;
const path = require('path');

class Client {
  constructor (...args) {
    this.bot = new Eris(...args);
  }

  async launch () {
    await Client.loadEvents(this.bot, path.join(__dirname, 'Events'));
    return this.bot.connect();
  }

  static async loadEvents (bot, dir) {
    bot.removeAllListeners();

    return fs.readdir(dir).then((events) => {
      for (let i = 0; i < events.length; i++) {
        const event = Client.loadEvent(events[i]);
        event(bot);
      }
    }).catch((error) => {
      throw error;
    });
  }

  static loadEvent(eventType) {
    const eventCached = require.cache[require.resolve(path.join(__dirname, 'Events', eventType))];

    if (eventCached) {
      delete require.cache[require.resolve(path.join(__dirname, 'Events', eventType))];
    }

    const event = require(path.join(__dirname, 'Events', eventType));
    return event;
  }
}

module.exports = Client;
