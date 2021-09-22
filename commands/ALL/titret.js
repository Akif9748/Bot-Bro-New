const Discord = require('discord.js');
const canvacord = require("canvacord");

exports.run = async (client, message, args) => {

  const member = message.mentions.members.first() || 
  message.guild.members.cache.get(args[0]) || 
  message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || 
  message.member;
  let avatar = member.user.displayAvatarURL({
    dynamic: false,
    format: "png"
  });

 
  let image = await canvacord.Canvas.trigger(avatar);
  let attachment = new Discord.MessageAttachment(image, " triggered.gif")
  return message.channel.send({ files: [attachment] })

}



exports.help = {
  name: 'titret',
  description: 'İstediğiniz kullanıcıya trigger effecti ekler.',
  usage: 'titret @ZeYnEpK',
};
