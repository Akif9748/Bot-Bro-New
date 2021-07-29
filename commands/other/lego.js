const Discord = require("discord.js");


exports.run = async (client, message, args) => {
  
    let member = message.mentions.users.first() || message.author

    let avatar = member.displayAvatarURL({size: 512, format: "jpg", dynamic: "false"})


    const attachment = new Discord.MessageAttachment("https://api.codare.fun/cerceve/lego?avatar=" + avatar, "lego.png");
    message.channel.send(attachment);


};
exports.conf = {
        aliases: ['p', 'pong', 'uptime',],
        permLevel: 0
};
exports.help = {
               name: 'lego',
               description: 'Görsel arama. /10 yazarsanız 10 tane arar.',
               usage: 'lego @birisi'
 };
