const Discord = require("discord.js");
const snekfetch = require("snekfetch")

exports.run = async (client, message, args) => {
  if(!args) return message.channel.send("Şarkı adını da yaz hele.")
    try{
        const text = args.slice(0).join(' ').split(' ').join('+').split('ü').join('%C3%BC').split('ç').join('%C3%A7').split('ı').join('%C4%B1').split('ş').join('%C5%9F').split('ö').join('%C3%B6').split('ğ').join('%C4%9F').split('İ').join('%C4%B0').split('Ç').join('%C3%87').split('Ş').join('%C5%9E').split('Ö').join('%C3%96').split('Ü').join('%C3%9C').split('Ğ').join('%C4%9E')
        const url = await snekfetch.get(`https://some-random-api.ml/lyrics?title=${text}`)
        const body = url.body
      
        const lirikal = body.lyrics
        const şarkıcı = body.author
        const isim = body.title
      
        if(lirikal.length < 2048){
      const embed = new Discord.MessageEmbed()
      .setColor(`RED`)
      .setDescription(lirikal)
      .setAuthor(`${şarkıcı} - ${isim}`)
      message.channel.send(embed)
      }else{
      
        const embed = new Discord.MessageEmbed()
      .setColor(`RED`)
      .setDescription(lirikal.slice(0,2048))
      .setAuthor(`${şarkıcı} - ${isim}`)
      
      const embed1 = new Discord.MessageEmbed()
      .setColor(`RED`)
      .setDescription(lirikal.slice(2048))
      
      message.channel.send(embed)
      
      message.channel.send(embed1)
      }
      }catch{
        return message.channel.send(`Kayıtlarda belirtilen şarkıyı bulamadım.`)
        }
   
                 
    };
           exports.conf = {
            aliases: ['p', 'pong', 'uptime',],
            permLevel: 0
    };
               exports.help = {
                   name: 'söz',
                   description: 'Şarkı sözü bulucu.',
                   usage: "söz şarkı adı"
     };