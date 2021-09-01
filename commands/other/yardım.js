const Discord = require('discord.js')
const fs = require("fs")

exports.run = (client, message, args) => {

 if (!args[0]){
    const embed = new Discord.MessageEmbed()
    .addField('Botta herhangi bir hatayı, bota eklenmesini istediğiniz şeyleri, botla ilgili şikayetlerinizi iletmek için sunucumuza gelebilirsiniz.','[Destek Sunucusu](https://discord.gg/9cBnKmjzvH)')
    .addField('Bot davet linki:','[Davet Linki](https://discord.com/oauth2/authorize?client_id=799613425055432714&scope=bot&permissions=0)')
    .addField(':loudspeaker: Genel Kategorisi','`!yardım`\,`!ara`\,`!davet`\,`!botbilgi`\,`!kişi`\,`!tarih`\,`!kripto`\,`!pp`\,`!hesapla`\,`!korona`\,`!ping`\,`!tdk`\,`!havadurumu`\,`!sayaç`\,`!sunucubilgi`\,`!anket`\,`!döküman`\,`!iftar`')
    .addField(':pushpin: Yetkili Kategorisi','`!kick`\,`!sil`\,`!reset`\,`!tekrarla`\,`!uyar`')
    .addField(':musical_note: Müzik Kategorisi','`!çal`\,`!söz`\,`!dur`\,`!geç`\,`!radyo`\,`!radyoliste`\,`!ytara`\,`!çallink`') 
    .addField(':crystal_ball: Eğlence Kategorisi','!yazı`\,!binary`\,!meme`\,`!rte`\,`!tersyaz`\,`!yazıtura`\,`!şekilliyazı`\,`!şakayap`\,`!boğazla`\,`!aşk`')
    .addField('Bir komut hakkında daha fazla bilgi almak için `!yardım komutadı` yazın. Örneğin `!yardım radyo` gibi.')
    .setColor("000000")
    .setImage('https://cdn.discordapp.com/attachments/832641962564911185/832645980779315211/fb325679bd86c061503844b363babc7f.png')
    .setTimestamp()
    message.channel.send(embed);
 } else {
   
  commands = new Discord.Collection();
  fs.readdirSync('./commands').forEach(dir => {
      const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
      for (const file of commandFiles) {
          const komutcuklar = require(`../${dir}/${file}`);
          if (komutcuklar.help.name) commands.set(komutcuklar.help.name, komutcuklar);
      }
  })

  if (commands.has(args[0])) {
      const embed = new Discord.MessageEmbed()
          .setTitle("**" + args[0] + "** hakkında yardım")
          .addField("Komut hakkında bilgi:", commands.get(args[0]).help.description)
          .addField("Komut kullanımı:", "!" + commands.get(args[0]).help.usage)
      message.reply(embed)
  } else {
    const embed = new Discord.MessageEmbed()
          .setTitle("**" + args[0] + "** hakkında yardım")
          .addField("Komut hakkında bilgi:", "Böyle bir komut bulunamadı. Tüm komutlarımızı görmek için !yardım yazın")

      message.reply(embed)
  }



 }
 

  
};

exports.help = {
    name: 'yardım',
    description: 'Komutlar hakkında bilgi verir.',
    usage: 'yardım'
};