const player = require('discordjs-ytdl-advanced')


const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  
    if (!args[0]) return message.channel.send('Lütfen bir kelime girin.');
    if (message.member.voice.channel){
        const connection = await message.member.voice.channel.join()
        const şarkı = await player(args.join(" "))
        şarkı.play(connection)
        const embed = new Discord.MessageEmbed()
        .setTitle('Şarkı Bulundu: ' + şarkı.title)
        .setDescription(`Video: [${şarkı.title}](${şarkı.url})`)
        .setThumbnail(şarkı.thumbnail)
       /* .addField('Video Açıklaması ', `${şarkı.description}`)
        .addField('Video ID', `${şarkı.id}`)
        .addField('Video Süresi',`${şarkı.time}`)
        .addField('Video Tarihi', `${şarkı.date}`)
        .addField('Videoyu yükleyen kanal', `${şarkı.channel}`)
        .setColor('BLUE')*/
        message.channel.send(embed)
    } else {
        message.reply('Bir ses kanalına katılın.')
    }

};

exports.conf = {
aliases: ['p', 'pong', 'uptime',],
permLevel: 0

};

exports.help = {
name: '1',
description: 'Ayıcığın göbeğine bir şeyler yazar :).',
usage: 'ayıcık bişiler'
};