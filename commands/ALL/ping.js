const Discord = require('discord.js')


exports.run = (client, message, args) => {
 
    const ping = new Discord.MessageEmbed()
        .setDescription(`Client Ping: \`${client.ws.ping}\` ms`)


        message.channel.send(ping);
  const ping2 = new Discord.MessageEmbed()
        .setDescription(`Message Ping: \`${Date.now() - message.createdTimestamp}\` ms`)

        message.channel.send(ping2);
  
  
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
