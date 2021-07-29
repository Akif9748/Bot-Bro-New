var db = require('quick.db')
var kelime = require('rastgelekelime');
const Discord = require('discord.js');
const fs = require("fs");
const client = new Discord.Client({restTimeOffset: 200, messageCacheMaxSize: 50});
const { sahip, prefix, token } = require('./config.json');
require('./util/eventHandler.js')(client);
const fetch = require('node-fetch');
const prefic = "!!"

client.on('guildMemberAdd', member => {
  member.send('Merhaba, sunucumuza hoş geldin! \n Hi! Wellcome to the server.')
    .catch(console.error);
});

//özel//////////////////

//rank
client.on("message", async message => { // Her mesaj atıldığında tetiklenen message eventi.

  if(message.author.bot) return; // Mesaj sahibi bir BOT ise çalışmayacaktır.
  if(message.channel.type === "dm") return; // Mesaj DM'dan geliyorsa çalışmayacaktır.

  let xpekle = Math.floor(Math.random() * 7) + 8; 
 
   if (message.content.length < 4) return;

  if (message.content === "!seviye") return;

  db.add(`xp_${message.author.id}_${message.guild.id}`, xpekle)


  if (db.fetch(`xp_${message.author.id}_${message.guild.id}`) > 300) {
    
    db.add(`seviye_${message.author.id}_${message.guild.id}`, 1)
    
    db.delete(`xp_${message.author.id}_${message.guild.id}`)
    
  };
})
//rank son


//kelime

client.on("message", async message => {
  if (message.author.bot) return; 
	  if(message.channel.type === 'dm') return;

	if (message.content.startsWith(prefix + "kelime")) { //yeni oyun
    const word = kelime() //EKAlojinin modülünden bir kelime.
    message.channel.send("Oyun başladı\n\n" + word) //kelimeyi yazar
    const ilkharf = word.split("")[word.split("").length - 1] //son harfi alır
    db.set(`sonharf_${message.guild.id}`, ilkharf) //son harfi not alır.
  }


  if (message.content.startsWith(prefic)) { //eğer belirlenen prefixle ile başlarsa (her mesajı almasın diye)
    if (!db.fetch(`sonharf_${message.guild.id}`)) return message.react("⛔")   //Eğer oyun başlamamışsa başlamaz.

    var nkelime = message.content.replace(prefic, "").toLowerCase() //Mesajdaki kelimeyi çok gerekeceği için tanımladık

    if (nkelime.split("")[0] === db.fetch(`sonharf_${message.guild.id}`)) { //dosyanın içiyle yazdığınız kelimenin son harfi uyuyorsa
      const arama = await fetch("https://sozluk.gov.tr/gts?ara=" + encodeURI(nkelime))
      const veri = await arama.json(); //tdk sitesinden veri alır.
      if (veri.error) {
        message.react("⛔") 
        message.reply("Kelime yok. Son harf şuydu, hatırlatayım : " + db.fetch(`sonharf_${message.guild.id}`))
        return
      } //eğer öyle bir kelime yoksa sitede durur. Ama oyun bitmez, yanlış yazmış olabilirsin.
      
      message.react("🆗") //Doğru ise emoji atar
      const conten = nkelime.split("")[nkelime.split("").length - 1] //son harfi tekrar aldı 
     db.set(`sonharf_${message.guild.id}`, conten) //son harfi yazdı
     db.add(`kelimesayac_${message.guild.id}`, 1)
    } else {
      message.react("⛔")   //yanlışsa yazıyor 
      message.reply("Yanlış! Oyun bitti. Şu ana kadar yazılan doğru kelime : " +   db.fetch(`kelimesayac_${message.guild.id}`)) 
      db.delete(`sonharf_${message.guild.id}`)
      db.delete(`kelimesayac_${message.guild.id}`) //ve oyunu bitiriyor, !!kelimeadı yazınca çalışmayacak.
      return;
    }
  }
 
});

//////handler:
client.commands = new Discord.Collection();


fs.readdirSync('./commands').forEach(dir => {
  const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const komutcuklar = require(`./commands/${dir}/${file}`);
    if (komutcuklar.help.name) {
    client.commands.set(komutcuklar.help.name, komutcuklar);

  } 
    }
  })

client.on("message", message => {

  
let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  let cmd;
  if (client.commands.has(command)) client.commands.get(command).run(client, message, params,  args);
 
 
	

  
});


////////////////////////////////////////



////////////////

const queue = new Map();

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}çal`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}geç`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}dur`)) {
    stop(message, serverQueue);
    return;
  } else  if (message.content.startsWith(`${prefix}ply`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skp`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stp`)) {
    stop(message, serverQueue);
    return;
  } 
});

const ytdl = require("ytdl-core");
  const ytSearch = require('yt-search');

async function execute(message, serverQueue) {
	
const args = message.content.replace("!play ","").replace("!çal ","");

 if (!args) return message.channel.send("Şarkıyı yaz önce.")
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send("Müzik dinlemek için ses kanalına girin!");
  const permissions = voiceChannel.permissionsFor(message.client.user);


  const videoFinder = async (query) => {
    const videoResult = await ytSearch(query);
    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
} 
 
const c = await videoFinder(args);

  const songInfo = await ytdl.getInfo(c.url);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
   };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(` [${song.title}](${song.url}) çalma listesine eklendi!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Müziği geçmek istiyorsan ses kanalına gel!"
    );
  if (!serverQueue)
    return message.channel.send("Şarkı çalmıyor bu yüzden geçemem!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Müziği durdurmak istiyorsan ses kanalına gel!"
    );
    
  if (!serverQueue)
    return message.channel.send("Şarkı çalmıyor bu yüzden durduramam!");
    
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send("Çalınmaya başlandı : [" + song.title + "](" + song.url + ")");
}

/////////////////////SON


client.login(token);
