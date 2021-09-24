const Discord = require("discord.js");
const fetch = require('node-fetch');

exports.run = async (client, message, args) => {
  if(!args) return message.channel.send("Şarkı adını da yaz hele.")
    try{
        const text = args.slice(0).join(' ')


          const arama = await fetch(`https://some-random-api.ml/lyrics?title=${encodeURI(text)}`)
    const veri = await arama.json();


        const lirikal = veri.lyrics
        const şarkıcı = veri.author
        const isim = veri.title

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
      
               exports.help = {
                   name: 'söz',
                   description: 'Şarkı sözü bulucu.',
                   usage: "söz şarkı adı"
     };
