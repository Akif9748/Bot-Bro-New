const ytdl = require("ytdl-core");
const ytSearch = require('yt-search');
const Discord = require("discord.js");

exports.execute = async function (queue, message, serverQueue) {
  const args = message.content.replace("!ply ", "").replace("!çal ", "").replace("!ply", "").replace("!çal", "");

  if (!args) return message.channel.send("Şarkının adını yaz.")
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) return message.channel.send("Müzik dinlemek için ses kanalına girin!");

  const videoFinder = async (query) => {
    const videoResult = await ytSearch(query);
    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
  }
  if (args.includes("https://www.youtube.com/watch?v=") || args.includes("https://youtu.be/")) {

    cal = args
  } else {
    const c = await videoFinder(args);
    cal = c.url
  }


  const songInfo = await ytdl.getInfo(cal);
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
      play(message.guild, queueContruct.songs[0])

    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    const addembed = new Discord.MessageEmbed()
      .setDescription(`[${song.title}](${song.url}) çalma listesine eklendi!`)
    return message.channel.send(addembed);
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
    const calembed = new Discord.MessageEmbed()
      .setDescription(`[${song.title}](${song.url}) çalınmaya başlandı!`)
    serverQueue.textChannel.send(calembed);
  }
}

exports.skip = async function (message, serverQueue) {
  if (!message.member.voice.channel) return message.channel.send("Müziği geçmek istiyorsan ses kanalına gel!");
  if (!serverQueue) return message.channel.send("Şarkı çalmıyor bu yüzden geçemem!");
  serverQueue.connection.dispatcher.end();
}
exports.stop = async function (message, serverQueue) {
  if (!message.member.voice.channel) return message.channel.send("Müziği geçmek istiyorsan ses kanalına gel!");
  if (!serverQueue) return message.channel.send("Zaten şarkı çalmıyor bu yüzden duramayız!");
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}
exports.repeat = async function (message, serverQueue) {
  if (!message.member.voice.channel) return message.channel.send("Müziği geçmek istiyorsan ses kanalına gel!");
  if (!serverQueue) return message.channel.send("Şarkı çalmıyor bu yüzden geçemem!");
  serverQueue.songs.push(serverQueue.songs[serverQueue.songs.length - 1]);
  const calembed = new Discord.MessageEmbed()
    .setDescription(`[${serverQueue.songs[serverQueue.songs.length - 1].title}](${serverQueue.songs[serverQueue.songs.length - 1].url}) listeye tekrardan eklendi!`)
  message.channel.send(calembed);
}
exports.list = async function (message, serverQueue) {
  if (!serverQueue) return message.channel.send("Listede hiç şarkı yok!");
  var sarkıliste = "";
  serverQueue.songs.forEach(sarkı => {
    sarkıliste += `[${sarkı.title}](${sarkı.url})\n`
  });
  const listembed = new Discord.MessageEmbed()
    .setTitle("Şarkı Listesi")
    .setDescription(sarkıliste)
  message.channel.send(listembed);
}


