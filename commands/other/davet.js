const Discord = require('discord.js');


exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .addField('Bot davet linki:','[Davet Linki](https://discord.com/oauth2/authorize?client_id=799613425055432714&scope=bot&permissions=0)')
    .addField('Aynı zamanda botta herhangi bir hatayı, bota eklenmesini istediğiniz şeyleri, botla ilgili şikayetlerinizi iletmek için sunucumuza gelebilirsiniz.','[Destek Sunucusu](https://discord.gg/9cBnKmjzvH)')
    .setColor("000000")
    .setImage('https://cdn.discordapp.com/attachments/832641962564911185/832645980779315211/fb325679bd86c061503844b363babc7f.png')
    .setTimestamp()
    message.channel.send(embed);
  
  
};
exports.conf = {
    aliases: ['p', 'pong', 'uptime',],
    permLevel: 0
};
exports.help = {
    name: 'davet',
    description: 'Botun sunucusunu ve davet linkini atar.',
    usage: 'davet'
};