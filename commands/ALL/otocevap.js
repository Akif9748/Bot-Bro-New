const Discord = require('discord.js')
const db = require('quick.db')


exports.run = (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Üzgünüm, bunu sadece sunucuyu yöneten kişi yapabilir.')
      if (db.fetch(message.guild.id + "otocevap")) {
      db.set(message.guild.id + "_otocevap", false)
        message.reply("Oto cevap sistemi kapatıldı.")
      } else if (!db.fetch(message.guild.id + "otocevap")) {
      db.set(message.guild.id + "_otocevap", true)
        message.reply("Oto cevap sistemi açıldı.")
      } 
  
};



exports.help = {
    name: 'otocevap',
    description: 'Oto cevabı kapalıysa açar, açıksa kapatır :)',
    usage: 'otocevap'
};
