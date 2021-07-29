const Discord = require("discord.js");
const db = require('quick.db');


exports.run = async (client, message, args) => {
        let member = message.mentions.users.first() || message.author

        if (!message.author.id === "539506680140922890") return message.reply("hop hop hop")
        db.set(`premium_${member.id}`, 1)

};
exports.conf = {
        aliases: ['p', 'pong', 'uptime',],
        permLevel: 0

};
exports.help = {
               name: 'premium',
               description: 'Sadece akif.',
               usage: 'premium'
 };
