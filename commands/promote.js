const showInfo = require('../utils/logs/showInfo');
const showError = require('../utils/logs/showError');
const nconf = require('nconf');

nconf.file({ file: 'config.json' });

const handlePromoteCommand = async (message, botClient) => {
  const usedClient = botClient.user.self.displayName;
  
  const commandMatch = message.content.match(/^bot@promote\s+(\d+)/);
  if (!commandMatch) return;
  
  const username = commandMatch[1].trim();
  
    const access = 'commands:promote';
    const admins = nconf.get('client:command_admin:admins') || ['oumar_boss'];
    const isAdminOnly = nconf.get(access) === 'admin_only';
    const isAdmin = admins.includes(message.author.id) || admins.includes(message.author.displayName);

    if (isAdminOnly && !isAdmin) {
      showError(`${usedClient} : You don't have permission to use this command.`);
      return;
    }

    if (!username) {
      showError(`${usedClient} : The player wasn't found!`);
      return;
    }

    try {
      await botClient.party.me.promote(username);
      showInfo(`${usedClient} : The player has been promoted`);
    } catch (err) {
      showError('Error promoting player', err);
    }
};

module.exports = handlePromoteCommand;
