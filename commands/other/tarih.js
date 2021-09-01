const Discord = require("discord.js");

exports.run = (client, message, args) => {
    var zaman = new Date();
    message.channel.send('Saat:  ' + zaman.toLocaleTimeString() + '\nTarih:  ' + zaman.toLocaleDateString());
   };
   exports.conf = {
       aliases: ['p', 'pong', 'uptime',],
       permLevel: 0
   };
   exports.help = {
       name: 'tarih',
       description: 'Tarih ve saati yollar.',
       usage: 'tarih'
   };