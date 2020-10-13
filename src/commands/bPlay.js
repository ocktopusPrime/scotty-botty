const { getRole } = require('../functions/getRole.js');
const { getMember } = require('../functions/getMember');
const { roleAdd } = require('../functions/roles.js');
const { hunterRole } = require('../config.json');
const { canPlay } = require('../functions/canPlay.js');
const { save, getData } = require('../database/database.js');
const Hunter = require('../database/models/Hunter');

module.exports = {
	name: 'play',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['bounty', 'bhunter', 'bh'],
	args: true,
	usage: '[/play bhunter]',
	execute(message, args) {
		const role = getRole(message.guild.roles.cache, hunterRole);
		const member = getMember(message.guild.members.cache, message.author.id);
		const hunter = new Hunter({
			username: member.user.username,
			userID: member.user.id,
		});

		//check args to see if they typed one of the aliases
		const checkAccntRole = async () => {
			const accnt = await getData(hunter);
			if (accnt) {
				if (canPlay(member.roles.cache, hunterRole))
					message.reply('You are already in the Bounty Hunter organization.');
			} else {
				save(hunter);
				if (!canPlay(member.roles.cache, hunterRole)) {
					roleAdd(message, role);
					return message.reply(
						`Welcome to the Bounty Hunter organization! Type /bhelp to be DM'd all of the available commands.`
					);
				}
			}
		};

		return checkAccntRole();
	},
};

// if (canPlay(member.roles.cache, hunterRole)) {
// 	//if account doesn't exist, remove the role then proceed to the next function
// 	getData(hunter)
// 		.then((bool) => {
// 			if (bool) return message.reply('You are already in the Bounty Hunter organization.');
// 		})
// 		.then(() => {
// 			roleRemove(message, role);
// 			message.reply('Something went wrong, please try again.');
// 		});
// } else if (this.aliases.includes(args[0])) {
// 	save(hunter);
// 	roleAdd(message, role);

// 	message.reply(
// 		`Welcome to the Bounty Hunter organization! Type /kit to be DM'd all of the available commands.`
// 	);
// }
