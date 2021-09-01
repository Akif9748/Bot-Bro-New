
const db = require('quick.db')
require("discord-banner")();
const Discord = require('discord.js');
const fs = require("fs");
const client = new Discord.Client({ restTimeOffset: 200, messageCacheMaxSize: 50 });
const { sahip, prefix, token } = require('./config.json');
///Tanımlamalar yukarıda. Aşşağıda ise eventler:

client.on("message", require(`./events/message.js`)); //mesaj eventi

client.on('ready', () => { //hazır
  let count = 0;
  client.guilds.cache.forEach((guild) => {
    count += guild.memberCount
  });
  console.log("Hazır");
  client.user.setPresence({ activity: { name: count + " kişiyle !yardım" }, status: 'idle' });
});

client.on('guildMemberAdd', member => {//HOŞ GELDİN
  member.send('Merhaba, sunucumuza hoş geldin!\nHi! Wellcome to the server.')
    .catch(console.error);
});


//////handler:
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

//KELİME OYUNU + RANK + HELP
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

const music = require("./events/music.js")
const queue = new Map();

client.on("message", async message => { //MÜZİK
  if (message.author.bot) return;
  if (message.channel.type === "dm") return; // Mesaj DM'dan geliyorsa çalışmayacaktır.
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);
  if (message.content.startsWith(`${prefix}ply`) || message.content.startsWith(`${prefix}çal`)) {
    music.execute(queue, message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skp`) || message.content.startsWith(`${prefix}geç`)) {
    music.skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stp`) || message.content.startsWith(`${prefix}dur`)) {
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








/////////////////////SON


client.login(token);