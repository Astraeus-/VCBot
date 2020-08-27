require('dotenv').config({path: '../.env'});

module.exports = {
  token: process.env.TOKEN,
  guild: process.env.GUILD,
  category: process.env.CATEGORY,
  creationChannel: process.env.CREATE,
  general: process.env.GENERAL
};
