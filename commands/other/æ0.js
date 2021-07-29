const Discord = require("discord.js");
const snekfetch = require('snekfetch');

exports.run = async (client, message, args) => {
  if (!message.channel.nsfw) return;
const id = [Math.floor(Math.random() * 10930)];
            const res = await snekfetch.get(`http://api.oboobs.ru/boobs/${id}`);
            const preview = res.body[0]["PREVIEW".toLowerCase()];
            const image = `http://media.oboobs.ru/${preview}`;

            const embed = new Discord.MessageEmbed()
               
                .setImage(image)
                .setColor('#CEA0A6');
            return message.channel.send({ embed });
}
exports.conf = {
  aliases: ['p', 'pong', 'uptime',],
  permLevel: 0
  
};
exports.help = {
  name: 'æ0',
   description: 'Böyle bir komut yok',
   usage: 'Böyle bir komut yok'
};

