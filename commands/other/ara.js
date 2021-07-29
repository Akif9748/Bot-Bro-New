const Discord = require("discord.js");
const fetch = require('node-fetch');


exports.run = async (client, message, args) => {
  
if (!args[0]) return message.channel.send("Sorguyu yaz.")  
  
 if (args[0].startsWith("/")) {
        var sayı = args[0].replace("/", "")
        if (Number(sayı) > 11 || Number(sayı) < 1) { 
                message.channel.send(`10'dan fazla arama yapamaz. ${sayı} sayısını azalt. Ben yine de arama yapacağım`)
                var sayı = "1"
                var aramaterimi = message.content.replace("!ara /" + sayı + " ", "").split(' ').join('+').split('ü').join('%C3%BC').split('ç').join('%C3%A7').split('ı').join('%C4%B1').split('ş').join('%C5%9F').split('ö').join('%C3%B6').split('ğ').join('%C4%9F').split('İ').join('%C4%B0').split('Ç').join('%C3%87').split('Ş').join('%C5%9E').split('Ö').join('%C3%96').split('Ü').join('%C3%9C').split('Ğ').join('%C4%9E')
   
        } else {
                
                var aramaterimi = message.content.replace("!ara /" + sayı + " ", "").split(' ').join('+').split('ü').join('%C3%BC').split('ç').join('%C3%A7').split('ı').join('%C4%B1').split('ş').join('%C5%9F').split('ö').join('%C3%B6').split('ğ').join('%C4%9F').split('İ').join('%C4%B0').split('Ç').join('%C3%87').split('Ş').join('%C5%9E').split('Ö').join('%C3%96').split('Ü').join('%C3%9C').split('Ğ').join('%C4%9E')
 

        }

 } else {
        var sayı = "1"

        var aramaterimi = message.content.replace("!ara ", "").split(' ').join('+').split('ü').join('%C3%BC').split('ç').join('%C3%A7').split('ı').join('%C4%B1').split('ş').join('%C5%9F').split('ö').join('%C3%B6').split('ğ').join('%C4%9F').split('İ').join('%C4%B0').split('Ç').join('%C3%87').split('Ş').join('%C5%9E').split('Ö').join('%C3%96').split('Ü').join('%C3%9C').split('Ğ').join('%C4%9E')
     

 }
 const arama = await fetch("https://api.codare.fun/gorsel-ara/" + aramaterimi + "?say%C4%B1=" + sayı)
 const veri = await arama.json();

 console.log("https://api.codare.fun/gorsel-ara/" + aramaterimi + "?say%C4%B1=" + sayı)

message.reply(veri)

 

};
exports.conf = {
        aliases: ['p', 'pong', 'uptime',],
        permLevel: 0
};
exports.help = {
               name: 'ara',
               description: 'Görsel arama. /10 yazarsanız 10 tane arar.',
               usage: 'ara /10 istanbul'
 };


 
