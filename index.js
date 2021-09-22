const db = require('quick.db')//QUİCK.DB
const Discord = require('discord.js');
const fs = require("fs");
const client = new Discord.Client({ restTimeOffset: 200, messageCacheMaxSize: 50 });
const { sahip, prefix, token } = require('./config.json');//JSON DOSYASI TOKEN VB. İÇİN

///Tanımlamalar yukarıda. Aşşağıda ise eventler:
//HEROKU veya başka bir platform için JSON.SQLİTE DOSYASINI YEDEKLEME KODU:
setInterval(function(){
  var zaman = new Date();
 client.users.cache.get(sahip).send(zaman.toLocaleString('tr-TR', { timeZone: 'Turkey' }), {files: ["./json.sqlite"]});
}, 1000 * 60 * 60 * 24)


//BİRİSİ SUNUCUYA EKLERSE ONA MESAJ. ??????????DIŞ DOSYAYA ALINACAK?????????????:
client.on("guildCreate", async guild => {
  const embed = new Discord.MessageEmbed()    
    .addField('Botu sunucunuza eklediğiniz için teşekkürler!', "!otocevap komutu ile sa'ya as ile cevap vermeyi vb. açabilirsiniz. !yardım komutu ile tüm komutları öğrenebilirsiniz.")
    .addField('Bot davet linki:','[Davet Linki](https://discord.com/oauth2/authorize?client_id=799613425055432714&scope=bot&permissions=0)')
    .addField('Aynı zamanda botta herhangi bir hatayı, bota eklenmesini istediğiniz şeyleri, botla ilgili şikayetlerinizi iletmek için sunucumuza gelebilirsiniz.','[Destek Sunucusu](https://discord.gg/9cBnKmjzvH)')
    .setColor("000000")
    .setTimestamp()
  guild.owner.send(embed);

});
//OTOMATİK CEVAP. SADECE SERVER SAHİBİ AÇABİLİR:
client.on("message", msg => {//Oto cevap
    if (msg.channel.type === "dm") return; // Mesaj DM'dan geliyorsa çalışmayacaktır.

  if(db.fetch(msg.guild.id + "_otocevap")) {
    require("./events/botcvp.js")(msg)   
  } else if (!db.fetch(msg.guild.id + "_otocevap")) {
      return
    } else {
      db.set(msg.guild.id + "_otocevap", true)
      require("./events/botcvp.js")(msg) 
    }
    
});
//MESSAGE EVENTİ:
client.on("message", require(`./events/message.js`));
//READY EVENTİ:
client.on('ready', () => { //hazır
  let count = 0;
  client.guilds.cache.forEach((guild) => {
    count += guild.memberCount
  });
  console.log("Hazır");
  client.user.setPresence({ activity: { name: client.guilds.cache.size + " sunucu ve "+count + " kişiyle !yardım" }, status: 'idle' });
});
//SUNUCUYA BİRİ GİRİNCE MESAJ ÇEKME:
client.on('guildMemberAdd', member => {//HOŞ GELDİN 
  member.send('Merhaba, sunucumuza hoş geldin!\nHi! Wellcome to the server.')
    .catch(console.error);
});


//COMMAND HANDLER:
client.commands = new Discord.Collection();
fs.readdirSync('./commands').forEach(dir => {
  const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const komutcuklar = require(`./commands/${dir}/${file}`);
    if (komutcuklar.help.name) client.commands.set(komutcuklar.help.name, komutcuklar);
  }
})

client.on("message", message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  if (client.commands.has(command)) client.commands.get(command).run(client, message, params, args);
});

//KELİME OYUNU + RANK
const kelimeoyunu = require("./events/kelime")
client.on("message", message => { // Her mesaj atıldığında tetiklenen message eventi.
  if (message.author.bot) return; // Mesaj sahibi bir BOT ise çalışmayacaktır.
  if (message.channel.type === "dm") return; // Mesaj DM'dan geliyorsa çalışmayacaktır.

  //KELİME OYUNU:
  const prefic = "!!"
  if (message.content.startsWith(prefix + "kelime")) kelimeoyunu.basla(message)
  if (message.content.startsWith(prefic)) kelimeoyunu.devamke(message)
  //////

  if (message.content.length < 4) return;
  if (message.content === "!seviye") return;
  require(`./events/rank.js`)(message)
})
//MÜZİK SİSTEMİ TETİKLEMESİ 2021 Akif9748
const music = require("./events/music.js")
const queue = new Map();
const stopcomm = ["siktir", "siktirgit", "siktir git", "stp", "dur", "sg"];//DURMA KOMUTU
client.on("message", async message => { //MÜZİK

  if (message.author.bot) return;//BOTA MÜZİK AÇMAYACAKTIR
  if (message.channel.type === "dm") return; // Mesaj DM'dan geliyorsa çalışmayacaktır.
  if (!message.content.startsWith(prefix)) return; //PREFİXLE BAŞLAMIYORSA SALLA

  const serverQueue = queue.get(message.guild.id);
  if (message.content.startsWith(`${prefix}ply`) || message.content.startsWith(`${prefix}çal`)) {
    music.execute(queue, message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skp`) || message.content.startsWith(`${prefix}geç`)) {
    music.skip(message, serverQueue);
    return;
  } else if (stopcomm.some(word => message.content.includes("!" + word)) ) {
         music.stop(message, serverQueue);
        return;
    } else if (message.content.startsWith(`${prefix}list`) || message.content.startsWith(`${prefix}liste`)) {
    music.list(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}rpt`) || message.content.startsWith(`${prefix}tekrarla`)) {
    music.repeat(message, serverQueue);
    return;
  }
    
});
//BİLDİĞİNİZ GİBİ TOKEN GİRİŞİ:
client.login(token);
