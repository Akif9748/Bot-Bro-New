const Discord = require('discord.js');


exports.run = (client, message, args) => {
    let member = message.mentions.users.first() || message.author
    if (message.author.id !== '539506680140922890') return message.channel.send('Üzgünüm, kim olursan ol, bunu sadece sahibim yapabilir :grinning:');

    let avatar = member.displayAvatarURL({})

    const embed = new Discord.MessageEmbed()
    .setTitle('Bot Resetleniyor.')

    .setColor('RANDOM')
    .setImage('https://cdn.discordapp.com/attachments/832641962564911185/832645980779315211/fb325679bd86c061503844b363babc7f.png')
    .setTimestamp()

    message.channel.send(embed).then(() => {
        process.exit(1);
      })
   };
   exports.conf = {
       aliases: ['p', 'pong', 'uptime',],
       permLevel: 0
   };
   exports.help = {
       name: 'reset',
       description: 'Boyun sahibi botu resetler.',
       usage: 'reset'
   };