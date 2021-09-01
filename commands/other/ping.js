const Discord = require('discord.js')


exports.run = (client, message, args) => {
 
    const ping = new Discord.MessageEmbed()
        .setDescription(`Ping:\`${client.ws.ping}\`ms`);


        message.channel.send(ping);
  
  
};
exports.conf = {
    aliases: ['p', 'pong', 'uptime',],
    permLevel: 0
};
exports.help = {
    name: 'ping',
    description: 'Botun Pingini Gösterir!',
    usage: 'ping'
};