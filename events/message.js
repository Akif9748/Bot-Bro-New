const Discord = require('discord.js');
const { prefix } = require('../config.json')

module.exports = msg => {
    
      if (msg.content.toLowerCase() === 'botbro'||msg.content.toLowerCase() === 'bot-bro') {
        msg.channel.send('Buyrun, komutlarımı **!yardım** yazarak öğrenebilirsiniz.');
      }
    
      if (msg.content.toLowerCase() === 'niye?' || msg.content.toLowerCase() === 'niye') {
        msg.channel.send('İşte. :/');
      }
      if (!msg.content.startsWith(prefix)) return;
      if (msg.content.toLowerCase() === prefix + 'çal altın') {
        msg.channel.send('Ben altın çalamam, kusura bakma, ben müzik çalarım :)');
      }
      if (msg.content.toLowerCase() === prefix + 'çal para') {
        msg.channel.send('Ben para çalamam, kusura bakma, ben müzik çalarım :)');
      }
      if (msg.content.toLowerCase() === prefix + 'dmgel') {
        msg.channel.send(msg.author.username + ' Geliyorum!');
        msg.author.send("Ne istemiştin?" +  msg.author)
      }
}
