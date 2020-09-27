module.exports = {
	name: 'bounty-board',
	description: 'Display all of the bounties in your current server',
	aliases: ['bountyboard', 'bounties', 'bountyb'],
	usage: '[/bounty-board]',
	execute(message) {
		// anyone can re-post the bounty board
		const markedBounty = message.guild.roles.cache.find((role) => role.name === 'Marked For Bounty');
		message.guild.members.cache.find((member) => {
			// send an embedded card of the user with their progress, name, avatarurl, and some other stats
			if (member.roles.cache.has(markedBounty.id)) return message.channel.send(member.user.username);
		});
		message.channel.send('No Bounties are currently on the board.');
	},
};