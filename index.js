const Discord = require('discord.js');
const fs = require("fs");
const client = new Discord.Client();
const { token, sahip, prefix } = require('./config.json');
require('./util/eventHandler.js')(client);

//özel//////////////////
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdirSync('./commands').forEach(dir => {
  const commandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const komutcuklar = require(`./commands/${file}`);
    if (komutcuklar.help.name){
      client.commands.set(komutcuklar.help.name, komutcuklar)
    }
  }
});




client.on("message", message => {
let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms, args);
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === sahip) permlvl = 4;
  if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 5;
  return permlvl;
};
////////////////////////////////////////

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  if (!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
  newUsers[guild.id].set(member.id, member.user);

  if (newUsers[guild.id].size > 10) {
    const userlist = newUsers[guild.id].map(u => u.toString()).join(" ");
    guild.channels.cache.find(channel => channel.name === "genel").send("Welcome our new users!\n" + userlist);
    newUsers[guild.id].clear();
  }
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  if (newUsers[guild.id].has(member.id)) newUsers.delete(member.id);
});

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
  } 
});

const ytdl = require("ytdl-core");
  const ytSearch = require('yt-search');

async function execute(message, serverQueue) {
  const args = message.content.split(" ");
 if (!args[0]) return message.channel.send("Şarkıyı yaz önce.")
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "Müzik dinlemek için ses kanalına girin!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "Yetkim yok aga gelmeye :( "
    );
  }

  const videoFinder = async (query) => {
    const videoResult = await ytSearch(query);
    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
} 

const c = await videoFinder(args.join(' '));

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
