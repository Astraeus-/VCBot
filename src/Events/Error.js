module.exports = (bot) => {
  bot.on('error', (error, id) => {
    console.error(`Encountered an error on shard ${id}`, error);
  });
};
