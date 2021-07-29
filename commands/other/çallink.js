const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const opus = require('opusscript');


exports.run = async (client, message, args) => {
  if (!message.member.voice.channel) return message.channel.send('Müzik dinlemek için önce **ses kanalına** bağlanman gerekir.')

  if (message.guild.me.voice.channel) return message.channel.send('Hali hazırda bot **birisi** için çalıyor.');

  if (!args[0]) return message.channel.send('Lütfen şarkının **URL**sini gir. https://www.youtube.com/ den bakabilirsin.');

  let validate = await ytdl.validateURL(args[0]);

  if (!validate) return message.channel.send('Üzgünüm, bu geçerli bir **URL** değil. https://www.youtube.com/ den bakabilirsin.');

  let connection = await message.member.voice.channel.join();


  if(video){
    const stream = ytdl(args[0], {filter: 'audioonly'});
    connection.play(stream, {seek: 8, volume: 1})
    .on('finish', () =>{
        voiceChannel.leave();
        
    });

    let bu = await message.reply('Şarkı çalınmaya başlandı: ' + video.url )
    bu.react('🎶');
    bu.react('🎵');
    bu.react('🎸');
}


        
};
exports.conf = {
  aliases: ['p', 'pong', 'uptime',],
  permLevel: 0
};
exports.help = {
  name: 'çallink',
  description: 'Yazdığın linki çalar.',
  usage: 'çallink https://www.youtube.com/watch?v=9hG40ltkuZI'
};