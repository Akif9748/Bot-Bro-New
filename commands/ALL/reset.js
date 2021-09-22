const Discord = require('discord.js');


exports.run = (client, message, args) => {
    let member = message.mentions.users.first() || message.author
    if (message.author.id !== '539506680140922890') return message.channel.send('Üzgünüm, kim olursan ol, bunu sadece sahibim yapabilir :grinning:');
    const embed = new Discord.MessageEmbed()
    .setTitle('Bot Resetleniyor.')
    .setColor('RANDOM')
    .setTimestamp()
    message.channel.send(embed).then(() => {
        process.exit(1);
      })
   };

   exports.help = {
       name: 'reset',
       description: 'Boyun sahibi botu resetler.',
       usage: 'reset'
   };
