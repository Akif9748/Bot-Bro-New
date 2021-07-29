  
const Discord = require('discord.js');




exports.run = (client, message, args) => {
    let member = message.mentions.users.first() || message.author

    let avatar = member.displayAvatarURL({size: 1024, format: "jpg", dynamic: "true"})


    const embed = new Discord.MessageEmbed()
    .setTitle(`${member.username}\'in bilgileri:`)
    .setImage(avatar)
    .setColor("RANDOM")
    .setDescription('İD:  ' + member.id + '\nŞu kişi istedi:  ' + message.author.username )

    message.channel.send(embed);
     
   };
   exports.conf = {
       aliases: ['p', 'pong', 'uptime',],
       permLevel: 0
   };
   exports.help = {
       name: 'pp',
       description: 'Sizin ya da ismini yazdığınız kişinin PP sini atar.',
       usage: 'pp @birisi ya da !pp'
   };