const Discord = require('discord.js');
const ai = require('@codare/codare.ai')




exports.run = (client, message, args) => {
    if (!args) return message.reply("Niye sormuyon?")
    ai.sor(args.join()).then(res => {
        message.reply(res)  
        })
     
   };
   exports.conf = {
       aliases: ['p', 'pong', 'uptime',],
       permLevel: 0
   };
   exports.help = {
       name: 'sor',
       description: 'bota soru sorar.',
       usage: 'sor soru'
   };