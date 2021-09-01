const Discord = require("discord.js"); // Discord.js'yi tanımladık.
const canvacord = require("canvacord");
var db = require('quick.db')

exports.run = async (bot, message, args) => {
   let member = message.mentions.users.first() || message.author

 
  let suankixp = db.fetch(`xp_${message.author.id}_${message.guild.id}`);
  let suankiseviye = db.fetch(`seviye_${message.author.id}_${message.guild.id}`);
  let birsonrakiSeviyeXp = "300"; // Bir sonraki seviyenin xp'sini hesaplamamız için gereken tanımlmama.

  if (!suankixp) db.add(`xp_${message.author.id}_${message.guild.id}`, 0)
  if (!suankiseviye) db.add(`seviye_${message.author.id}_${message.guild.id}`, 0)

const img = member.displayAvatarURL({size: 1024, format: "jpg", dynamic: "true"});

  var tag = member.tag.split("#").slice(1, 2)
  var isim = member.tag.split("#").slice(0, 1)



const rank = new canvacord.Rank()
    .setAvatar(img)
    .setCurrentXP(Number(suankixp))
    .setRequiredXP(Number(birsonrakiSeviyeXp))
    .setStatus(member.presence.status)
    .setProgressBar("#FFFFFF", "COLOR")
    .setUsername(isim + "")
    .setDiscriminator(tag)
    .setLevel(Number(suankiseviye), suankiseviye)
    .setRank(0,"", false)     
    

rank.build()
    .then(data => {
        const attachment = new Discord.MessageAttachment(data, "RankCard.png");
        message.channel.send(attachment);
    });
}

exports.conf = {
    aliases: ['p', 'pong', 'uptime',],
    permLevel: 0
};
exports.help = {
    name: 'seviye',
    description: 'Level sorgulama!',
    usage: 'seviye @affansen'
};