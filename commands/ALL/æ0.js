const Discord = require("discord.js");
const fetch = require('node-fetch');
exports.run = async (client, message, args) => {
  if (!message.channel.nsfw) return;
  const fetch = require('node-fetch');

const id = [Math.floor(Math.random() * 10930)];
const arama = await fetch(`http://api.oboobs.ru/boobs/${id}`)
const veri = await arama.json();

            const image = `http://media.oboobs.ru/${veri[0]["PREVIEW".toLowerCase()]}`;
            const embed = new Discord.MessageEmbed()
                .setImage(image)
                .setColor('#CEA0A6');
            return message.channel.send({ embed });
}

exports.help = {
  name: 'æ0',
   description: 'Böyle bir komut yok',
   usage: 'Böyle bir komut yok'
};
