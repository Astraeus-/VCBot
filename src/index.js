const Client = require('./Client.js');
const { token } = require('./config.js');

const client = new Client(token, {
  allowedMentions: {
    everyone: true,
    roles: true,
    users: true
  },
  intents: [
    'guilds',
    'guildVoiceStates'
  ]
});

client.launch();
