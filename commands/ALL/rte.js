const Discord = require("discord.js");


exports.run = async (client, message, args) => {
  
    let member = message.mentions.users.first() || message.author

    let avatar = member.displayAvatarURL({size: 256, format: "jpg", dynamic: "false"})


    const attachment = new Discord.MessageAttachment("https://api.codare.fun/cerceve/rte?avatar=" + avatar, "lego.png");
    message.channel.send(attachment);


};
exports.conf = {
        aliases: ['p', 'pong', 'uptime',],
        permLevel: 0
};
exports.help = {
               name: 'rte',
               description: 'RTEx.',
               usage: 'rte @birisi'
 };
