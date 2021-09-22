const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
var os = require("os");



exports.run = (client, message, args) => {

  let serverlist = ''
        let count = 0; //<---
        client.guilds.cache.forEach((guild) => {
        count += guild.memberCount // <---
 
    })
    const duration = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
  var usedMemory = os.totalmem() - os.freemem(),
    totalMemory = os.totalmem();
  var getpercentage = ((usedMemory / totalMemory) * 100).toFixed(2) + "%";
    
   
        const embed = new Discord.MessageEmbed()
        .setTitle('Bot Durumu:')
        .setColor('RANDOM')
        .setImage('https://cdn.discordapp.com/attachments/832641962564911185/832645980779315211/fb325679bd86c061503844b363babc7f.png')
        .setTimestamp()
        .addField("Bot İsmi:", client.user.username, true) 
        .addField("Bot ID:", client.user.id, true) 
        .addField("Botun Pingi:", "`" + client.ws.ping + 'ms`', true)
        .addField("Sunucular:", client.guilds.cache.size, true) 
        .addField("Kanallar:", client.channels.cache.size, true)
        .addField("Aktif Kullanıcı sayısı: ", count, true) 
        .addField("Node.js Sürümü:", process.version, true)
        .addField("Discord.js sürümü:", Discord.version, true)
        .addField("RAM kullanımı:", (usedMemory / Math.pow(1024, 3)).toFixed(2) + "MB", true)
        .addField("Disk kullanımı:", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB", true)
        .addField("CPU ve kullanımı: ", os.cpus().map(i => `${i.model}`)[0] + " %" + (process.memoryUsage().heapUsed / 31000 / 31000).toFixed(2), true)
        .addField("Çalışma süresi:", duration, true)
        .addField("Sahip: ",`Akif#7304` , true)
        .addField("Prefix: ",`!` , true)
        .addField("Durum: ",`!yardım` , true)
        .addField("Destek sunucusu: ", `[Destek Sunucusu](https://discord.gg/9cBnKmjzvH)`, true)
        .addField('Bot davet linki:','[Davet Linki](https://discord.com/oauth2/authorize?client_id=799613425055432714&scope=bot&permissions=0)', true)
        message.channel.send(embed);
    
};
exports.conf = {
    aliases: ['p', 'pong', 'uptime',],
    permLevel: 0
};
exports.help = {
    name: 'botbilgi',
    description: 'Bot hakkında bilgiler verir.',
    usage: 'botbilgi'
};
