  
const Discord = require('discord.js');


exports.run = (client, message, args) => {
  if (!message.author.id === "539506680140922890") return message.reply("Orada dur bakalım.")
  
  let serverlist = ''
  client.guilds.cache.forEach((guild) => {
      serverlist = serverlist.concat(" **Sunucu ismi** :  " + guild.name + " **ID** : " + guild.id +    "**Üye** : " + guild.memberCount + "\n")
  })

  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Bulunduğum Sunucular :")
  .setDescription(serverlist)
  .setTimestamp()
  message.channel.send(embed); 



   };
exports.help = {
       name: 'sunucular',
       description: 'Yazıtura atar.',
       usage: 'yazıtura'
};

