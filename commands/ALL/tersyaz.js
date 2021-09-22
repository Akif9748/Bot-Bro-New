


const Discord = require('discord.js');



exports.run = async (client, message, args) => {
  if (args.length < 1) {
    return message.reply('Kelimeyi yaz.')
  }
const embed = new Discord.MessageEmbed()
.setDescription(args.join(' ').split('').reverse().join(''))
.setColor('RANDOM')
  await message.channel.send(embed);
 };
 exports.conf = {
     aliases: ['p', 'pong', 'uptime',],
     permLevel: 0
 };
 exports.help = {
     name: 'tersyaz',
     description: 'Ters yazar.',
     usage: 'tersyaz bişiler'
 };