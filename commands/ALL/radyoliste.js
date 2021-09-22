const Discord = require('discord.js');
const fs = require("fs")
var rl = JSON.parse(fs.readFileSync('./radyo.json', 'utf8'))
const radio = Object.keys(rl);

exports.run = (client, message, args) => {
    var mee = "";
    radio.forEach(radyo => {
        mee += `${radio.indexOf(radyo) + " " + radyo}\n`
    })

    const embed = new Discord.MessageEmbed()
        .setTitle('Durma Komudu : !dur')
        .setDescription('Örnek = !radyo + numara')
        .addField('Radyo Kanalları', mee)
        .setFooter('Radyo Dinleme Servisi')

        .setTimestamp()
    message.channel.send(embed);



};

exports.help = {
    name: 'radyoliste',
    description: 'Radyo kanallarını listeler!',
    usage: 'radyoliste'
};
