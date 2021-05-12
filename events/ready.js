const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const { prefix } = require('../config.json')

module.exports = client => {
    let serverlist = ''
    let count = 0;
    client.guilds.cache.forEach((guild) => {
    count += guild.memberCount 
    });
console.log("Hazır");
client.user.setPresence({ activity: { name: count + " kişiyle !yardım" }, status: 'idle' });
} 
